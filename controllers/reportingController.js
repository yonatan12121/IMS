const sendReportEmail = require('../utils/email');
const InventoryItem = require('../models/inventory');
const StockMovement = require('../models/stock');

// Get inventory levels report and send email
exports.getInventoryLevelsReport = async (req, res) => {
    try {
        console.log("hello");

        const inventoryItems = await InventoryItem.find();
        const report = inventoryItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
        }));
        console.log("hello");

        // Send email with the inventory levels report
        const email = req.user.email; // Assuming the user's email is stored in req.user.email
        await sendReportEmail(email, report);

        res.status(200).json(report);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transactions report and send email
exports.getTransactionsReport = async (req, res) => {
    try {
        const transactions = await StockMovement.find();
        
        // Send email with the transactions report
        const email = req.user.email; // Assuming the user's email is stored in req.user.email
        await sendReportEmail(email, transactions);

        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
