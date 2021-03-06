import {QueryResult} from "pg";
import { Promotion } from "../models/promotion"
import { pool } from "./database";

export function insertPromotionRow(promo: Promotion): Promise<QueryResult> {
    return pool.query('INSERT INTO promotions (promo_name, end_date, details, company_name) VALUES ($1, $2, $3, $4) RETURNING promotion_id',
        [promo.promo_name, promo.end_date, promo.details, promo.company_name]);
}

export function selectPromotionRowByCompany(company_name: string): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotions WHERE company_name = $1 AND end_date >= CURRENT_DATE', [company_name]);
}

export async function selectPromotionRowById(id: number): Promise<Promotion | null> {
    let row = (await pool.query('SELECT * FROM promotions WHERE promotion_id = $1 AND end_date >= CURRENT_DATE', [id])).rows
    if (row.length ==0) return null
    return {
        promotion_id: row[0].promotion_id,
        promo_name: row[0].promo_name,
        end_date: row[0].end_date,
        details: row[0].details,
        storeIDs: [],
        company_name: row[0].company_name
    }
}

export async function getPromotionCompanyName(id: number): Promise<string | null> {
    let row = (await pool.query('SELECT company_name FROM promotions WHERE promotion_id = $1 AND end_date >= CURRENT_DATE', [id])).rows
    if (row.length ==0) return null
    return row[0].company_name
}

export function updatePromotionRow(promo: Promotion): Promise<QueryResult> {
    return pool.query('UPDATE promotions SET promo_name = $1, end_date = $2, details = $3 WHERE promotion_id = $4',
        [promo.promo_name, promo.end_date, promo.details, promo.promotion_id]);
}

export function deletePromotionRow(promo_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotions WHERE promotion_id = $1', [promo_id]);
}
