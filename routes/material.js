const express = require('express');
const matRouter = express.Router();
const path = require('path');
const MATDAO = require('../DAO/matDAO');

matRouter.get('/', function(req, res) {
    console.log("__dirname: " + __dirname);
    res.sendFile(path.join(__dirname, '/FormularMaterialAnlegen.html'));
});

matRouter.get('/getAllMaterials', async function(req, res) {
    console.log('get all Materials from "DB_Material"\n');

    try {
        const matDAO = new MATDAO(req.app.locals.client);
        result = matDAO.getAllMaterials();
    } catch(ex) {
        console.log("Problem in Connecting and query in Database\n")
    }
    res.send(JSON.stringify(result));
});





//-----------------------------------------------------------------------------------------------------------
matRouter.post('/addMAterial', async function(req, res) {
    console.log('add Material to "DB_Material"\n');
    console.log(req.body);

    try {
        client = await req.app.locals.pool.connect();
        result = await client.query('select * from DB_Material');
    } catch(ex) {
        console.log("Problem in Connecting and query in Database\n")
    }
    res.send(JSON.stringify(result));
});

module.exports = matRouter;