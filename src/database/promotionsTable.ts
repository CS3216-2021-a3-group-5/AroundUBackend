import {QueryResult, QueryResultRow} from "pg";
import { Promotion } from "../models/promotion"
import { pool } from "./databaseSetUp";


export function createPromotion(promo: Promotion): Promise<QueryResult> {
    return pool.query('INSERT INTO promotions (promo_name, category, end_date, details, company_name) VALUES ($1, $2, $3, $4, $5) RETURNING promotion_id',
        [promo.promo_name, promo.category, promo.end_date, promo.details, promo.company_name]);
}

export function getPromotionByCompany(company_name: string): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotions WHERE company_name = $1', [company_name]);
}

/*
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
*/