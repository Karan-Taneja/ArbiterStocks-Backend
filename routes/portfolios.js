const express = require('express');
const PortfolioService = require('../services/portfolios');
const portfolioRouter = express.Router();

portfolioRouter.post('/', (req, res, next) => {
  const { user_id, stock_id, quantity } = req.body;
  PortfolioService.addStock(user_id, stock_id, quantity)
    .then(stock => {
      res.json({'stock': stock});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

portfolioRouter.put('/', (req, res, next) => {
  const { user_id, stock_id, quantity } = req.body;
  PortfolioService.updateStock(user_id, stock_id, quantity)
  .then(stock => {
    res.json({'stock': stock});
  })
  .catch(err => {
    res.status(404).json({'err': err});
  });
});

portfolioRouter.get('/', (req, res, next) => {
  const { user_id } = req.query;
  PortfolioService.viewUserPortfolio(user_id)
    .then(portfolio => {
      res.json({'portfolio': portfolio});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

module.exports = portfolioRouter;