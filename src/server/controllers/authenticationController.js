const debug = require("debug")("app:server");
const {
  getUserByUsername,
  isEmptyObject,
  isPasswordCorrect,
  generateToken,
} = require("../shared");
const {
  errorLoggingIntoApp,
} = require("../../accessibility/accessibilityText");

exports.login = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Authorization header is missing" });
    return;
  }

  const base64Encoding = req.headers.authorization.split(" ")[1];
  if (!base64Encoding) {
    res.status(401).send({ message: "Invalid authorization format" });
    return;
  }

  const credentials = Buffer.from(base64Encoding, "base64")
    .toString()
    .split(":");
  const username = credentials[0];
  const password = credentials[1];

  try {
    const user = await getUserByUsername(username);
    if (!user || isEmptyObject(user)) {
      res.status(401).send({ message: errorLoggingIntoApp });
      return;
    }

    const result = await isPasswordCorrect(user.key, password);
    if (!result) {
      res.status(401).send({ message: errorLoggingIntoApp });
      return;
    }

    const token = await generateToken(null, username);
    res.status(200).send({ username: user.username, role: user.role, token });
  } catch (error) {
    debug(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).send({ message: "Signed out" });
};
