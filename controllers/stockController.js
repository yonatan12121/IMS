const StockMovement = require('../models/stock');
const InventoryItem = require('../models/inventory');
const mongoose = require('mongoose');
const sendNotificationToManagers  = require('../utils/sendNotification');

// Create a new stock movement
const LARGE_ORDER_THRESHOLD = 100; // Define a threshold for large orders

exports.createStockMovement = async (req, res) => {
    const {  quantity, itemId } = req.body;
    const {type}= req.query;
    try {
        const newMovement = new StockMovement({
            type,
            quantity,
            itemId,
            userId: req.user._id
        });

        const savedMovement = await newMovement.save();

        // Find the inventory item
        const inventoryItem = await InventoryItem.findById(itemId);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Check if the requested quantity is available
        if (type === 'sale' && inventoryItem.quantity < quantity) {
            // If requested quantity exceeds available quantity, respond with remaining quantity
            return res.status(200).json({ message: 'Insufficient quantity', remainingQuantity: inventoryItem.quantity });
        }

        // Update inventory quantity based on movement type
        if (type === 'sale') {
            inventoryItem.quantity -= quantity;
        } else if (type === 'purchase' || type === 'return') {
            inventoryItem.quantity += quantity;
        } else if (type === 'adjustment') {
            inventoryItem.quantity = quantity; // Directly set to the new quantity
        }

        // Save the updated inventory item
        await inventoryItem.save();

        // Check if inventory level falls below threshold
        if (inventoryItem.quantity < 15) {
            sendNotificationToManagers('Inventory level is below threshold.');
        }

        // Check if out-of-stock item
        if (inventoryItem.quantity === 0) {
            sendNotificationToManagers('Out-of-stock item sold.');
        }

        // Check if important transaction (e.g., large order)
        if (type === 'sale' && quantity > LARGE_ORDER_THRESHOLD) {
            sendNotificationToManagers('Large order placed.');
        }

        res.status(201).json(savedMovement);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};




// Get all stock movements
exports.getStockMovements = async (req, res) => {
    try {
        const movements = await StockMovement.find();
        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
