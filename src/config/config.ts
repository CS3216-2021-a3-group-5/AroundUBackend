require('dotenv').config()

export const port = process.env.PORT || 3080

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";