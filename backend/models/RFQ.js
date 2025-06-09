const mongoose = require('mongoose');
const rfqSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  category: String,
  deadline: Date,
  fileUrl: String,
  status: { type: String, default: 'open' },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: true });
module.exports = mongoose.model('RFQ', rfqSchema);
