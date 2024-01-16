const {
    getRescueDetails,
    getAllRescues,
    getAudienceFromToken,
    generateToken,
    deleteRescue,
} = require("../shared");
const Constants = require("../constants");

exports.getAllRescues = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    getAllRescues().then((rescues) => {
        if (rescues && rescues.length > 0) {
            generateToken(token, null).then((token) => {
                res.status(200).send({ rescues: rescues, token: token });
            });
        } else res.status(500).send({ rescues: [], token: token });
    });
};

exports.deleteRescue = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.DELETE_RESCUE)) {
        deleteRescue(req.params.id).then((err) => {
            if (err) res.status(500).send({ message: "Cannot delete this rescue" });
            else {
                generateToken(token, null).then((token) => {
                    res
                        .status(200)
                        .send({ message: "Rescue deleted successfully", token: token });
                });
            }
        });
    } else
        res
            .status(403)
            .send({ message: "Not authorized to delete a rescue", token: token });
};

exports.getRescueDetails = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (getAudienceFromToken(token).includes(Constants.SHOW_RESCUE_DETAILS)) {
        getRescueDetails(req.params.id).then((rescue) => {
            if (!rescue || Object.keys(rescue).length === 0) {
                res.status(404).send({ message: "Cannot get details for this rescue" });
            } else {
                generateToken(token, null).then((newToken) => {
                    res.status(200).send({ rescue: rescue, token: newToken });
                });
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Error retrieving rescue details" });
        });
    } else {
        res.status(403).send({ message: "Not authorized to view rescue details", token: token });
    }
};