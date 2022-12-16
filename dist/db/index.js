"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "dev";
require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`,
});
const config = ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
    }
    : {};
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
exports.default = new Pool(config);
