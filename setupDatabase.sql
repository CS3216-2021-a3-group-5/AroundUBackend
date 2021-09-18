DROP DATABASE IF EXISTS api;
CREATE DATABASE api;
\c api

DROP TABLE IF EXISTS store_account;
CREATE TABLE store_account
(
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100) UNIQUE NOT NULL,
    email          VARCHAR(100) UNIQUE NOT NULL,
    password       VARCHAR(100) NOT NULL,
    logo           VARCHAR(100) NOT NULL,
    opening_hours  VARCHAR(300) NOT NULL,
    contact_number NUMERIC      NOT NULL
);

INSERT INTO store_account (name, email, password, logo, opening_hours, contact_number)
VALUES
       ('Store 1', 'store1@email.com', 'password1', 'store1.jpg', '8 am to 8 pm daily', 11111111),
       ('Store 2', 'store12@email.com', 'password12', 'store12.jpg', '9 am to 9 pm daily', 11111111),
       ('Store 3', 'store123@email.com', 'password123', 'store123.jpg', '10 am to 10 pm daily', 11111111);

DROP TABLE IF EXISTS store_location;
CREATE TABLE store_location
(
    name      VARCHAR(100) REFERENCES store_account (name),
    longitude NUMERIC      NOT NULL,
    latitude  NUMERIC      NOT NULL,
    address   VARCHAR(300) NOT NULL,
    PRIMARY KEY (name, longitude, latitude)
);

INSERT INTO store_location (name, longitude, latitude, address)
VALUES
       ('Store 1', 1.01, 1.001, 'store1 road #111'),
       ('Store 2', 1.02, 1.002, 'store2 road #222'),
       ('Store 3', 1.03, 1.003, 'store3 road #333');

DROP TABLE IF EXISTS promotion;
CREATE TABLE promotion
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(30)  NOT NULL,
    category    VARCHAR(30)  NOT NULL,
    longitude   NUMERIC      NOT NULL,
    latitude    NUMERIC      NOT NULL,
    start_date  DATE         NOT NULL,
    end_date    DATE         NOT NULL,
    details     TEXT         NOT NULL,
    description VARCHAR(100) NOT NULL,
    store_name  VARCHAR(100) NOT NULL,
    FOREIGN KEY (store_name, longitude, latitude) REFERENCES store_location(name, longitude, latitude)
);

INSERT INTO promotion (name, category, longitude, latitude, start_date, end_date, details, description, store_name)
VALUES
       ('promo 1', 'category', 1.01, 1.001, '2021-12-12', '2021-12-12', '1 long description here', '1 great promo', 'Store 1'),
       ('promo 2', 'category', 1.02, 1.002, '2021-12-12', '2021-12-12', '2 long description here', '2 great promo', 'Store 2'),
       ('promo 3', 'category', 1.03, 1.003, '2021-12-12', '2021-12-12', '3 long description here', '3 great promo', 'Store 3'),
       ('promo 4', 'category', 1.02, 1.002, '2021-12-12', '2021-12-12', '4 long description here', '4 great promo', 'Store 2'),
       ('promo 5', 'category', 1.03, 1.003, '2021-12-12', '2021-12-12', '5 long description here', '5 great promo', 'Store 3');

DROP TABLE IF EXISTS promotion_picture;
CREATE TABLE promotion_picture
(
    promotion_id INTEGER      NOT NULL REFERENCES promotion (id),
    picture      VARCHAR(100) NOT NULL,
    PRIMARY KEY (promotion_id, picture)
);

INSERT INTO promotion_picture (promotion_id, picture)
VALUES
       (1, 'promopic1.jpg'),
       (2, 'promopic2.jpg'),
       (3, 'promopic3.jpg');
