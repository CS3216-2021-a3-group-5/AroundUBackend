import {QueryResult, QueryResultRow} from "pg";
import { Promotion } from "../models/promotion"
import { pool } from "./databaseSetUp";


export function createPromotion(promo: Promotion): Promise<QueryResult> {
    return pool.query('INSERT INTO promotions (promo_name, end_date, details, company_name) VALUES ($1, $2, $3, $4) RETURNING promotion_id',
        [promo.promo_name, promo.end_date, promo.details, promo.company_name]);
}

export function getPromotionByCompany(company_name: string): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotions WHERE company_name = $1', [company_name]);
}

export async function getPrmotionByID(id: number): Promise<Promotion> {
    let row = (await pool.query('SELECT * FROM promotions WHERE promotion_id = $1', [id])).rows[0]
    return {
        promotion_id: row.promotion_id,
        promo_name: row.promo_name,
        end_date: row.end_data,
        details: row.details,
        storeIDs: [],
        company_name: row.company_name
    }
}
/*
export function updatePromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('UPDATE promotions SET name = $1, end_date = $2, details = $3 WHERE id = $4',
        [promo.promoName, promo.end_date, promo.details, promo.promoID],
        handleResult);
}

export function getPromotionById(id: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotions WHERE id = $1', [id], handleResult);
}

export function deletePromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('DELETE FROM promotions WHERE id = $1', [promo.promoID], handleResult);
}
*/
