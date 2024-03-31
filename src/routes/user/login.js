const express = require('express');

const loginController = require('../../controller/user/login');

const router = express.Router();


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user (plaintext)
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
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: URN of the registered user
 */


router.post('/', loginController.loginUser);

module.exports = router;