const db = require('./db');
const TransactionService = {};
module.exports = TransactionService;

TransactionService.addTransaction = (user_id, stock_id, quantity, price_per_stock, transaction_type) => {
  const now = new Date();
  const total = quantity * price_per_stock;
  const sql = `INSERT INTO transactions (user_id, stock_id, quantity, price_per_stock, total_price, transaction_date, transaction_type)
   VALUES ($[user_id], $[stock_id], $[quantity], $[price_per_stock], $[total], $[now], $[transaction_type]) RETURNING *`;
  return db.one(sql, { user_id, stock_id, quantity, price_per_stock, total, now, transaction_type });
};

TransactionService.viewUsersTransactions = (user_id) => db.any('SELECT * FROM transactions WHERE user_id = $[user_id]', { user_id });
