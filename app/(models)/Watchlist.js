// models/Watchlist.js
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticker: { type: String, required: true },
  lastNotifiedPrice: { type: Number }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
