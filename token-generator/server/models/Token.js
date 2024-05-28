const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true },
  name: { type: String, required: true },
  slot: { type: String, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);