//MODULES
let env = '';
if (process.env.NODE_ENV !== 'production') env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//ROUTERS
const userRouter = require('./routes/users');
const stockRouter = require('./routes/stocks');
const transactionRouter = require('./routes/transactions');
const portfolioRouter = require('./routes/portfolios');

//APP
const app = express();

//CRON
const job = require('./services/cron');
job.start();

//ROUTERS & MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);
app.use('/stocks', stockRouter);
app.use('/portfolios', portfolioRouter);

//TEST ROUTE
app.get('/', (req, res) => {
  res.json({'test': true});
});

//ETC. 
app.listen(process.env.PORT || 5001, () => {
  console.log(`listening on port ${process.env.PORT || 5001}`)
})
