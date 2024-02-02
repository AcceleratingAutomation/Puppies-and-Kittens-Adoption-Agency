require('dotenv').config({ path: './variables.env' });
const express = require('express');
const debug = require('debug')('app:server');
const cors = require('cors');
const favoritesController = require('./controllers/favorites');
const {
  rescueHandlers,
  adopterHandlers,
  fosterHandlers,
  veterinarianHandlers,
  userHandlers,
} = require('./controllers/createHandlers');
const loginController = require('./controllers/login');
const formsController = require('./controllers/forms');
const { verifyToken } = require('./shared');

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Server is running on port ${port}`);
});
app.use(express.json());
app.use(cors());

// Health Check

app.get('/health', (req, res) => {
  res.status(200).send(`Server is running OK on port ${port}`);
});

// Favorites

app.get('/v1/favorites', verifyToken, favoritesController.getFavorites);
app.post('/v1/favorites/:id', verifyToken, favoritesController.addFavorite);
app.delete(
  '/v1/favorites/:id',
  verifyToken,
  favoritesController.deleteFavorite,
);

// Rescues

app.get('/v1/rescues', verifyToken, rescueHandlers.getAll);
app.delete('/v1/rescue/:id', verifyToken, rescueHandlers.delete);
app.get('/v1/rescue/:id', verifyToken, rescueHandlers.getDetails);

// Forms

app.post('/v1/addpet', verifyToken, formsController.addPet);

// Adopters

app.get('/v1/adopters', verifyToken, adopterHandlers.getAll);
app.delete('/v1/adopter/:id', verifyToken, adopterHandlers.delete);
app.get('/v1/adopter/:id', verifyToken, adopterHandlers.getDetails);

// Fosters

app.get('/v1/fosters', verifyToken, fosterHandlers.getAll);
app.delete('/v1/foster/:id', verifyToken, fosterHandlers.delete);
app.get('/v1/foster/:id', verifyToken, fosterHandlers.getDetails);

// Veterinarians

app.get('/v1/veterinarians', verifyToken, veterinarianHandlers.getAll);
app.delete('/v1/veterinarian/:id', verifyToken, veterinarianHandlers.delete);
app.get('/v1/veterinarian/:id', verifyToken, veterinarianHandlers.getDetails);

// Users

app.get('/v1/users', verifyToken, userHandlers.getAll);
app.delete('/v1/user/:id', verifyToken, userHandlers.delete);
app.get('/v1/user/:id', verifyToken, userHandlers.getDetails);

// Login

app.post('/v1/login', loginController.login);
app.get('/v1/logout', verifyToken, loginController.logout);
