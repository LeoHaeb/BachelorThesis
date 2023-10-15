const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

var materialRouter = require('./Material/matRouting.js');
app.use('/Material', materialRouter);

app.listen(port);
dsgfgdfhdgh;
console.log('Server started at http://localhost: ' + port);


const postGreSQL = require('pg'); 

const pool = new postGreSQL.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'DB_zOne',
    password: 'PostgreSQL_2023',
    dialect: 'postgres',
    port: 5432
});

pool.connect();

    client = await pool.connect().then(app.locals.client = client);
