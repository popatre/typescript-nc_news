const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "dev";

const config =
    ENV === "production"
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {};

require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}

export default new Pool(config);
