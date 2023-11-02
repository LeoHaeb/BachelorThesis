const express = require('express');
const MaterialService = require('../Application/material-service');
const MatDatabase = require('../Gateways/material-database');
const Material = require('../Entities/Material');
//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const path = require('path');
 
//create routing-object from express middleware 
var matRouter = express.Router();

//get-requests for material
matRouter.get('/getMaterial/:id', async function(req, res) {
    const id = req.params.id;

    const dbConnection = new DBConnection();
    //database-Object 
    const matDatabase = new MatDatabase(dbConnection );
    //material-service-object
    const materialService = new MaterialService(matDatabase);

    //read out data from database for id
    const material = await materialService.getMaterialInfo(id);
    res.send(material);
    console.log(material.rows);
});

//Get all Materials from Material DB
matRouter.get('/getAllMaterial/', async function(req, res) {
    try {
        //Database-Connection Object
        const dbConnection = new DBConnection();
        //database-object 
        const matDatabase = new MatDatabase(dbConnection);
        //material-service-object
        const materialService = new MaterialService(matDatabase);

        //get all database entries from db_material
        const allMaterials = await materialService.getAllMaterials();
        res.send(allMaterials);
        console.log(allMaterials.rows);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
});


//POST-request for adding new material to database
matRouter.post('/addNewMaterial/', async function(req, res) {

    //database object
    const matDatabase = new MatDatabase(dbConnection );
    //material-service-object
    const materialService = new MaterialService(matDatabase);

    console.log("add new material to DB\n");
    console.log(req.body);

    const reqBody = req.body;

    try {
        //create new material-object
        const material = new Material(null, parseInt(reqBody.recCycles), reqBody.synthMatType, reqBody.manufacturer, parseInt(reqBody.size), reqBody.date, reqBody.employee);
        //add new material to database
        const addedMat = await materialService.addNewMaterial(material);
        console.log("added Material: " + JSON.stringify(addedMat.rows));
        res.json(addedMat);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//POST-Anfrage für Material
matRouter.post('/updateMaterial/', async function(req, res) {
    
    //Database-Connection Object
    const dbConnection = new DBConnection();
    //database object
    const matDatabase = new MatDatabase(dbConnection );
    //material-service-object
    const materialService = new MaterialService(matDatabase);

    console.log("update material in DB\n");
    console.log(req.body);

    const reqBody = req.body;

    try {
        //create new material-object with updated data
        const material = new Material(parseInt(reqBody.matNr), parseInt(reqBody.recCycles), reqBody.synthMatType, reqBody.manufacturer, parseInt(reqBody.size), reqBody.date, reqBody.employee);
        //update database dbn_material
        const updateMat = await materialService.updateMaterial(material);
        console.log("updated Material: " + JSON.stringify(updateMat.rows));
        res.json(updateMat);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//load html page for adding mateial
matRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "FormularMaterialAnlegen.html"));
})

//load html page for updating material
matRouter.get('/changeMaterial', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "FormularMaterialAendern.html"));
})

module.exports = matRouter;

