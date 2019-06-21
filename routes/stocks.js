const express = require('express');
const StockService = require('../services/stocks');
const stockRouter = express.Router();

stockRouter.get('/alldata', (req, res, next) => {
  StockService.getAllStockData()
    .then(stocks => {
      const stockList = {};
      for(let stock of stocks){
        console.log(stock)
        stockList[stock.symbol] = {
          'id': stock.id,
          'company': stock.company,
          'open_price': stock.open_price,
          'stock_type': stock.stock_type,
          'currency': stock.currency,
          'region': stock.region,
        };
      };
      res.json({'stocks': stockList});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/all', (req, res, next) => {
  StockService.getAllStocks()
    .then(stocks => {
      const symbolList = {};
      for(let stock of stocks){
        console.log(stock)
        symbolList[stock.symbol] = {
          'company': stock.company
        };
      };
      res.json({'stocks': symbolList});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/update', (req, res, next) => {
  StockService.updateAllStocks()
    .then(() => {
      res.json({'success': true});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/populate', (req, res, next) => {
  StockService.populateStocks()
    .then(() => {
      res.json({ 'success': true})
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/id/:id', (req, res, next) => {
  const { id } = req.params;
  StockService.getStockById(id)
    .then(stock => {
      res.json({'stock': stock});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/symbol/:symbol', (req, res, next ) => {
  const { symbol } = req.params;
  StockService.getStockBySymbol(symbol)
    .then(stock => {
      res.json({'stock': stock});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

module.exports = stockRouter;