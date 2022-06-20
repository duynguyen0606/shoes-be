import * as dotenv from "dotenv"
dotenv.config()

export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || "") || 10;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
export const DB_HOST = process.env.DB_HOST ;
export const DB_PORT = process.env.DB_PORT ;
export const DB_USER = process.env.DB_USER ;
export const DB_PWD = process.env.DB_PWD ;
export const DB_NAME = process.env.DB_NAME;