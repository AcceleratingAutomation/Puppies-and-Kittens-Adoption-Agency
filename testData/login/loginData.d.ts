import {
  usernameRequired,
  passwordRequired,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../src/accessibility/accessibilityText";

type Scenario = [
  string, // testTitle
  string, // username
  string, // password
  (
    | typeof usernameRequired
    | typeof passwordRequired
    | typeof atLeast8Characters
    | typeof atLeastOneLowercaseLetter
    | typeof atLeastOneUppercaseLetter
    | typeof atLeastOneNumber
    | typeof atLeastOneSpecialCharacter
    | typeof errorLoggingIntoApp
  ), // expectedError1
  (
    | typeof usernameRequired
    | typeof passwordRequired
    | typeof atLeast8Characters
    | typeof atLeastOneLowercaseLetter
    | typeof atLeastOneUppercaseLetter
    | typeof atLeastOneNumber
    | typeof atLeastOneSpecialCharacter
    | typeof errorLoggingIntoApp
  ), // expectedError2
];

declare const noLoginScenarios: Scenario[];
declare const noLoginOrSubmitScenarios: Scenario[];

export { noLoginScenarios, noLoginOrSubmitScenarios };
