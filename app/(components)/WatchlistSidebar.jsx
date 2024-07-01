function TickerRow({ ticker }) {
  return (
    <div>
      <span>ticker</span>
      <span>X</span>
    </div>
  );
}

export default function WatchlistSidebar({ watchlist }) {
  returnwatchlist.map((ticker) => <TickerRow ticker={ticker} key={ticker} />);
}
