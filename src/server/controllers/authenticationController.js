const {
  getUserByUsername,
  isEmptyObject,
  isPasswordCorrect,
  generateToken,
} = require("../shared");
const { errorLoggingIntoApp } = require("../../accessibility/login/loginText");

exports.login = (req, res) => {
  const base64Encoding = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Encoding, "base64")
    .toString()
    .split(":");
  const username = credentials[0];
  const password = credentials[1];

  return getUserByUsername(username).then((user) => {
    if (!user || isEmptyObject(user)) {
      res.status(401).send({ message: errorLoggingIntoApp });
      return Promise.resolve();
    }

    return isPasswordCorrect(user.key, password).then((result) => {
      if (!result) {
        res.status(401).send({ message: errorLoggingIntoApp });
        return Promise.resolve();
      }

      return generateToken(null, username).then((token) => {
        res
          .status(200)
          .send({ username: user.username, role: user.role, token });
      });
    });
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ message: "Signed out" });
};
