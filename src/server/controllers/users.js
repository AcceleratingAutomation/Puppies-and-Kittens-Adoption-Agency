const {
    getAllUsers,
    getAudienceFromToken,
    generateToken
  } = require("../shared");
  const Constants = require("../constants");

exports.getAllUsers = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.SHOW_USERS)) {
      getAllUsers().then((users) => {
        if (users && users.length > 0) {
          generateToken(token, null).then((token) => {
            res.status(200).send({ users: users, token: token });
          });
        } else res.status(500).send({ users: [], token: token });
      });
    } else
      res
        .status(403)
        .send({ message: "Not authorized to view users", token: token });
  };