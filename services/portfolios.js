const db = require('./db');
const PortfolioService = {};
module.exports = PortfolioService;

PortfolioService.addStock = (user_id, stock_id, quantity) => db.oneOrNone('INSERT INTO portfolios (user_id, stock_id, quantity) VALUES ($[user_id], $[stock_id], $[quantity]) RETURNING *', { user_id, stock_id, quantity });
PortfolioService.updateStock = (user_id, stock_id, quantity) => db.oneOrNone('UPDATE portfolios SET quantity = $[quantity] WHERE user_id = $[user_id] AND stock_id = $[stock_id] RETURNING *', { user_id, stock_id, quantity });
PortfolioService.viewUserPortfolio = (user_id) => db.any('SELECT * FROM portfolios WHERE user_id = $[user_id]', { user_id });