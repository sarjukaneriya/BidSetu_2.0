const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
  rfqId: { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  deliveryDays: Number,
  comment: String,
  status: { type: String, default: 'pending' },
  aiScore: Number,
  isLowest: Boolean,
  isRecommended: Boolean
},{ timestamps: true });
module.exports = mongoose.model('Quote', quoteSchema);
