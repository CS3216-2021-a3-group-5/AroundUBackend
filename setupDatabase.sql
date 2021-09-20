DROP DATABASE IF EXISTS api;
CREATE DATABASE api;
\ c api
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
  logo_path VARCHAR(100) NOT NULL,
  contact_number NUMERIC NOT NULL,
  category VARCHAR(100) NOT NULL REFERENCES categories (category)
);
INSERT INTO companies (
    company_name,
    email,
    password,
    logo_path,
    contact_number,
    category
  )
VALUES (
    'Company 1',
    'Company1@email.com',
    'password1',
    'Company1.jpg',
    11111111,
    'Electronics'
  ),
  (
    'Company 2',
    'Company12@email.com',
    'password12',
    'Company12.jpg',
    11111111,
    'Food'
  ),
  (
    'Company 3',
    'Company123@email.com',
    'password123',
    'Company123.jpg',
    11111111,
    'Fashion'
  );
CREATE TABLE stores (
  store_id SERIAL PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL REFERENCES companies (company_name) ON DELETE CASCADE,
  longitude NUMERIC NOT NULL,
  latitude NUMERIC NOT NULL,
  address VARCHAR(300) NOT NULL,
  opening_hours VARCHAR(300) NOT NULL
);
INSERT INTO stores (
    company_name,
    longitude,
    latitude,
    address,
    opening_hours
  )
VALUES (
    'Company 1',
    1.01,
    1.001,
    'store1 road #111',
    '8 am to 9 pm'
  ),
  (
    'Company 2',
    1.02,
    1.002,
    'store2 road #222',
    '8 am to 9 pm'
  ),
  (
    'Company 2',
    1.03,
    1.003,
    'store3 road #333',
    '8 am to 9 pm'
  );
CREATE TABLE promotions (
  promotion_id SERIAL PRIMARY KEY,
  promo_name VARCHAR(30) NOT NULL,
  company_name VARCHAR(100) NOT NULL REFERENCES companies (company_name) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL REFERENCES categories (category),
  end_date DATE NOT NULL,
  details TEXT NOT NULL
);
INSERT INTO promotions (
    company_name,
    promo_name,
    category,
    end_date,
    details
  )
VALUES (
    'Company 1',
    'promo 1',
    'Electronics',
    '2021-12-12',
    '1 long description here'
  ),
  (
    'Company 2',
    'promo 2',
    'Food',
    '2021-12-12',
    '2 long description here'
  ),
  (
    'Company 3',
    'promo 3',
    'Fashion',
    '2021-12-12',
    '3 long description here'
  );
CREATE TABLE promotion_pictures (
  promotion_id INTEGER NOT NULL REFERENCES promotions (promotion_id) ON DELETE CASCADE,
  picture_path VARCHAR(100) NOT NULL,
  PRIMARY KEY (promotion_id, picture_path)
);
INSERT INTO promotion_pictures (promotion_id, picture_path)
VALUES (1, 'promopic1.jpg'),
  (2, 'promopic2.jpg'),
  (3, 'promopic3.jpg');
CREATE TABLE promotion_store (
  promotion_id INTEGER NOT NULL REFERENCES promotions (promotion_id) ON DELETE CASCADE,
  store_id INTEGER NOT NULL REFERENCES stores (store_id) ON DELETE CASCADE,
  PRIMARY KEY (promotion_id, store_id)
);
INSERT INTO promotion_store (promotion_id, store_id)
VALUES (1, 1),
  (2, 2),
  (3, 3);

DROP TABLE IF EXISTS image_files;
CREATE TABLE image_files(
    id SERIAL NOT NULL PRIMARY KEY,
    filename TEXT UNIQUE NOT NULL,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    size BIGINT NOT NULL
);
