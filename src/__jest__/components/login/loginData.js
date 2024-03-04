import {
  required,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../../accessibility/login/loginText";

// Login Data Scenarios
// testTitle, username, password
// The username and password are just a mocked login. Do NOT add real passwords here.
export const validLoginScenarios = [
  ["valid credentials", "username", "Password123!"],
];

// testTitle, username, password, expectedErrorMessages
// Mocking an incorrect username or password combination. The form should be submitted but the user should not get logged in.
export const noLoginScenarios = [
  [
    "invalid credentials",
    "invalid username",
    "Invalid1$-password",
    errorLoggingIntoApp,
  ],
];

// testTitle, username, password, expectedErrorMessages
// These scenarios should not have a form submission because something is invalid.
export const noLoginOrSubmitScenarios = [
  ["empty username and password", "", "", required, required],
  ["empty username", "", "Password123!", required],
  ["empty password", "username", "", required],
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
    required,
    atLeast8Characters,
  ],
  [
    "empty username and password without uppercase letter",
    "",
    "password123!",
    required,
    atLeastOneUppercaseLetter,
  ],
  [
    "empty username and password without lowercase letter",
    "",
    "PASSWORD123!",
    required,
    atLeastOneLowercaseLetter,
  ],
  [
    "empty username and password without number",
    "",
    "Password!",
    required,
    atLeastOneNumber,
  ],
  [
    "empty username and password without special character",
    "",
    "Password123",
    required,
    atLeastOneSpecialCharacter,
  ],
];
