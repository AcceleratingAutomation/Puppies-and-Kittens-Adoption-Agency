require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const cors = require("cors");
const favoritesController = require('./controllers/favorites');
const { rescueHandlers } = require('./controllers/createHandlers');
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

app.get("/v1/favorites", verifyToken, favoritesController.getFavorites);
app.post("/v1/favorites/:id", verifyToken, favoritesController.addFavorite);
app.delete("/v1/favorites/:id", verifyToken, favoritesController.deleteFavorite);

// Rescues

app.get("/v1/rescues", verifyToken, rescueHandlers.getAll);
app.delete("/v1/rescue/:id", verifyToken, rescueHandlers.delete);
app.get("/v1/rescue/:id", verifyToken, rescueHandlers.getDetails);

// Forms

app.post("/v1/addpet", verifyToken, formsController.addPet);

// Canidates

// Fosters

// Vets

// Users

app.get("/v1/users", verifyToken, usersController.getAllUsers);

// Login

app.post("/v1/login", loginController.login);
app.get("/v1/logout", verifyToken, loginController.logout);
