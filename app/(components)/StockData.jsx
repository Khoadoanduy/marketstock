'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockData=() => {
  const [data, setData] = useState(null); // Use 'any' type for data


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/stock-data');
        setData(response.data); // Update state with fetched data (object or array)
        
      } catch (error) {
          console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Stock Data</h1>
        <ul>
            <li>
              Symbol: {data.symbol} <br />
              Price: {data.price} <br />
              Change: {data.change}
            </li>
          
        </ul>
      
    </div>
  );
};

export default StockData;
