const express = require('express');

const router = express.Router();
const favoritesController = require('../controllers/favorites');
const { verifyToken } = require('../shared');

router.route('/')
  .get(verifyToken, favoritesController.getFavorites);
router.route('/:id')
  .post(verifyToken, favoritesController.addFavorite)
  .delete(verifyToken, favoritesController.deleteFavorite);

module.exports = router;
