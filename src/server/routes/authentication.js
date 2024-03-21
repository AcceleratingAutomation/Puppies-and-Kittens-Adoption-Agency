const express = require("express");

const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const { verifyToken } = require("../shared");
const { logoutEndpoint, loginEndpoint } = require("../apiService/apiConfig");

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Logs in a user
 *     description: This endpoint allows a user to log in by providing their username and password in the Authorization header. For example, 'Basic YWRtaW46cGFzc3dvcmQ=' is "admin:password" in base64.
 *     tags: [Authentication]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Basic auth credentials - Swaggers 'Try it out' for this endpoint does not work on http.
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials or authorization header is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post(loginEndpoint, authenticationController.login);

/**
 * @swagger
 * /v1/logout:
 *   get:
 *     summary: Logs out a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get(logoutEndpoint, verifyToken, authenticationController.logout);

module.exports = router;
