const express = require('express');

const router = express.Router();
const { fosterHandlers } = require('../controllers/createHandlers');
const { verifyToken } = require('../shared');

router.route('/')
  .get(verifyToken, fosterHandlers.getAll);
router.route('/:id')
  .get(verifyToken, fosterHandlers.getDetails)
  .delete(verifyToken, fosterHandlers.delete);

module.exports = router;
