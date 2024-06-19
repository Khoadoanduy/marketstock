# from flask import Flask, jsonify
# import yfinance as yf

# app = Flask(__name__)

# @app.route('/stock/<ticker>', methods=['GET'])
# def get_stock_data(ticker):
#     ticker_data = yf.Ticker(ticker)
#     hist = ticker_data.history(period="1y")
#     stock_info = ticker_data.info
    
#     response = {
#         "history": hist.reset_index().to_dict(orient="records"),
#         "info": stock_info
#     }
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True)
