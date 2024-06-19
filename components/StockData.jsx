// import React, { useState } from 'react';
// import axios from 'axios';

// const StockData = () => {
//     const [ticker, setTicker] = useState('');
//     const [stockData, setStockData] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchStockData = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://127.0.0.1:5000/stock/${ticker}`);
//             setStockData(response.data);
//         } catch (error) {
//             console.error('Error fetching stock data:', error);
//         }
//         setLoading(false);
//     };

//     return (
//         <div>
//             <h1>Stock Data</h1>
//             <input 
//                 type="text" 
//                 value={ticker} 
//                 onChange={(e) => setTicker(e.target.value)} 
//                 placeholder="Enter ticker symbol" 
//             />
//             <button onClick={fetchStockData} disabled={loading}>
//                 {loading ? 'Loading...' : 'Fetch Data'}
//             </button>

//             {stockData && (
//                 <div>
//                     <h2>Stock Info</h2>
//                     <pre>{JSON.stringify(stockData.info, null, 2)}</pre>

//                     <h2>Historical Data</h2>
//                     <pre>{JSON.stringify(stockData.history, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StockData;
