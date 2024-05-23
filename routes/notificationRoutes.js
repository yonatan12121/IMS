const express = require('express');
const router = express.Router();
const {
    getNotifications,
    markNotificationAsRead,
} = require('../controllers/notificationController');
const { protect,adminProtect,managerProtect} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints for managing user notifications
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get notifications for the current user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved notifications
 *       '401':
 *         description: Unauthorized, token not provided or invalid
 *       '500':
 *         description: Internal server error
 */

router.get('/', protect, managerProtect,getNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification
 *     responses:
 *       '200':
 *         description: Successfully marked as read
 *       '401':
 *         description: Unauthorized, token not provided or invalid
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id/read', protect, managerProtect,markNotificationAsRead);

module.exports = router;
