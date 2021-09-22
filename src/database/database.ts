import {Pool} from "pg"
import {database, databaseHost, databasePassword, databaseUser} from "../config/config"
export const pool = new Pool({
    user: databaseUser,
    host: databaseHost,
    database: database,
    password: databasePassword,
    port: 5432,
})
