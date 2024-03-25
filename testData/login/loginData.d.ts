import {
  usernameRequired,
  passwordRequired,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
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
  ), // expectedError1
  (
    | typeof usernameRequired
    | typeof passwordRequired
    | typeof atLeast8Characters
    | typeof atLeastOneLowercaseLetter
    | typeof atLeastOneUppercaseLetter
    | typeof atLeastOneNumber
    | typeof atLeastOneSpecialCharacter
  ), // expectedError2
];

declare const noLoginOrSubmitScenarios: Scenario[];

export default noLoginOrSubmitScenarios;
