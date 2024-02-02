const express = require("express");

const router = express.Router();
const authenticationController = require("../controllers/authentication");
const { verifyToken } = require("../shared");

router.post("/login", authenticationController.login);
router.get("/logout", verifyToken, authenticationController.logout);

module.exports = router;