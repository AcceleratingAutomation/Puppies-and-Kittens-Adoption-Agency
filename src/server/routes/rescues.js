const express = require("express");

const router = express.Router();
const { rescueHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * tags:
 *   name: Rescues
 *   description: API for rescues
 */

/**
 * @swagger
 * /v1/rescues/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Rescues]
 *     summary: Get all rescues
 *     responses:
 *       200:
 *         description: A list of rescues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rescues:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rescue'
 *                 token:
 *                   type: string
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(verifyToken, rescueHandlers.getAll);

/**
 * @swagger
 * /v1/rescues/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Rescues]
 *     summary: Add a new rescue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RescueRequestBody'
 *     responses:
 *       201:
 *         description: Created rescue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rescue'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/add").post(verifyToken, rescueHandlers.create);

/**
 * @swagger
 * /v1/rescues/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Rescues]
 *     summary: Get details of a rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     responses:
 *       200:
 *         description: The rescue details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rescue'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Rescues]
 *     summary: Delete a rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     responses:
 *       200:
 *         description: The deleted rescue
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
 *     tags: [Rescues]
 *     summary: Edit a rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RescueRequestBody'
 *     responses:
 *       200:
 *         description: The edited rescue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rescue'
 *       403:
 *         $ref: '#/components/responses/NotAuthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .get(verifyToken, rescueHandlers.getDetails)
  .delete(verifyToken, rescueHandlers.delete)
  .put(verifyToken, rescueHandlers.edit);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseRescue:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - gender
 *         - breed
 *         - hasFoster
 *         - hasVet
 *         - isSterilized
 *         - isVaccinated
 *         - isAdoptable
 *         - bio
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         gender:
 *           type: string
 *         breed:
 *           type: string
 *         hasFoster:
 *           type: boolean
 *         hasVet:
 *           type: boolean
 *         isSterilized:
 *           type: boolean
 *         isVaccinated:
 *           type: boolean
 *         isAdoptable:
 *           type: boolean
 *         bio:
 *           type: string
 *         image:
 *           type: integer
 *     Rescue:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseRescue'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the rescue
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             name: "Max"
 *             type: "Dog"
 *             gender: "Male"
 *             breed: "Poodle"
 *             hasFoster: true
 *             hasVet: true
 *             isSterilized: true
 *             isVaccinated: true
 *             isAdoptable: true
 *             bio: "An amazing dog with a great personality. He loves to play outside and is very friendly with other dogs. He is very well trained and is very obedient. He is a great dog for a family with kids."
 *             image: 1
 *     RescueRequestBody:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseRescue'
 *         - type: object
 *           example:
 *             id: "104gd9f6-e7c3-488b-bf89-0c1f60bed388"
 *             name: "Max"
 *             type: "Dog"
 *             gender: "Male"
 *             breed: "Poodle"
 *             hasFoster: true
 *             hasVet: true
 *             isSterilized: true
 *             isVaccinated: true
 *             isAdoptable: true
 *             bio: "An amazing dog with a great personality. He loves to play outside and is very friendly with other dogs. He is very well trained and is very obedient. He is a great dog for a family with kids."
 *             image: 1
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
