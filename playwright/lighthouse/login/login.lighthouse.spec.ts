import { test } from "@playwright/test";
import { loginEndpoint } from "../../../src/server/apiService/apiConfig";
import runLighthouseAuditReport from "../../utils/lighthouseAudit";

const testTitle = "Login Page";

test.describe(testTitle, () => {
  runLighthouseAuditReport(testTitle, loginEndpoint);
  runLighthouseAuditReport(testTitle, loginEndpoint, false);
});
