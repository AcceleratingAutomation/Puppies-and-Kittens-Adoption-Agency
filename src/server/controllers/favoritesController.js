const {
  getFavoriteRescuesForUser,
  getAudienceFromToken,
  generateToken,
  addFavoriteRescue,
  deleteFavorite: deleteFavoriteRescue,
} = require("../shared");
const Constants = require("../constants");

exports.getFavorites = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const rescues = await getFavoriteRescuesForUser(token);
    const newToken = await generateToken(token, null);
    return res.status(200).send({ favorites: rescues, token: newToken });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.ADD_FAVORITE_RESCUE)) {
    try {
      await addFavoriteRescue(token, req.params.id);
      const newToken = await generateToken(token, null);
      return res.status(200).send({
        message: "Rescue added to favorites successfully",
        token: newToken,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Cannot add this rescue to favorites" });
    }
  }
  return res.status(403).send({
    message: "Not authorized to add a rescue to favorites",
    token,
  });
};

exports.deleteFavorite = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.DELETE_FAVORITE)) {
    try {
      await deleteFavoriteRescue(token, req.params.id);
      const newToken = await generateToken(token, null);
      return res.status(200).send({
        message: "Favorite deleted successfully",
        token: newToken,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Cannot delete this favorite", error: err.message });
    }
  } else {
    return res
      .status(403)
      .send({ message: "Not authorized to delete a favorite", token });
  }
};
