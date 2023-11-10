const postGreSQL = require('pg'); 

class DataBaseConnection {
    constructor() {
        this.pool = new postGreSQL.Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'DB_zOne',
            password: 'PostgreSQL_2023',
            dialect: 'postgres',
            port: 5432
        });
    }
}

module.exports = DataBaseConnection;