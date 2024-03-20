const express = require("express");

const router = express.Router();
const { adopterHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * tags:
 *   name: Adopters
 *   description: API for adopters
 */

/**
 * @swagger
 * /v1/adopters/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Adopters]
 *     summary: Get all adopters
 *     responses:
 *       200:
 *         description: A list of adopters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adopters:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Adopter'
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(verifyToken, adopterHandlers.getAll);

/**
 * @swagger
 * /v1/adopters/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Adopters]
 *     summary: Add a new adopter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/AdopterRequestBody'
 *     responses:
 *       201:
 *         description: Created adopter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adopter'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/add").post(verifyToken, adopterHandlers.create);

/**
 * @swagger
 * /v1/adopters/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Adopters]
 *     summary: Get details of an adopter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the adopter
 *     responses:
 *       200:
 *         description: The adopter details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adopter'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Adopters]
 *     summary: Delete an adopter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the adopter
 *     responses:
 *       200:
 *         description: The deleted adopter
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
 *     tags: [Adopters]
 *     summary: Edit an adopter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the adopter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/AdopterRequestBody'
 *     responses:
 *       200:
 *         description: The edited adopter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adopter'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .get(verifyToken, adopterHandlers.getDetails)
  .delete(verifyToken, adopterHandlers.delete)
  .put(verifyToken, adopterHandlers.edit);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseAdopter:
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
 *         - isAdopting
 *         - numHouseholdPeople
 *         - numHouseholdPets
 *         - hasBackgroundCheck
 *         - hasApplication
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
 *         isAdopting:
 *           type: boolean
 *         numHouseholdPeople:
 *           type: integer
 *         numHouseholdPets:
 *           type: integer
 *         hasBackgroundCheck:
 *           type: boolean
 *         hasApplication:
 *           type: boolean
 *         bio:
 *           type: string
 *         image:
 *           type: integer
 *     Adopter:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAdopter'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the adopter
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             email: "adopter@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "adopter"
 *             name: "adopter name"
 *             type: "Adopter"
 *             isAdopting: true
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             hasApplication: true
 *             bio: "Hello! We're the Smith family, and we are looking to adopt a cat or dog."
 *             image: 12
 *     AdopterRequestBody:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAdopter'
 *         - type: object
 *           example:
 *             email: "adopter@email.com"
 *             key: "A_Hashed_Password"
 *             username: "uniqueUsername"
 *             firstName: "Jason"
 *             lastName: "Caldwell"
 *             favorite: []
 *             role: "adopter"
 *             name: "adopter name"
 *             type: "Adopter"
 *             isAdopting: true
 *             numHouseholdPeople: 4
 *             numHouseholdPets: 1
 *             hasBackgroundCheck: true
 *             hasApplication: true
 *             bio: "Hello! We're the Smith family, and we are looking to adopt a cat or dog."
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
