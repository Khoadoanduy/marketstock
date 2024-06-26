// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('./models/User');
const Watchlist = require('./models/Watchlist');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Fetch stock data
const fetchStockData = async (tickers) => {
  const response = await axios.get(`http://127.0.0.1:5000/api/stock-data?tickers=${tickers}`);
  return response.data;
};

// Save to watchlist
app.post('/api/watchlist', async (req, res) => {
  const { email, ticker } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
    await user.save();
  }
  const watchlistItem = new Watchlist({ userId: user._id, ticker });
  await watchlistItem.save();
  user.watchlist.push(watchlistItem);
  await user.save();
  res.status(201).send(watchlistItem);
});

// Check stock prices and notify users
cron.schedule('*/5 * * * *', async () => { // Check every 5 minutes
  const watchlists = await Watchlist.find().populate('userId');
  const tickers = [...new Set(watchlists.map(w => w.ticker))];
  const stockData = await fetchStockData(tickers.join(','));

  for (const watchlist of watchlists) {
    const stock = stockData.find(s => s.ticker === watchlist.ticker);
    if (stock && stock.stock_info.currentPrice !== watchlist.lastNotifiedPrice) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: watchlist.userId.email,
        subject: 'Stock Price Alert',
        text: `The price of ${stock.stock_info.longName} (${stock.stock_info.symbol}) has changed to ${stock.stock_info.currentPrice} USD.`
      };
      await transporter.sendMail(mailOptions);
      watchlist.lastNotifiedPrice = stock.stock_info.currentPrice;
      await watchlist.save();
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
