require('dotenv').config()

export const port = process.env.PORT || 5432

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const databasePassword = process.env.DATABASE_PASSWORD || "82866ea05a5fea5b3bb0005171f6569a8b14494ee0c7acf7c7cdd41c882ca473";

export const databaseUser = process.env.DATABASE_USER || "cqbunckguzaxro";

export const databaseHost = process.env.DATABASE_HOST || "ec2-54-195-195-81.eu-west-1.compute.amazonaws.com";

export const database = process.env.DATABASE || "d1in2cpvdn85n9";

export const connection = process.env.DATABASE_URL || "postgres://cqbunckguzaxro:82866ea05a5fea5b3bb0005171f6569a8b14494ee0c7acf7c7cdd41c882ca473@ec2-54-195-195-81.eu-west-1.compute.amazonaws.com:5432/d1in2cpvdn85n9";
