'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/app/styles/StockContainer.css'; // Make sure to create this CSS file

const StockContainer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/stock-data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="stock-header">
        <h1>{data.stock_info.longName} ({data.stock_info.symbol})</h1>
        <p>{data.stock_info.currentPrice} USD</p>
        <p className="change">{data.stock_info.priceChange} ({data.stock_info.priceChangePercent}%)</p>
        <p>Closed: {new Date(data.stock_info.lastClose).toLocaleString()}</p>
      </div>
      <div className="stock-chart">
        {/* You can add a chart component here if you have chart data */}
      </div>
      <div className="stock-details">
        <div className="detail-item">
          <p>Open</p>
          <p>{data.historical_data.Open}</p>
        </div>
        <div className="detail-item">
          <p>High</p>
          <p>{data.stock_info.dayHigh}</p>
        </div>
        <div className="detail-item">
          <p>Low</p>
          <p>{data.stock_info.dayLow}</p>
        </div>
        <div className="detail-item">
          <p>Mkt cap</p>
          <p>{data.stock_info.marketCap}</p>
        </div>
        <div className="detail-item">
          <p>P/E ratio</p>
          <p>{data.stock_info.peRatio}</p>
        </div>
        <div className="detail-item">
          <p>Div yield</p>
          <p>{data.stock_info.dividendYield}</p>
        </div>
        <div className="detail-item">
          <p>52-wk high</p>
          <p>{data.stock_info.fiftyTwoWeekHigh}</p>
        </div>
        <div className="detail-item">
          <p>52-wk low</p>
          <p>{data.stock_info.fiftyTwoWeekLow}</p>
        </div>
      </div>
    </div>
  );
};

export default StockContainer;
