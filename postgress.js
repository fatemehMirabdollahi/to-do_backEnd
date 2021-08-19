const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "30101378",
  port: 5432,
});
module.exports = pool;
