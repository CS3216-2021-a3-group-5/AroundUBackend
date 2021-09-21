import {QueryResult } from "pg";
import { pool } from "./databaseSetUp";

export function createPromotionAtStore(promotion_id: number, store_id: number): Promise<QueryResult> {
    return pool.query('INSERT INTO promotion_store (promotion_id, store_id) VALUES ($1, $2)',
        [promotion_id, store_id]);
}

export function getPromotionAtStore(promoId: number, storeId: number): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promoId, storeId]);
}

export function getPromotionByStore(store_id: number): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotion_store JOIN promotions p on p.id = promotion_store.promotion_id WHERE store_id = $1',
        [store_id]);
}

export function getStoreByPromotion(promotion_id: number): Promise<QueryResult> {
    return pool.query('SELECT * FROM promotion_store JOIN stores s on promotion_store.store_id = s.id WHERE promotion_id = $1',
        [promotion_id]);
}

export function deletePromotionAtStore(promotion_id: number, store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promotion_id, store_id]);
}

export function deleteByPromotion(promotion_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE promotion_id = $1', [promotion_id]);
}

export function deleteByStore(store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM promotion_store WHERE store_id = $1', [store_id]);
}

export async function getPromotionIdByStoreID(store_id: number): Promise<QueryResult> {
    return pool.query('SELECT promotion_id FROM promotion_store WHERE store_id = $1', [store_id])
}

export async function getStoreIdByPromotionID(promotion_id: number): Promise<QueryResult> {
    return pool.query('SELECT store_id FROM promotion_store WHERE promotion_id = $1', [promotion_id])
}
