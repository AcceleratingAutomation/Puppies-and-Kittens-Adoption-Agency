const usernameText = "Username";
// Allowing exception in gitleaks as this is a reference to the word Password
const passwordText = "Password";
const loginText = "LOGIN";
const required = "Required";
const atLeast8Characters = "Password must be at least 8 characters.";
const atLeastOneLowercaseLetter =
  "Password must contain at least one lowercase letter.";
const atLeastOneUppercaseLetter =
  "Password must contain at least one uppercase letter.";
const atLeastOneNumber = "Password must contain at least one number.";
const atLeastOneSpecialCharacter =
  "Password must contain at least one special character.";
const errorLoggingIntoApp = "Username or password is incorrect.";

module.exports = {
  required,
  usernameText,
  passwordText,
  loginText,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
};
