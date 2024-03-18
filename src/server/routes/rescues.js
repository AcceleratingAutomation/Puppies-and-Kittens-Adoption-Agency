const express = require("express");

const router = express.Router();
const { rescueHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, rescueHandlers.getAll);
router.route("/add").post(verifyToken, rescueHandlers.create);
router
  .route("/:id")
  .get(verifyToken, rescueHandlers.getDetails)
  .delete(verifyToken, rescueHandlers.delete)
  .put(verifyToken, rescueHandlers.edit);

module.exports = router;
