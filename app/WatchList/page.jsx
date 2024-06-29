import User from '/app/(models)/User.js';
import Watchlist from '/app/(models)/Watchlist.js';
import connectDB from '/app/utils/connectDB.js';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, ticker } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let watchlistItem = await Watchlist.findOne({ userId, ticker });

      if (!watchlistItem) {
        watchlistItem = new Watchlist({ userId, ticker });
        await watchlistItem.save();
        user.watchlist.push(watchlistItem._id);
      } else {
        // Update any necessary fields if the watchlist item already exists
        // For example, update the lastNotifiedPrice if applicable
      }

      await user.save();
      return res.status(200).json({ message: 'Watchlist updated' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
