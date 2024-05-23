const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateUser } = require('../controllers/authController');
const { protect,adminProtect,managerProtect} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user registration, login, and profile retrieval
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, manager, employee]
 *         description: Role of the user
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in as an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '400':
 *         description: Bad request, missing or invalid parameters
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved profile information
 *       '401':
 *         description: Unauthorized, token not provided or invalid
 *       '500':
 *         description: Internal server error
 */

router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, manager, employee]
 *         description: Role of the user
 *         required: false
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/:id', protect,adminProtect,updateUser);


module.exports = router;
