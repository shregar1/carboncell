const express = require('express');

const registerController = require('../../controller/user/register');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
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
 *                     urn:
 *                       type: string
 *                       description: URN of the registered user
 *                     username:
 *                       type: string
 *                       description: Username of the registered user
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address of the registered user
 */


router.post('/', registerController.registerUser);

module.exports = router;