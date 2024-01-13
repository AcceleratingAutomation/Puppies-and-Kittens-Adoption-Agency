const {
    getPetDetails,
    getAllPets,
    getAudienceFromToken,
    generateToken,
    deletePet,
} = require("../shared");
const Constants = require("../constants");

exports.getAllPets = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    getAllPets().then((pets) => {
        if (pets && pets.length > 0) {
            generateToken(token, null).then((token) => {
                res.status(200).send({ pets: pets, token: token });
            });
        } else res.status(500).send({ pets: [], token: token });
    });
};

exports.deletePet = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.DELETE_PET)) {
        deletePet(req.params.id).then((err) => {
            if (err) res.status(500).send({ message: "Cannot delete this pet" });
            else {
                generateToken(token, null).then((token) => {
                    res
                        .status(200)
                        .send({ message: "Pet deleted successfully", token: token });
                });
            }
        });
    } else
        res
            .status(403)
            .send({ message: "Not authorized to delete a pet", token: token });
};

exports.getPetDetails = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.SHOW_PET_DETAILS)) {
        getPetDetails(req.params.id).then((pet) => {
            if (!pet || Object.keys(pet).length === 0) {
                res.status(404).send({ message: "Cannot get details for this pet" });
            } else {
                generateToken(token, null).then((newToken) => {
                    res.status(200).send({ pet: pet, token: newToken });
                });
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Error retrieving pet details" });
        });
    } else {
        res.status(403).send({ message: "Not authorized to view pet details", token: token });
    }
};