import {QueryResult} from "pg";
import { pool } from "./database";

export function insertPromotionAtStoreRow(promotion_id: number, store_id: number): Promise<QueryResult> {
    return pool.query('INSERT INTO promotion_store (promotion_id, store_id) VALUES ($1, $2)',
        [promotion_id, store_id]);
}

export function deletePromotionAtStoreRow(promotion_id: number, store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promotion_id, store_id]);
}

export function deleteRowByStore(store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE store_id = $1', [store_id]);
}

export function deleteRowByPromotion(promo_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE promotion_id = $1', [promo_id]);
}

export async function selectPromotionIdAtStore(store_id: number): Promise<QueryResult> {
    return pool.query('SELECT promotion_id FROM promotion_store WHERE store_id = $1', [store_id])
}

export async function selectStoreIdWithPromotion(promotion_id: number): Promise<QueryResult> {
    return pool.query('SELECT store_id FROM promotion_store WHERE promotion_id = $1', [promotion_id])
}

export async function selectNumberOfPromotionAtStore(store_id: number): Promise<number> {
    let data = await pool.query('SELECT COUNT(*) FROM promotion_store WHERE store_id = $1', [store_id])
    return data.rows[0].count
}
