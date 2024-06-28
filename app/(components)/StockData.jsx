'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/app/styles/StockContainer.css';

const StockContainer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [symbols, setSymbols] = useState('AAPL,MSFT,GOOGL'); // Default symbols

  const fetchData = async (tickers) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/stock-data?tickers=${tickers}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(symbols);
  }, [symbols]);

  const handleInputChange = (event) => {
    setSymbols(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchData(symbols);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="stock-container">
      {/* <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={symbols}
          onChange={handleInputChange}
          placeholder="Enter comma-separated stock symbols"
        />
        <button type="submit">Fetch Data</button>
      </form> */}
      {data.map((stock) => (
        <div className="stock-info border">
          <div key={stock.ticker} className="stock-item">
            <div className="stock-header">
              <h1>{stock.stock_info.longName} ({stock.stock_info.symbol})</h1>
              <p>{stock.stock_info.currentPrice} USD</p>
              <p className="change"> <span>{stock.stock_info.priceChange}{stock.stock_info.priceChangePercent}%</span></p>
              <p>Closed: {new Date(stock.historical_data[stock.historical_data.length-1].Date).toLocaleString()}</p>
            </div>
            <div className="stock-details">
              <div className="detail-item">
                <p>Open</p>
                <p>{stock.historical_data[stock.historical_data.length-1].Open}</p>
              </div>
              <div className="detail-item">
                <p>High</p>
                <p>{stock.stock_info.dayHigh}</p>
              </div>
              <div className="detail-item">
                <p>Low</p>
                <p>{stock.stock_info.dayLow}</p>
              </div>
              <div className="detail-item">
                <p>Mkt cap</p>
                <p>{stock.stock_info.marketCap}</p>
              </div>
              <div className="detail-item">
                <p>P/E ratio</p>
                <p>{stock.stock_info.trailingPE}</p>
              </div>
              <div className="detail-item">
                <p>Div yield</p>
                <p>{stock.stock_info.dividendYield}</p>
              </div>
              <div className="detail-item">
                <p>52-wk high</p>
                <p>{stock.stock_info.fiftyTwoWeekHigh}</p>
              </div>
              <div className="detail-item">
                <p>52-wk low</p>
                <p>{stock.stock_info.fiftyTwoWeekLow}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockContainer;
