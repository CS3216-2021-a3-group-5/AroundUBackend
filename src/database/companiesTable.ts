import {QueryResult} from "pg";
import { Company, CompanyInfo } from "../models/company"
import { pool } from "./databaseSetUp";

export function createCompany(co: Company): Promise<QueryResult> {
    return pool.query('INSERT INTO companies (company_name, email, password, contact_number, category) VALUES ($1, $2, $3, $4, $5)',
        [co.company_name, co.email, co.password, co.contact_no, co.category])
}

export function updateCompany(co: Company): Promise<QueryResult> {
    return pool.query('UPDATE companies SET name = $1, password = $2, contact_number = $3, category = $4 WHERE email = $5',
        [co.company_name, co.password, co.contact_no, co.category,  co.email]);
}

export async function getCompanyByEmail(email: string): Promise<Company> {
    const data = await pool.query('SELECT * FROM companies WHERE email = $1', [email]);
    if (data.rows.length == 0) {
        throw new Error("no such company!")
    }
    return data.rows[0]
}

export async function getCompanyInfoByName(name: string): Promise<CompanyInfo> {
    const data = await pool.query('SELECT * FROM companies WHERE company_name = $1', [name]);
    if (data.rows.length == 0) {
        throw new Error("no such company!")
    }
    return new CompanyInfo(data.rows[0])
}

export function deleteCompany(co: Company): Promise<QueryResult> {
    return pool.query('DELETE FROM companies WHERE email = $1', [co.email]);
}
