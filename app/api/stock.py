from flask import Flask, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    # Define the ticker symbol
    ticker_symbol = 'AAPL'

    # Get data for the ticker
    ticker_data = yf.Ticker(ticker_symbol)

    # Get historical market data
    hist = ticker_data.history(period="1y").reset_index().to_dict(orient='records')

    # Get stock info
    stock_info = ticker_data.info

    return jsonify({
        "historical_data": hist,
        "stock_info": stock_info
    })

if __name__ == '__main__':
    app.run(debug=True)
