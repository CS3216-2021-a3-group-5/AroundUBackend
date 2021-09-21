import {QueryResult} from "pg";
import { Store } from "../models/store"
import { pool } from "./databaseSetUp";

export function createStore(store: Store): Promise<QueryResult> {
    return pool.query('INSERT INTO stores (company_name, longitude, latitude, address, opening_hours) VALUES ($1, $2, $3, $4, $5) RETURNING store_id',
        [store.company_name, store.location.lon, store.location.lat, store.address, store.opening_hours]);
}

export function updateStoreTable(store: Store): Promise<QueryResult> {
    return pool.query('UPDATE stores SET company_name = $1, longitude = $2, latitude = $3, address = $4, opening_hours = $5 WHERE id = $6',
        [store.company_name, store.location.lon, store.location.lat, store.address, store.opening_hours, store.store_id]);
}

export function getStoreById(id: number): Promise<QueryResult> {
    return pool.query('SELECT * FROM stores JOIN companies ON stores.company_name = companies.company_name WHERE store_id = $1', [id]);
}

export async function getStoreByCompany(company_name: string): Promise<Store[]> {
    const data = await pool.query('SELECT * FROM stores WHERE company_name = $1', [company_name]);
    return data.rows.map(row => {
        return {
            store_id: row.store_id,
            address: row.address,
            location: {
                lat: row.latitude,
                lon: row.longitude
            },
            opening_hours: row.opening_hours,
            promotionIDs: [],
            company_name: row.company_name
    }})
}

// use to get all stores followed by filtering of results to get near locations
export function getStores(): Promise<QueryResult> {
    return pool.query('SELECT * FROM stores JOIN companies ON stores.company_name = companies.company_name');
}

export function removeStore(store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM stores WHERE id = $1', [store_id]);
}


