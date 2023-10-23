const postGreSQL = require('pg'); 

const pool = new postGreSQL.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'DB_zOne',
    password: 'PostgreSQL_2023',
    dialect: 'postgres',
    port: 5432
});
//connect to Database
pool.connect();

module.exports = pool;