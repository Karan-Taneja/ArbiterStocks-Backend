const db = require('./db');
const axios = require('axios');
const StockService = {};
const baseUrl = 'https://cloud.iexapis.com/stable';
const key = process.env.IEX_API_KEY
module.exports = StockService;

StockService.getOpeningStockPrice = (symbol) => {
  symbol = encodeURI(symbol);
  return axios.get(`${baseUrl}/stock/${symbol}/ohlc?token=${key}`)
    .then(res => {
      return res.data.open.price;
    })
    .catch(err => {
      console.log(err);
    });
};
StockService.getStockById = (id) => db.oneOrNone('SELECT * FROM stocks WHERE id=$[id]', { id });
StockService.getStockBySymbol = (symbol) => db.oneOrNone('SELECT * FROM stocks WHERE symbol = $[symbol]', { symbol });
StockService.getAllStocks = () => db.any('SELECT symbol, company FROM stocks');
StockService.getAllStockData = () => db.any('SELECT * FROM stocks');

StockService.updateStock = (symbol, open_price) => {
  const now = new Date();
  return db.oneOrNone(`UPDATE stocks SET open_price = $[open_price], updated = $[now] WHERE symbol = $[symbol] RETURNING *`, { symbol, open_price, now })
};

StockService.updateAllStocks = async () => {
  return StockService.getAllStocks()
    .then(async stocks => {
      let count = 0;
      const nuStocks = [];
      for(let stock of stocks){
        if(count > 0) break;
        const symbol = stock.symbol;
        try{
          const open_price = await StockService.getOpeningStockPrice(symbol);
          const nuStock = await StockService.updateStock(symbol, open_price);
          nuStocks.push(nuStock);
        }
        catch(err) {
          console.log(err);
        };
        count++;
      };
      return nuStocks;
    })
    .catch(err => {
      console.log(err);
    });
};

StockService.populateStocks = () => {
  return axios.get(`${baseUrl}/ref-data/symbols?token=${key}`)
    .then(async res => {
      const vals = {};
      try {
        const existing = await db.any('SELECT symbol FROM stocks');
        for(let i = 0; i < existing.length; i++){
          const curr = existing[i].symbol
          vals[curr] = curr;
        };
        const stocks = res.data;
        for(let stock of stocks){
            let { symbol, type, name, currency, region } = stock;
            if(vals[symbol]) continue;
            vals[symbol] = symbol;
            if(!symbol || !type || !name || !currency || !region) continue;
            s = encodeURI(symbol);
            const now = new Date();
            const logo_res = await axios.get(`${baseUrl}/stock/${s}/logo?token=${key}`);
            const logo = logo_res.data.url;
            if(!logo) continue;
            const open_price_res = await axios.get(`${baseUrl}/stock/${s}/ohlc?token=${key}`);
            const open_price = open_price_res.data.open.price;
            if(!open_price) continue;
            const sql = `INSERT INTO stocks (symbol, stock_type, company, currency, region, logo, open_price, updated) 
            VALUES ($[symbol], $[type], $[name], $[currency], $[region], $[logo], $[open_price], $[now]) RETURNING id`;
            const id = await db.oneOrNone(sql, { symbol, type, name, currency, region, logo, open_price, now });
            console.log(id);
        };
      }
      catch(err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });
}

