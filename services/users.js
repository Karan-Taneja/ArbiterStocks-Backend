const db = require('./db');
const UserService = {};
module.exports = UserService;

UserService.addUser = (email) => db.oneOrNone('INSERT INTO users (email) VALUES ($[email]) RETURNING *', { email });
UserService.getUserByEmail = (email) => db.oneOrNone('SELECT * FROM users WHERE email = $[email]', { email });
UserService.updateUserFunds = (email, funds) => db.oneOrNone('UPDATE users SET funds = $[funds] WHERE email = $[email] RETURNING *', { email, funds });