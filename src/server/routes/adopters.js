const express = require("express");

const router = express.Router();
const { adopterHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

router.route("/").get(verifyToken, adopterHandlers.getAll);
router
  .route("/:id")
  .get(verifyToken, adopterHandlers.getDetails)
  .delete(verifyToken, adopterHandlers.delete)
  .put(verifyToken, adopterHandlers.edit);

module.exports = router;
