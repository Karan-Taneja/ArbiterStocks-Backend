DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stocks CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  funds NUMERIC DEFAULT 5000
);

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR UNIQUE NOT NULL,
  stock_type VARCHAR,
  company VARCHAR NOT NULL,
  currency VARCHAR NOT NULL,
  region VARCHAR NOT NULL,
  logo VARCHAR,
  open_price NUMERIC NOT NULL,
  updated TIMESTAMP NOT NULL
);

CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  stock_id INT NOT NULL,
    FOREIGN KEY (stock_id)
    REFERENCES stocks(id)
    ON DELETE CASCADE,
  quantity INT NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  stock_id INT NOT NULL,
    FOREIGN KEY (stock_id)
    REFERENCES stocks(id)
    ON DELETE CASCADE,
  quantity INT NOT NULL,
  price_per_stock NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  transaction_date TIMESTAMP NOT NULL,
  transaction_type VARCHAR NOT NULL
);