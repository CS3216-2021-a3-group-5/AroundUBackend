import {Pool, Client} from "pg"
import {connection, database, databaseHost, databasePassword, databaseUser} from "../config/config"
export const pool = new Pool({
    connectionString: connection,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect();

