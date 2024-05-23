const InventoryItem = require('../models/inventory');

// Create a new inventory item

exports.createInventoryItem = async (req, res) => {
    const { name, description, category, quantity, price } = req.body;

    try {
        // Check if an item with the same name already exists
        const existingItem = await InventoryItem.findOne({ name });
        if (existingItem) {
            return res.status(400).json({ message: 'Item with this name already exists' });
        }

        const newItem = new InventoryItem({
            name,
            description,
            category,
            quantity,
            price,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get all inventory items
exports.getInventoryItems = async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single inventory item by ID
exports.getInventoryItemById = async (req, res) => {
    try {
        const item = await InventoryItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an inventory item by ID
exports.updateInventoryItemById = async (req, res) => {
    const { name, description, quantity, price } = req.body;

    try {
        const item = await InventoryItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.quantity = quantity || item.quantity;
        item.price = price || item.price;

        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an inventory item by ID
exports.deleteInventoryItemById = async (req, res) => {
    try {
        const item = await InventoryItem.findOneAndDelete({_id: req.params.id});
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Search and filter inventory items
exports.searchAndFilterInventoryItems = async (req, res) => {
    const { name, category, minQuantity, maxQuantity } = req.query;
    const query = {};
console.log(category);
    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
        query.category = category;
    }
    if (minQuantity) {
        query.quantity = { ...query.quantity, $gte: parseInt(minQuantity, 10) };
    }
    if (maxQuantity) {
        query.quantity = { ...query.quantity, $lte: parseInt(maxQuantity, 10) };
    }

    try {
        const items = await InventoryItem.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
