const {
  getFavoriteRescuesForUser,
  getAudienceFromToken,
  generateToken,
  addFavoriteRescue,
  deleteFavorite: deleteFavoriteRescue,
} = require("../shared");
const Constants = require("../constants");

exports.getFavorites = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  getFavoriteRescuesForUser(token).then((rescues) => {
    generateToken(token, null).then((newToken) => {
      res.status(200).send({ favorites: rescues, token: newToken });
    });
  });
};

exports.addFavorite = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.ADD_FAVORITE_RESCUE)) {
    addFavoriteRescue(token, req.params.id).then((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Cannot add this rescue to favorites" });
      } else {
        generateToken(token, null).then((newToken) => {
          res.status(200).send({
            message: "Rescue added to favorites successfully",
            token: newToken,
          });
        });
      }
    });
  } else {
    res.status(403).send({
      message: "Not authorized to add a rescue to favorites",
      token,
    });
  }
};

exports.deleteFavorite = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.DELETE_FAVORITE)) {
    deleteFavoriteRescue(token, req.params.id)
      .then(() => {
        generateToken(token, null).then((newToken) => {
          res.status(200).send({
            message: "Favorite deleted successfully",
            token: newToken,
          });
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Cannot delete this favorite", error: err });
      });
  } else {
    res
      .status(403)
      .send({ message: "Not authorized to delete a favorite", token });
  }
};
