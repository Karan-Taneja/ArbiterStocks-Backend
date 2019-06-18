const db = require('./db');
const TransactionService = {};
module.exports = TransactionService;

TransactionService.addTransaction = (user_id, stock_id, quantity, price_per_stock) => {
  const now = new Date();
  const total = quantity * price_per_stock;
  const sql = `INSERT INTO transactions (user_id, stock_id, quantity, price_per_stock, total_price, transaction_date)
   VALUES ($[user_id], $[stock_id], $[quantity], $[price_per_stock], $[total], $[now]) RETURNING *`;
  return db.one(sql, { user_id, stock_id, quantity, price_per_stock, total, now });
};

TransactionService.viewUsersTransactions = (user_id) => db.any('SELECT * FROM transactions WHERE user_id = $[user_id]', { user_id });
