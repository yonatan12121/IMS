const express = require('express');
const router = express.Router();
const {
    createStockMovement,
    getStockMovements,
} = require('../controllers/stockController');
const { protect,adminProtect,managerProtect} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Stock Movements
 *   description: Stock movement management
 */

/**
* @swagger
* /api/stock-movements:
*   post:
*     summary: Create a new stock movement
*     tags: [Stock Movements]
*     parameters:
*       - in: query
*         name: type
*         schema:
*           type: string
*           enum: [sale, purchase, return, adjustment]
*         description: Type of stock movement
*         required: true
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - quantity
*               - itemId
*             properties:
*               quantity:
*                 type: number
*                 description: Quantity of the stock movement
*               itemId:
*                 type: string
*                 description: ID of the inventory item
*     responses:
*       201:
*         description: Stock movement created successfully
*       400:
*         description: Bad request, missing or invalid parameters
*       500:
*         description: Internal server error
*/

router.post('/', protect, managerProtect, createStockMovement);

/**
 * @swagger
 * /api/stock-movements:
 *   get:
 *     summary: Get all stock movements
 *     tags: [Stock Movements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all stock movements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovement'
 *       500:
 *         description: Internal server error
 */
router.get('/', protect, getStockMovements);

module.exports = router;