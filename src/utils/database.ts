import pg from "pg";
import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
  throw new Error("Missing database credentials");
}

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  dialectModule: pg,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
});

export { sequelize };
