const express = require("express");

const router = express.Router();
const { adminHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for admins
 */

/**
 * @swagger
 * /v1/admins/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     summary: Get all admins
 *     responses:
 *       200:
 *         description: A list of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admins:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(verifyToken, adminHandlers.getAll);

/**
 * @swagger
 * /v1/admins/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     summary: Add a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/AdminRequestBody'
 *     responses:
 *       201:
 *         description: Created admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/add").post(verifyToken, adminHandlers.create);

/**
 * @swagger
 * /v1/admins/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     summary: Get details of an admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the admin
 *     responses:
 *       200:
 *         description: The admin details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     summary: Delete an admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the admin
 *     responses:
 *       200:
 *         description: The deleted admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     summary: Edit an admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/AdminRequestBody'
 *     responses:
 *       200:
 *         description: The edited admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .get(verifyToken, adminHandlers.getDetails)
  .delete(verifyToken, adminHandlers.delete)
  .put(verifyToken, adminHandlers.edit);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseAdmin:
 *       type: object
 *       required:
 *         - email
 *         - key
 *         - username
 *         - firstName
 *         - lastName
 *         - role
 *         - name
 *         - type
 *         - numHouseholdPeople
 *         - numHouseholdPets
 *         - hasBackgroundCheck
 *         - numCurrentRescues
 *         - numTotalRescues
 *         - bio
 *         - image
 *       properties:
 *         email:
 *           type: string
 *         key:
 *           type: string
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         favorite:
 *           type: array
 *           items:
 *             type: string
 *         role:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         numHouseholdPeople:
 *           type: integer
 *         numHouseholdPets:
 *           type: integer
 *         hasBackgroundCheck:
 *           type: boolean
 *         numCurrentRescues:
 *           type: integer
 *         numTotalRescues:
 *           type: integer
 *         bio:
 *           type: string
 *         image:
 *           type: integer
 *     Admin:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAdmin'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the admin
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             email: "admin@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "admin"
 *             name: "admin name"
 *             type: "Admin"
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             numCurrentRescues: 2
 *             numTotalRescues: 5
 *             bio: "We are looking to help the Puppies and Kittens Adoption and Rescue."
 *             image: 12
 *     AdminRequestBody:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAdmin'
 *         - type: object
 *           example:
 *             email: "admin@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "admin"
 *             name: "admin name"
 *             type: "Admin"
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             numCurrentRescues: 2
 *             numTotalRescues: 5
 *             bio: "We are looking to help the Puppies and Kittens Adoption and Rescue."
 *             image: 12
 *   responses:
 *     NotAuthorized:
 *       description: Not authorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               token:
 *                 type: string
 *     NotFound:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     ServerError:
 *       description: Server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 */
