const express = require('express');
const MaterialService = require('../Application/material-service');
const MatDatabase = require('../Gateways/material-database');
const Material = require('../Entities/Material');
//Einbinden Modul zur Verbindung mit Datenbank
const dbConnection = require('../DataBaseConnection');
const path = require('path');

//Erzeugen Router-Objekt aus Express-Middleware Router 
var matRouter = express.Router();

//Get-Anfrage für Material
matRouter.get('/getMaterial/:id', async function(req, res) {
    const id = req.params.id;

    //Datenbank-Objekt 
    const matDatabase = new MatDatabase(dbConnection );
    //MAterial-Service-Objekt
    const materialService = new MaterialService(matDatabase);

    const material = await materialService.getMaterialInfo(id);
    res.send(material);
    console.log(material.rows);
});

//POST-Anfrage für Material
matRouter.post('/addNewMaterial/', async function(req, res) {

    //Datenbank-Objekt 
    const matDatabase = new MatDatabase(dbConnection );
    //MAterial-Service-Objekt
    const materialService = new MaterialService(matDatabase);

    console.log("add new material to DB\n");
    console.log(req.body);

    const reqBody = req.body;

    try {
        const material = new Material(parseInt(reqBody.recCycles), reqBody.synthMatType, reqBody.manufacturer, parseInt(reqBody.size), reqBody.date, reqBody.employee);
        //const material = Material.constructor.apply(testString);
        const addedMat = await materialService.addNewMaterial(material);
        console.log("added Material: " + JSON.stringify(addedMat.rows));
        res.json(addedMat);
    } catch(error) {
        res.status(404).json({error: error.message})
    }

})

matRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "FormularMaterialAnlegen.html"));
})


module.exports = matRouter;

