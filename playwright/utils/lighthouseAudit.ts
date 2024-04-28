import { test, Page } from "@playwright/test";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse/core/index.cjs";
import net from "net";
import { LocalStorageData, LighthouseConfig } from "./interfaces";

// Get an available port. Hard coded port numbers cause conflicts when tests run in parallel.
function getPort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => {
        resolve(port);
      });
    });
  });
}

async function getBrowserContext(port: number) {
  const context = await chromium.launch({
    args: [`--remote-debugging-port=${port}`],
  });
  return context;
}

async function getLocalStorageData(page: Page): Promise<LocalStorageData> {
  const localStorage: LocalStorageData = await page.evaluate(
    () => localStorage,
  );
  return localStorage;
}

function getLighthouseConfig(projectName: string) {
  const lighthouseConfig = {
    extends: "lighthouse:default",
    settings: {},
  };

  if (projectName === "lighthouse desktop") {
    lighthouseConfig.settings = {
      formFactor: "desktop",
      screenEmulation: {
        mobile: false,
        width: 1920,
        height: 910,
        deviceScaleFactor: 1,
        disabled: false,
      },
    };
  }

  return lighthouseConfig;
}

async function runLighthouseAudit(
  page: Page,
  token: string,
  port: number,
  isThrottling: boolean,
  lighthouseConfig: LighthouseConfig,
) {
  const runnerResult = await lighthouse(
    page.url(),
    {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      logLevel: "warn",
      output: "html",
      port,
      throttlingMethod: isThrottling ? "devtools" : "provided",
      throttling: isThrottling
        ? undefined //  Use Lighthouse 4G throttling default values
        : {
            rttMs: 25, // round-trip time (RTT) - estimate "Ping ms"
            throughputKbps: 577580, // total network throughput - upstream + downstream below
            cpuSlowdownMultiplier: 1, // CPU slowdown multiplier - 1 is no throttling
            requestLatencyMs: 124, // server response time - estimate "download latency"
            downloadThroughputKbps: 461710, // download speed
            uploadThroughputKbps: 115870, // upload speed
          },
    },
    lighthouseConfig,
  );

  return runnerResult;
}

const runLighthouseAuditReport = (
  pageTitle: string,
  endpoint: string,
  isThrottling = true,
) => {
  test(
    `Run Lighthouse Audit Report with ${isThrottling ? "4G throttling" : "no throttling"}`,
    {
      tag: [
        "@performance",
        "@accessibility",
        "@best-practices",
        "@SEO",
        "@ui_",
        "@api_",
        "@database_",
        "@security_",
      ],
    },
    // eslint-disable-next-line no-empty-pattern
    async ({}, testInfo) => {
      const port = await getPort();
      const projectName = testInfo.project.name;
      test.setTimeout(2 * 60 * 1000); // Increase default timeout for performance tests that are throttled.

      const context = await getBrowserContext(port);
      const page = await context.newPage();
      await page.goto(endpoint);

      const localStorage = await getLocalStorageData(page);
      const { token } = localStorage;

      const lighthouseConfig = getLighthouseConfig(projectName);

      const runnerResult = await runLighthouseAudit(
        page,
        token,
        port,
        isThrottling,
        lighthouseConfig,
      );

      if (runnerResult) {
        const reportHtml = runnerResult.report;

        const date = new Date();
        const dateTimeString = date
          .toLocaleString("en-US", { hour12: false, timeZoneName: "short" })
          .replace(/,/g, "-at") // make it easier to understand the date and time
          .replace(/[/: ]/g, "-");

        // Save the report to a file
        const reportPath = path.join(
          process.cwd(),
          "lighthouse-audit-reports",
          `${pageTitle}-${projectName}-report-with-${isThrottling ? "4G-throttling" : "no-throttling"}-${dateTimeString}.html`,
        );

        if (Array.isArray(reportHtml)) {
          fs.writeFileSync(reportPath, reportHtml.join(""));
        } else {
          fs.writeFileSync(reportPath, reportHtml);
        }

        // Create a link to the report file
        const reportLink = `file://${reportPath}`;

        test.info().annotations.push({
          type: "Lighthouse Audit Report",
          description: reportLink,
        });

        // Calculate the scores
        const { categories } = runnerResult.lhr;
        const scores = {
          performance: categories.performance?.score
            ? categories.performance.score * 100
            : 0,
          accessibility: categories.accessibility?.score
            ? categories.accessibility.score * 100
            : 0,
          bestPractices: categories["best-practices"]?.score
            ? categories["best-practices"].score * 100
            : 0,
          seo: categories.seo?.score ? categories.seo.score * 100 : 0,
        };

        // Request code review if any of the scores are below 90
        Object.entries(scores).forEach(([category, score]) => {
          if (score < 90) {
            test.info().annotations.push({
              type: "Technical Code Review",
              description: `${category} score is below 90% at ${score.toFixed(0)}%.`,
            });
          }
        });
      } else {
        console.error("Lighthouse audit failed");
      }

      await context.close();
    },
  );
};

export default runLighthouseAuditReport;
