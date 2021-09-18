import {QueryResult, QueryResultRow} from "pg";
import { Promotion } from "../models/promotion"

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

export function createPromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('INSERT INTO promotions (name, category, end_date, details) VALUES ($1, $2, $3, $4)',
        [promo.promoName, promo.category, promo.end_date, promo.details],
        handleResult);
}

export function updatePromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('UPDATE promotions SET name = $1, category = $2, end_date = $3, details = $4 WHERE id = $5',
        [promo.promoName, promo.category, promo.end_date, promo.details, promo.promoID],
        handleResult);
}

export function getPromotionById(id: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotions WHERE id = $1', [id], handleResult);
}

export function deletePromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('DELETE FROM promotions WHERE id = $1', [promo.promoID], handleResult);
}
