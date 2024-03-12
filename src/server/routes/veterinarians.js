const express = require("express");

const router = express.Router();
const {
  veterinarianHandlers,
} = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, veterinarianHandlers.getAll);
router
  .route("/:id")
  .get(verifyToken, veterinarianHandlers.getDetails)
  .delete(verifyToken, veterinarianHandlers.delete)
  .put(verifyToken, veterinarianHandlers.edit);

module.exports = router;
