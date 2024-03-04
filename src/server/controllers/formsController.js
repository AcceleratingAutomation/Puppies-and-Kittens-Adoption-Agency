const { uuid } = require("uuidv4");
const { addPet, getAudienceFromToken, generateToken } = require("../shared");
const Constants = require("../constants");

exports.addPet = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.ADD_PET)) {
    addPet({
      id: uuid(),
      name: req.body.name,
      type: req.body.type,
      gender: req.body.gender,
      breed: req.body.breed,
    }).then((err) => {
      if (err) res.status(500).send({ message: "Cannot add this pet" });
      else {
        generateToken(token, null).then((newToken) => {
          res
            .status(200)
            .send({ message: "Pet added successfully", token: newToken });
        });
      }
    });
  } else {
    res.status(403).send({ message: "Not authorized to add a pet", token });
  }
};
