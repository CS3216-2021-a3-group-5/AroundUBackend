import {QueryResult, QueryResultRow} from "pg";
import { Store } from "../models/store"
import { Promotion } from "../models/promotion";
import { pool } from "./databaseSetUp";


export function createPromotionAtStore(promotion_id: number, store_id: number): Promise<QueryResult> {
    return pool.query('INSERT INTO promotion_store (promotion_id, store_id) VALUES ($1, $2)',
        [promotion_id, store_id]);
}

export function getPromotionAtStore(promoId: number, storeId: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promoId, storeId], handleResult);
}

export function getPromotionByStore(store_id: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store JOIN promotions p on p.id = promotion_store.promotion_id WHERE store_id = $1',
        [store_id], handleResult);
}

export function getStoreByPromotion(promotion_id: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store JOIN stores s on promotion_store.store_id = s.id WHERE promotion_id = $1',
        [promotion_id], handleResult);
}

export function deletePromotionAtStore(promotion_id: number, store_id: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('DELETE FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promotion_id, store_id], handleResult);
}

export async function getPromotionIdByStoreID(store_id: number): Promise<QueryResult> {
    return pool.query('SELECT promotion_id FROM promotion_store WHERE store_id = $1', [store_id])
}

export async function getStoreIdByPromotionID(promotion_id: number): Promise<QueryResult> {
    return pool.query('SELECT store_id FROM promotion_store WHERE promotion_id = $1', [promotion_id])
}

export async function getNumberOfPromotionOfStore(store_id: number): Promise<number> {
    let data = await pool.query('SELECT COUNT(*) FROM promotion_store WHERE store_id = $1', [store_id])
    return data.rows[0].count
}