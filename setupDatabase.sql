DROP DATABASE IF EXISTS api;
CREATE DATABASE api;
\c api;
DROP TABLE IF EXISTS company_logos;
DROP TABLE IF EXISTS promotion_store;
DROP TABLE IF EXISTS promotion_pictures;
DROP TABLE IF EXISTS promotions;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (category VARCHAR(100) PRIMARY KEY);
INSERT INTO categories (category)
VALUES ('Beauty & Wellness'),
  ('Electronics'),
  ('Fashion'),
  ('Food'),
  ('Others');
CREATE TABLE companies (
  company_name VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  contact_number NUMERIC NOT NULL,
  category VARCHAR(100) NOT NULL REFERENCES categories (category)
);

CREATE TABLE stores (
  store_id SERIAL PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL REFERENCES companies (company_name) ON DELETE CASCADE,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  address VARCHAR(300) NOT NULL,
  opening_hours VARCHAR(300) NOT NULL
);

CREATE TABLE promotions (
  promotion_id SERIAL PRIMARY KEY,
  promo_name VARCHAR(30) NOT NULL,
  company_name VARCHAR(100) NOT NULL REFERENCES companies (company_name) ON DELETE CASCADE,
  end_date DATE NOT NULL,
  details TEXT NOT NULL
);

CREATE TABLE promotion_pictures (
  promotion_id INTEGER NOT NULL REFERENCES promotions (promotion_id) ON DELETE CASCADE,
  filename TEXT PRIMARY KEY NOT NULL,
  filepath TEXT NOT NULL,
  mimetype TEXT NOT NULL
);

CREATE TABLE promotion_store (
  promotion_id INTEGER NOT NULL REFERENCES promotions (promotion_id) ON DELETE CASCADE,
  store_id INTEGER NOT NULL REFERENCES stores (store_id) ON DELETE CASCADE,
  PRIMARY KEY (promotion_id, store_id)
);

CREATE TABLE company_logos(
    filename TEXT PRIMARY KEY REFERENCES companies (company_name) ON DELETE CASCADE,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO me;

