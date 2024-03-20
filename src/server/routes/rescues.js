const express = require("express");

const router = express.Router();
const { rescueHandlers } = require("../controllers/createHandlersController");
const { verifyToken } = require("../shared");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of all rescues
 *     responses:
 *       200:
 *         description: A list of rescues
 */
router.route("/").get(verifyToken, rescueHandlers.getAll);

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add a new rescue
 *     responses:
 *       201:
 *         description: The rescue was created
 */
router.route("/add").post(verifyToken, rescueHandlers.create);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a specific rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     responses:
 *       200:
 *         description: The requested rescue
 *   delete:
 *     summary: Delete a specific rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     responses:
 *       200:
 *         description: The rescue was deleted
 *   put:
 *     summary: Update a specific rescue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the rescue
 *     responses:
 *       200:
 *         description: The rescue was updated
 */
router
  .route("/:id")
  .get(verifyToken, rescueHandlers.getDetails)
  .delete(verifyToken, rescueHandlers.delete)
  .put(verifyToken, rescueHandlers.edit);

module.exports = router;
