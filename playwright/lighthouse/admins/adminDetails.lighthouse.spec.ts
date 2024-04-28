import { test } from "@playwright/test";
import { adminsEndpoint } from "../../../src/server/apiService/apiConfig";
import runLighthouseAuditReport from "../../utils/lighthouseAudit";

const testTitle = "Admin Details Page";
const testAccount = "677c96e2-cb5e-11ea-87d0-0242ac130004";

test.describe(testTitle, () => {
  runLighthouseAuditReport(testTitle, `${adminsEndpoint}/${testAccount}`);
  runLighthouseAuditReport(
    testTitle,
    `${adminsEndpoint}/${testAccount}`,
    false,
  );
});
