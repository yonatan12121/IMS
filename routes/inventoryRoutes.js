const express = require('express');
const router = express.Router();
const {
    createInventoryItem,
    getInventoryItems,
    getInventoryItemById,
    updateInventoryItemById,
    deleteInventoryItemById,
    searchAndFilterInventoryItems,
} = require('../controllers/inventoryController');
const { protect,adminProtect,managerProtect} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string 
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Successfully created
 *       500:
 *         description: Server error
 */
router.post('/', protect,managerProtect, createInventoryItem);

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       500:
 *         description: Server error
 */
router.get('/', protect, getInventoryItems);
/**
 * @swagger
 * /api/inventory/search:
 *   get:
 *     summary: Search and filter inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the inventory item
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of the inventory item
 *       - in: query
 *         name: minQuantity
 *         schema:
 *           type: number
 *         description: Minimum quantity of the inventory item
 *       - in: query
 *         name: maxQuantity
 *         schema:
 *           type: number
 *         description: Maximum quantity of the inventory item
 *     responses:
 *       200:
 *         description: A list of filtered inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       500:
 *         description: Server error
 */
router.get('/search', protect, searchAndFilterInventoryItems);
/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get a single inventory item by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.get('/:id', protect, getInventoryItemById);

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update an inventory item by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect,managerProtect, updateInventoryItemById);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, managerProtect,deleteInventoryItemById);



module.exports = router;
