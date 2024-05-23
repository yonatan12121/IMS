const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockMovementSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  type: { type: String, enum: ['purchase', 'sale', 'return', 'adjustment'], required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('StockMovement', stockMovementSchema);
