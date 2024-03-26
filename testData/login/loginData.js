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

// testTitle, username, password, expectedError1, expectedError2
// This scenario should not login but there should be a backend network call to check the credentials on server.
const noLoginScenarios = [
  [
    "invalid credentials",
    "invalid-username",
    "Invalid1$-Password",
    errorLoggingIntoApp,
  ],
];

// testTitle, username, password, expectedError1, expectedError2
// These scenarios should not have a network backend call on form submission because something is invalid.
const noLoginOrSubmitScenarios = [
  ["empty username and password", "", "", usernameRequired, passwordRequired],
  ["empty username", "", "Password123!", usernameRequired],
  ["empty password", "username", "", passwordRequired],
  ["password too short", "username", "1234567", atLeast8Characters],
  [
    "password without uppercase letter",
    "username",
    "password123!",
    atLeastOneUppercaseLetter,
  ],
  [
    "password without lowercase letter",
    "username",
    "PASSWORD123!",
    atLeastOneLowercaseLetter,
  ],
  ["password without number", "username", "Password!", atLeastOneNumber],
  [
    "password without special character",
    "username",
    "Password123",
    atLeastOneSpecialCharacter,
  ],
  [
    "empty username and password too short",
    "",
    "1234567",
    usernameRequired,
    atLeast8Characters,
  ],
  [
    "empty username and password without uppercase letter",
    "",
    "password123!",
    usernameRequired,
    atLeastOneUppercaseLetter,
  ],
  [
    "empty username and password without lowercase letter",
    "",
    "PASSWORD123!",
    usernameRequired,
    atLeastOneLowercaseLetter,
  ],
  [
    "empty username and password without number",
    "",
    "Password!",
    usernameRequired,
    atLeastOneNumber,
  ],
  [
    "empty username and password without special character",
    "",
    "Password123",
    usernameRequired,
    atLeastOneSpecialCharacter,
  ],
];

export { noLoginScenarios, noLoginOrSubmitScenarios };
