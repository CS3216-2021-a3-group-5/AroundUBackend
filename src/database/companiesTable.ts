import {QueryResult} from "pg";
import { Company, CompanyInfo } from "../models/company"
import { pool } from "./database";

export function insertCompanyRow(co: Company): Promise<QueryResult> {
    return pool.query('INSERT INTO companies (company_name, email, password, contact_number, category) VALUES ($1, $2, $3, $4, $5)',
        [co.company_name, co.email, co.password, co.contact_number, co.category])
}

export function updateCompanyRow(co: Company): Promise<QueryResult> {
    return pool.query('UPDATE companies SET name = $1, password = $2, contact_number = $3, category = $4 WHERE email = $5',
        [co.company_name, co.password, co.contact_number, co.category,  co.email]);
}

export async function selectCompanyRowByEmail(email: string): Promise<Company> {
    const data = await pool.query('SELECT * FROM companies WHERE email = $1', [email]);
    if (data.rows.length == 0) {
        throw new Error("no such company!")
    }
    return data.rows[0]
}

export async function selectCompanyRowByName(name: string): Promise<CompanyInfo> {
    const data = await pool.query('SELECT * FROM companies WHERE company_name = $1', [name]);
    if (data.rows.length == 0) {
        throw new Error("no such company!")
    }
    console.log(new CompanyInfo(data.rows[0]))
    return new CompanyInfo(data.rows[0])
}
