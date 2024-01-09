require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const {
  getUserByUsername,
  isEmptyObject,
  isPasswordCorrect,
  getAllPets,
  getAllUsers,
  addPet,
  verifyToken,
  getFavoritePetsForUser,
  getAudienceFromToken,
  generateToken,
  addFavoritePet,
  deletePet
} = require("./shared");
const Constants = require("./constants");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(cors());

app.get("/v1/users", verifyToken, (req, res) => {
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
});

app.get("/v1/pets", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  getAllPets().then((pets) => {
    if (pets && pets.length > 0) {
      generateToken(token, null).then((token) => {
        res.status(200).send({ pets: pets, token: token });
      });
    } else res.status(500).send({ pets: [], token: token });
  });
});

app.post("/v1/login", (req, res) => {
  let base64Encoding = req.headers.authorization.split(" ")[1];
  let credentials = Buffer.from(base64Encoding, "base64").toString().split(":");
  const username = credentials[0];
  const password = credentials[1];
  getUserByUsername(username).then((user) => {
    if (user && !isEmptyObject(user)) {
      isPasswordCorrect(user.key, password).then((result) => {
        if (!result)
          res
            .status(401)
            .send({ message: "username or password is incorrect" });
        else {
          generateToken(null, username).then((token) => {
            res
              .status(200)
              .send({ username: user.username, role: user.role, token: token });
          });
        }
      });
    } else
      res.status(401).send({ message: "username or password is incorrect" });
  });
});

app.get("/v1/logout", verifyToken, (req, res) => {
  res.status(200).send({ message: "Signed out" });
});

app.get("/v1/favorite", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  getFavoritePetsForUser(token).then((pets) => {
    generateToken(token, null).then((token) => {
      res.status(200).send({ favorites: pets, token: token });
    });
  });
});

app.post("/v1/favorite/:id", verifyToken, (req, res) => {
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
});

app.post("/v1/pet", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.ADD_PET)) {
    addPet({ id: uuid(), name: req.body.name, type: req.body.type, gender: req.body.gender, breed: req.body.breed }).then(
      (err) => {
        if (err) res.status(500).send({ message: "Cannot add this pet" });
        else {
          generateToken(token, null).then((token) => {
            res
              .status(200)
              .send({ message: "Pet added successfully", token: token });
          });
        }
      }
    );
  } else
    res
      .status(403)
      .send({ message: "Not authorized to add a pet", token: token });
});

app.delete("/v1/pets/:id", verifyToken, (req, res) => {
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
});
