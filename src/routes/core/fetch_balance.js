const express = require('express');

const fetchBalanceController = require('../../controller/core/fetchBalance');

const router = express.Router();

/**
 * @swagger
 * /api/fetch_balance:
 *   get:
 *     summary: Fetch public api data
 *     description: Fetch public api data with the specified parameters.
 *     parameters:
 *       - in: query
 *         name: addess
 *         description: ethereum wallet address.
 *         schema:
 *           type: string
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
 *                   properties:
 *                      balance:
 *                          type: number
 *                          description: ethereum wallet balance
 *                      token_code:
 *                          type: string
 *                          description: ethereum token code
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Unauthorized - Missing or invalid authorization token
 *       '403':
 *         description: Forbidden - User is not authorized to access this resource
 */
router.get('/', fetchBalanceController.fetchBalance);

module.exports = router;