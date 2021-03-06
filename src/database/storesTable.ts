import { Query, QueryResult } from "pg";
import { Store } from "../models/store"
import { pool } from "./database";

export function insertStoreRow(store: Store): Promise<QueryResult> {
    return pool.query('INSERT INTO stores (company_name, longitude, latitude, address, opening_hours) VALUES ($1, $2, $3, $4, $5) RETURNING store_id',
        [store.company_name, store.location.lon, store.location.lat, store.address, store.opening_hours]);
}

export function updateStoreRow(store: Store): Promise<QueryResult> {
    console.log(store)
    return pool.query('UPDATE stores SET longitude = $1, latitude = $2, address = $3, opening_hours = $4 WHERE store_id = $5',
        [store.location.lon, store.location.lat, store.address, store.opening_hours, store.store_id]);
}

export async function getStoreByIdWithCompany(id: number): Promise<QueryResult> {
    return pool.query('SELECT * FROM stores JOIN companies ON stores.company_name = companies.company_name WHERE store_id = $1', [id]);
}

export async function getStoreCompanyName(id: number): Promise<string | null> {
    let data = (await pool.query('SELECT company_name FROM stores WHERE store_id = $1', [id])).rows;
    if (data.length == 0) {
        return null;
    } 
    return data[0].company_name
}

export async function selectStoreCompanyRowByCompany(id: number): Promise<Store | null> {
    let data = (await pool.query('SELECT * FROM stores JOIN companies ON stores.company_name = companies.company_name WHERE store_id = $1', [id])).rows;
    if (data.length == 0) {
        return null;
    }
    return {
        store_id: data[0].store_id,
        address: data[0].address,
        location: {lat: data[0].latitude, lon: data[0].longitude},
        opening_hours: data[0].opening_hours,
        promotionIDs: [],
        company_name: data[0].company_name
    }
}

export async function selectStoreRowByCompany(company_name: string): Promise<Store[]> {
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
export function selectAllStoresFromCompany(): Promise<QueryResult> {
    return pool.query('SELECT * FROM stores JOIN companies ON stores.company_name = companies.company_name');
}

export function deleteStoreRow(store_id: number): Promise<QueryResult> {
    return pool.query('DELETE FROM stores WHERE store_id = $1', [store_id]);
}


