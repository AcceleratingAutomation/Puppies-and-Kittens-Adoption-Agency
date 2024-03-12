const express = require("express");

const router = express.Router();
const { adminHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, adminHandlers.getAll);
router
  .route("/:id")
  .get(verifyToken, adminHandlers.getDetails)
  .delete(verifyToken, adminHandlers.delete);

module.exports = router;
