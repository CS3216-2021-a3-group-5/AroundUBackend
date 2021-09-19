import {Pool} from "pg"
import { databasePassword, databaseUser } from "../config/config"
export const pool = new Pool({
    user: databaseUser,
    host: 'localhost',
    database: 'api',
    password: databasePassword,
    port: 5432,
})