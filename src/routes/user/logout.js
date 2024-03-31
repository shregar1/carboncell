const express = require('express');

const logoutController = require('../../controller/user/logout');

const router = express.Router();

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user.
 *     responses:
 *       '200':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urn:
 *                   type: string
 *                   description: URN of the request
 *                 status:
 *                   type: boolean
 *                   description: Status of the registration process
 *                 message:
 *                   type: string
 *                   description: Message indicating the registration status
 *                 response_key:
 *                   type: string
 *                   description: Key indicating the success response
 *                 data:
 *                   type: object
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Unauthorized - Missing or invalid authorization token
 *       '403':
 *         description: Forbidden - User is not authorized to access this resource
 */
router.post('/', logoutController.logoutUser);

module.exports = router;