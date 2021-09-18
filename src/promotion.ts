import * as geoutils from "geolocation-utils";
import {Request, Response} from "express";
import {QueryResult, QueryResultRow} from "pg";

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

// const createUser = (request: Request, response: Response) => {
//     const { name, email } = request.body
//
//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error: Error, results: QueryResult) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${results.rows}`)
//     })
// }

export interface Promotion {
    id: number;
    category: string;
    store_name: string;
    promo_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    details: string;
    position: geoutils.Location
}

// var promotions: Array<Promotion> = [{
//     id: "werw",
//     category: "somethuing",
//     storename: "store1",
//     promoname: "name2",
//     description: "happy",
//     position: {lat: 1.2, lon: 0.2}
// }, {
//     id: "werw2",
//     category: "someth3uing",
//     storename: "store12",
//     promoname: "name21",
//     description: "happ2y",
//     position: {lat: 1.1, lon: 0.12}
// }]

function promoToObject<R extends QueryResultRow>(result: R): Promotion {
    const promo: Promotion = {
        id: result.id,
        category: result.category,
        store_name: result.store_name,
        promo_name: result.promo_name,
        description: result.description,
        start_date: result.start_date,
        end_date: result.end_date,
        details: result.details,
        position: {lat: result.latitude, lon: result.longitude}
    }
    return promo;
}

const range = 700000;
export function promotionsGET(req: Request, res: Response) {
    const loc: geoutils.Location = req.body.currentLocation;
    console.log(loc);

    pool.query('SELECT * FROM promotion ORDER BY id ASC', (error: Error, results: QueryResult) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(200).send(results.rows.filter((result)=> {
            const promo: Promotion = promoToObject(result);
            const dist = geoutils.distanceTo(loc, promo.position);
            console.log(dist);
            // return dist <= range && promo.end_date <= new Date();
            return true;
        }))
    })
}

export function promotionByIdGET(req: Request, res: Response) {
    const id = req.params.id;
    console.log(id);

    pool.query('SELECT * FROM promotion WHERE id = $1', [id], (error: Error, results: QueryResult) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(200).send(results.rows.map((result)=> {
             return promoToObject(result);
        })[0])
    })
}

export function loginVerify(req: Request, res: Response) {
    const password = "password1";
    const email = "store1@email.com";

    pool.query('SELECT * FROM store_account WHERE email = $1 AND password = $2', [email, password], (error: Error, results: QueryResult) => {
        if (error) {
            res.status(500).send(error);
        }
        if (results.rows.length != 1) {
            res.status(200).send('Login failed');
        } else {
            const storeName: number = results.rows[0].get('name');
            pool.query('SELECT * FROM promotion WHERE store_name = $1', [storeName], (error: Error, results: QueryResult) => {
                if (error) {
                    res.status(500).send(error);
                }
                res.status(200).send(results.rows);
            })
        }
    })
}

export function registerStore(req: Request, res: Response) {
    const { name, email, password, logo, contact_number } = req.body;
    const opening_hours = '8 am to 10 pm daily';

    pool.query('INSERT INTO store_account (name, email, password, logo, opening_hours, contact_number) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, email, password, logo, opening_hours, contact_number], (error: Error, results: QueryResult) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(201).send(`Store added`)
    })
}

export function updatePromotion(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const { name, category, longitude, latitude, start_date, end_date, details, description, store_name } = req.body

    pool.query(
        'UPDATE promotion SET name = $1, category = $2, longitude = $3, latitude = $4, ' +
        'start_date = $5, end_date = $6, details = $7, description = $8, store_name = $9 WHERE id = $10',
        [name, category, longitude, latitude, start_date, end_date, details, description, store_name, id],
        (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Promotion modified with ID: ${id}`)
        }
    )
}

export function deletePromotion(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM promotion_picture WHERE promotion_id = $1', [id], (error: Error, results: QueryResult) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Promotion deleted with ID: ${id}`)
    })

    pool.query('DELETE FROM promotion WHERE id = $1', [id], (error: Error, results: QueryResult) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Promotion deleted with ID: ${id}`)
    })
}
