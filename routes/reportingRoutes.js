const express = require('express');
const router = express.Router();
const {
    getInventoryLevelsReport,
    getTransactionsReport,
} = require('../controllers/reportingController');
const { protect,adminProtect,managerProtect} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Reporting
 *   description: Endpoints for generating reports
 */

/**
 * @swagger
 * /api/reports/inventory-levels:
 *   get:
 *     summary: Generate inventory levels report
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully generated report
 *       '401':
 *         description: Unauthorized, token not provided or invalid
 *       '500':
 *         description: Internal server error
 */

router.get('/inventory-levels', protect, managerProtect,getInventoryLevelsReport);

/**
 * @swagger
 * /api/reports/transactions:
 *   get:
 *     summary: Generate transactions report
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully generated report
 *       '401':
 *         description: Unauthorized, token not provided or invalid
 *       '500':
 *         description: Internal server error
 */

router.get('/transactions', protect, managerProtect,getTransactionsReport);

module.exports = router;
