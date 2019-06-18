const db = require('./db');
const UserService = {};
module.exports = UserService;

UserService.addUser = (email) => db.one('INSERT INTO users (email) VALUES ($[email]) RETURNING *', { email });
UserService.getUserByEmail = (email) => db.one('SELECT * FROM users WHERE email = $[email]', { email });
UserService.updateUserFunds = (email, funds) => db.one('UPDATE users SET funds = $[funds] WHERE email = $[email] RETURNING *', { email, funds });