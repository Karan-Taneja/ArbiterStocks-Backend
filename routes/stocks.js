const express = require('express');
const StockService = require('../services/stocks');
const stockRouter = express.Router();

stockRouter.get('/alldata', (req, res, next) => {
  StockService.getAllStockData()
    .then(stocks => {
      res.json({'stocks': stocks});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/all', (req, res, next) => {
  StockService.getAllStocks()
    .then(stocks => {
      res.json({'stocks': stocks});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

stockRouter.get('/update', (res, res, next) => {
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