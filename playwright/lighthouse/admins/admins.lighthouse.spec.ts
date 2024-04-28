import { test } from "@playwright/test";
import { adminsEndpoint } from "../../../src/server/apiService/apiConfig";
import runLighthouseAuditReport from "../../utils/lighthouseAudit";

const testTitle = "Admins Page";

test.describe(testTitle, () => {
  runLighthouseAuditReport(testTitle, adminsEndpoint);
  runLighthouseAuditReport(testTitle, adminsEndpoint, false);
});
