const promise = require("bluebird");
const monitor = require("pg-monitor");

let initOptions = {};

// Display better error stack traces in development.
if (process.NODE_ENV !== "production") {
  promise.config({
    longStackTraces: true
  });
  initOptions = {
    promiseLib: promise
  };
}

// attach to all events at once;
monitor.attach(initOptions, ["query", "error"]);

// Import pg-promise and initialize the library with an empty object.
const pgp = require("pg-promise")(initOptions);

const databaseName = "barkboard";

let connectionConfig;

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  // Prepare the connection URL from the format: 'postgres://username:password@host:port/database';
  connectionConfig = `postgres://localhost:5432/${databaseName}`;
} else if (process.env.NODE_ENV === "production") {
  // Heroku will set this variable for you.
  connectionConfig = process.env.DATABASE_URL;
}

// Creating a new database connection with the provided configuration.
const db = pgp(connectionConfig);

module.exports = db;