const express = require('express');

const fetchPublicDataController = require('../../controller/core/fetchPublicData');

const router = express.Router();
/**
 * @swagger
 * /api/fetch_public_data:
 *   get:
 *     summary: Fetch public api data
 *     description: Fetch public api data with the specified parameters.
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Category of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Limit the number of users to retrieve.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Offset for pagination.
 *         schema:
 *           type: integer
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
 *                   description: URN of the registered user
 *                 status:
 *                   type: boolean
 *                   description: Status of the registration process
 *                 message:
 *                   type: string
 *                   description: Message indicating the result of the registration process
 *                 response_key:
 *                   type: string
 *                   description: Key indicating the success of the registration process
 *                 data:
 *                   type: object
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Unauthorized - Missing or invalid authorization token
 *       '403':
 *         description: Forbidden - User is not authorized to access this resource
 */
router.get('/', fetchPublicDataController.fetchPublicData);

module.exports = router;