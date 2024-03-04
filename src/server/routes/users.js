const express = require("express");

const router = express.Router();
const { userHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, userHandlers.getAll);
router
  .route("/:id")
  .get(verifyToken, userHandlers.getDetails)
  .delete(verifyToken, userHandlers.delete);

module.exports = router;
