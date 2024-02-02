const express = require("express");

const router = express.Router();
const { rescueHandlers } = require("../controllers/createHandlers");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, rescueHandlers.getAll);
router
  .route("/:id")
  .get(verifyToken, rescueHandlers.getDetails)
  .delete(verifyToken, rescueHandlers.delete);

module.exports = router;
