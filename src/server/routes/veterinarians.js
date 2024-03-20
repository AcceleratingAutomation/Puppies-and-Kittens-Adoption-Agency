const express = require("express");

const router = express.Router();
const {
  veterinarianHandlers,
} = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * tags:
 *   name: Veterinarians
 *   description: API for veterinarians
 */

/**
 * @swagger
 * /v1/veterinarians/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Veterinarians]
 *     summary: Get all veterinarians
 *     responses:
 *       200:
 *         description: A list of veterinarians
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 veterinarians:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Veterinarian'
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(verifyToken, veterinarianHandlers.getAll);

/**
 * @swagger
 * /v1/veterinarians/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Veterinarians]
 *     summary: Add a new veterinarian
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/VeterinarianRequestBody'
 *     responses:
 *       201:
 *         description: Created veterinarian
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinarian'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/add").post(verifyToken, veterinarianHandlers.create);

/**
 * @swagger
 * /v1/veterinarians/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Veterinarians]
 *     summary: Get details of a veterinarian
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the veterinarian
 *     responses:
 *       200:
 *         description: The veterinarian details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinarian'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Veterinarians]
 *     summary: Delete a veterinarian
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the veterinarian
 *     responses:
 *       200:
 *         description: The deleted veterinarian
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
 *     tags: [Veterinarians]
 *     summary: Edit a veterinarian
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the veterinarian
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/VeterinarianRequestBody'
 *     responses:
 *       200:
 *         description: The edited veterinarian
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinarian'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .get(verifyToken, veterinarianHandlers.getDetails)
  .delete(verifyToken, veterinarianHandlers.delete)
  .put(verifyToken, veterinarianHandlers.edit);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseVeterinarian:
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
 *     Veterinarian:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseVeterinarian'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the veterinarian
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             email: "veterinarian@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "veterinarian"
 *             name: "veterinarian name"
 *             type: "Veterinarian"
 *             isAccepting: true
 *             numCurrentRescues: 2
 *             numTotalRescues: 28
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             bio: "I like to care for cats and dogs."
 *             image: 12
 *     VeterinarianRequestBody:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseVeterinarian'
 *         - type: object
 *           example:
 *             email: "veterinarian@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "veterinarian"
 *             name: "veterinarian name"
 *             type: "Veterinarian"
 *             isAccepting: true
 *             numCurrentRescues: 2
 *             numTotalRescues: 28
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             bio: "I like to care for cats and dogs."
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
