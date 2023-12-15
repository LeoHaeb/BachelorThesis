const postGreSQL = require('pg'); 

class DataBaseConnection {
    constructor() {
        this.pool = new postGreSQL.Pool({
            user: 'postgres',
            //connection to UNIX socket
            host: '/var/run/postgresql',
            database: 'DB_zOne',
            password: 'PostgreSQL_2023',
            dialect: 'postgres',
            port: 5432
        });
    }
}

module.exports = DataBaseConnection;