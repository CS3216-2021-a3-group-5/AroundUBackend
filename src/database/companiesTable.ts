import {QueryResult, QueryResultRow} from "pg";
import { Company } from "../models/company"

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

export function createCompany(co: Company, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('INSERT INTO companies (name, email, password, logo_path, contact_number, category) VALUES ($1, $2, $3, $4, $5, $6)',
        [co.name, co.email, co.password, 'picture.jpg', co.contact_no, co.category],
        handleResult);
}

export function updateCompany(co: Company, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('UPDATE companies SET name = $1, password = $2, logo_path = $3, contact_number = $4, category = $5 WHERE email = $6',
        [co.name, co.password, 'picture.jpg', co.contact_no, co.category,  co.email],
        handleResult);
}

// use to get company detail and then verify password
export function getCompanyByEmail(email: string, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('SELECT * FROM companies WHERE email = $1', [email], handleResult);
}

export function deleteCompany(co: Company, handleResult: (error: Error, results: QueryResult) => void) {
    pool.query('DELETE FROM companies WHERE email = $1', [co.email], handleResult);
}
