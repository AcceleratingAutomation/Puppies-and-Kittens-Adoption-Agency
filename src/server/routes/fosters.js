const express = require("express");

const router = express.Router();
const { fosterHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * tags:
 *   name: Fosters
 *   description: API for fosters
 */

/**
 * @swagger
 * /v1/fosters/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Fosters]
 *     summary: Get all fosters
 *     responses:
 *       200:
 *         description: A list of fosters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fosters:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Foster'
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(verifyToken, fosterHandlers.getAll);

/**
 * @swagger
 * /v1/fosters/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Fosters]
 *     summary: Add a new foster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/FosterRequestBody'
 *     responses:
 *       201:
 *         description: Created foster
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foster'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/add").post(verifyToken, fosterHandlers.create);

/**
 * @swagger
 * /v1/fosters/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Fosters]
 *     summary: Get details of a foster
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the foster
 *     responses:
 *       200:
 *         description: The foster details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foster'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Fosters]
 *     summary: Delete a foster
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the foster
 *     responses:
 *       200:
 *         description: The deleted foster
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
 *     tags: [Fosters]
 *     summary: Edit a foster
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the foster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/FosterRequestBody'
 *     responses:
 *       200:
 *         description: The edited foster
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foster'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .get(verifyToken, fosterHandlers.getDetails)
  .delete(verifyToken, fosterHandlers.delete)
  .put(verifyToken, fosterHandlers.edit);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseFoster:
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
 *         - isAccepting
 *         - numCurrentRescues
 *         - numTotalRescues
 *         - numHouseholdPeople
 *         - numHouseholdPets
 *         - hasBackgroundCheck
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
 *         isAccepting:
 *           type: boolean
 *         numCurrentRescues:
 *           type: integer
 *         numTotalRescues:
 *           type: integer
 *         numHouseholdPeople:
 *           type: integer
 *         numHouseholdPets:
 *           type: integer
 *         hasBackgroundCheck:
 *           type: boolean
 *         bio:
 *           type: string
 *         image:
 *           type: integer
 *     Foster:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseFoster'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the foster
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             email: "foster@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "foster"
 *             name: "foster name"
 *             type: "Foster"
 *             isAccepting: true
 *             numCurrentRescues: 6
 *             numTotalRescues: 10
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             bio: "Hello! I'm looking to rescue a cat or dog."
 *             image: 12
 *     FosterRequestBody:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseFoster'
 *         - type: object
 *           example:
 *             email: "foster@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "foster"
 *             name: "foster name"
 *             type: "Foster"
 *             isAccepting: true
 *             numCurrentRescues: 6
 *             numTotalRescues: 10
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             bio: "Hello! I'm looking to rescue a cat or dog."
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
