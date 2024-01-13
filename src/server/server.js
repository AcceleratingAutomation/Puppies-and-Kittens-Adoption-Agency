require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const cors = require("cors");
const favoritesController = require('./controllers/favorites');
const petsController = require('./controllers/pets');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');
const formsController = require('./controllers/forms');
const { verifyToken } = require("./shared");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(cors());

// Favorites

app.get("/v1/favorite", verifyToken, favoritesController.getFavorites);
app.post("/v1/favorite/:id", verifyToken, favoritesController.addFavorite);
app.delete("/v1/favorite/:id", verifyToken, favoritesController.deleteFavorite);

// Pets

app.get("/v1/pets", verifyToken, petsController.getAllPets);
app.delete("/v1/pets/:id", verifyToken, petsController.deletePet);
app.get("/v1/petDetails/:id", verifyToken, petsController.getPetDetails);

// Forms

app.post("/v1/pet", verifyToken, formsController.addPet);

// Canidates

// Fosters

// Vets

// Users

app.get("/v1/users", verifyToken, usersController.getAllUsers);

// Login

app.post("/v1/login", loginController.login);
app.get("/v1/logout", verifyToken, loginController.logout);
