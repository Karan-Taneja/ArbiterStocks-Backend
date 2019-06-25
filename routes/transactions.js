const express = require('express');
const TransactionService = require('../services/transactions');
const transactionRouter = express.Router();

transactionRouter.post('/', (req, res, next) => {
  const { user_id } = req.query;
  const { stock_id, quantity, price_per_stock, transaction_type } = req.body;
  TransactionService.addTransaction(user_id, stock_id, quantity, price_per_stock, transaction_type)
    .then(transaction => {
      res.json({'transaction': transaction});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
})

transactionRouter.get('/', (req, res, next) => {
  const { user_id } = req.query;
  TransactionService.viewUsersTransactions(user_id)
    .then(transactions => {
      res.json({'transactions': transactions});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

module.exports = transactionRouter;