const {
    getFavoritePetsForUser,
    getAudienceFromToken,
    generateToken,
    addFavoritePet,
    deleteFavorite: deleteFavoritePet
} = require("../shared");
const Constants = require("../constants");

exports.getFavorites = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    getFavoritePetsForUser(token).then((pets) => {
        generateToken(token, null).then((token) => {
            res.status(200).send({ favorites: pets, token: token });
        });
    });
};

exports.addFavorite = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.ADD_FAVORITE_PET)) {
        addFavoritePet(token, req.params.id).then((err) => {
            if (err) res.status(500).send({ message: "Cannot add this pet to favorites" });
            else {
                generateToken(token, null).then((token) => {
                    res
                        .status(200)
                        .send({ message: "Pet added to favorites successfully", token: token });
                });
            }
        });
    } else
        res
            .status(403)
            .send({ message: "Not authorized to add a pet to favorites", token: token });
};

exports.deleteFavorite = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.DELETE_FAVORITE)) {
        deleteFavoritePet(token, req.params.id)
            .then(() => {
                generateToken(token, null).then((token) => {
                    res
                        .status(200)
                        .send({ message: "Favorite deleted successfully", token: token });
                });
            })
            .catch((err) => {
                res.status(500).send({ message: "Cannot delete this favorite", error: err });
            });
    } else {
        res
            .status(403)
            .send({ message: "Not authorized to delete a favorite", token: token });
    }
};