import {QueryResult, QueryResultRow} from "pg";
import { Store } from "../models/store"
import { Promotion } from "../models/promotion";

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

export function createPromotionAtStore(promo: Promotion, store: Store, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('INSERT INTO promotion_store (promotion_id, store_id) VALUES ($1, $2)',
        [promo.promoID, store.storeID],
        handleResult);
}

export function getPromotionAtStore(promoId: number, storeId: number, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promoId, storeId], handleResult);
}

export function getPromotionByStore(store: Store, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store JOIN promotions p on p.id = promotion_store.promotion_id WHERE store_id = $1',
        [store.storeID], handleResult);
}

export function getStoreByPromotion(promo: Promotion, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM promotion_store JOIN stores s on promotion_store.store_id = s.id WHERE promotion_id = $1',
        [promo.promoID], handleResult);
}

export function deletePromotionAtStore(promo: Promotion, store: Store, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('DELETE FROM promotion_store WHERE promotion_id = $1 AND store_id = $2', [promo.promoID, store.storeID], handleResult);
}
