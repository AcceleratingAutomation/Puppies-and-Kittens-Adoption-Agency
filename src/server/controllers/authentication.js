const {
  getUserByUsername,
  isEmptyObject,
  isPasswordCorrect,
  generateToken,
} = require("../shared");
const { errorLoggingIntoApp } = require("../../components/login/loginText");

exports.login = (req, res) => {
  const base64Encoding = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Encoding, "base64")
    .toString()
    .split(":");
  const username = credentials[0];
  const password = credentials[1];
  getUserByUsername(username).then((user) => {
    if (user && !isEmptyObject(user)) {
      isPasswordCorrect(user.key, password).then((result) => {
        if (!result) {
          res.status(401).send({ message: errorLoggingIntoApp });
        } else {
          generateToken(null, username).then((token) => {
            res
              .status(200)
              .send({ username: user.username, role: user.role, token });
          });
        }
      });
    } else res.status(401).send({ message: errorLoggingIntoApp });
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ message: "Signed out" });
};
