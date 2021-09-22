require('dotenv').config()

export const port = process.env.PORT || 3080

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const databasePassword = process.env.DATABASE_PASSWORD || "password";

export const databaseUser = process.env.DATABASE_USER || "yufeng"
