const express = require("express");

const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const { verifyToken } = require("../shared");
const { logoutEndpoint, loginEndpoint } = require("../apiService/apiConfig");

router.post(loginEndpoint, authenticationController.login);
router.get(logoutEndpoint, verifyToken, authenticationController.logout);

module.exports = router;
