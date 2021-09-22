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

export async function getPrmotionByID(id: number): Promise<Promotion | null> {
    let row = (await pool.query('SELECT * FROM promotions WHERE promotion_id = $1', [id])).rows
    if (row.length ==0) return null
    return {
        promotion_id: row[0].promotion_id,
        promo_name: row[0].promo_name,
        end_date: row[0].end_data,
        details: row[0].details,
        storeIDs: [],
        company_name: row[0].company_name
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
*/
export function deletePromotion(promo_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotions WHERE id = $1', [promo_id]);
}

