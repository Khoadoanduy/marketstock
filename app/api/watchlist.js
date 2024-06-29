// pages/api/watchlist.js
import clientPromise from '/app/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, ticker } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db();

      const result = await db.collection('users').updateOne(
        { _id: userId },
        { $addToSet: { watchlist: ticker } }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Ticker added to watchlist' });
      } else {
        res.status(400).json({ error: 'Failed to add ticker to watchlist' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
