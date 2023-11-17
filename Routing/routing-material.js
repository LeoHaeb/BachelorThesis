const express = require('express');
const MaterialController = require('../Controllers/MaterialController');
const MatDatabase = require('../DB/material-database');
//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const path = require('path');
 
//create routing-object from express middleware 
var matRouter = express.Router();

//get-requests for material
matRouter.get('/getMaterial/:id', async function(req, res) {
    const id = req.params.id;

    try {
        //Database-Connection Object
        const dbConnection = new DBConnection();
        //database-object 
        const matDatabase = new MatDatabase(dbConnection);
        //create material controller object with dependency injection of database
        const materialController = new MaterialController(matDatabase);

        console.log("http-request to get material with id = " +req.params.id  + " from DB\n");

        const material = await materialController.getMaterialwithID(id);
        console.log("Material with ID = " + id + ": " + material.rows[0]);
        res.send(material);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
});



//Get all Materials from Material DB
matRouter.get('/getAllMaterial/', async function(req, res) {
    try {
    //Database-Connection Object
    const dbConnection = new DBConnection();
    //database-object 
    const matDatabase = new MatDatabase(dbConnection);
    //create material controller object with dependency injection of database
    const materialController = new MaterialController(matDatabase);

    console.log("http-request to get all material entries from DB\n");

        //get all database entries from db_material
        const allMaterials = await materialController.getAllMaterials();
        console.log("all Materials in Database: \n" + allMaterials);
        res.send(allMaterials);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
});


//POST-request for adding new material to database
matRouter.post('/addNewMaterial/', async function(req, res) {

    //Database-Connection Object
    const dbConnection = new DBConnection();
    //database-object 
    const matDatabase = new MatDatabase(dbConnection);
    //create material controller object with dependency injection of database
    const materialController = new MaterialController(matDatabase);

    console.log("http-request to add new material to DB\n");

    try {
        const addedMat = await materialController.addNewMaterial(req, res);
        console.log("added Material: " + JSON.stringify(addedMat));
        res.json(addedMat.stringifyMaterial());
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//POST-Anfrage für Material
matRouter.post('/updateMaterial/', async function(req, res) {
    
    //Database-Connection Object
    const dbConnection = new DBConnection();
    //database-object 
    const matDatabase = new MatDatabase(dbConnection);
    //create material controller object with dependency injection of database
    const materialController = new MaterialController(matDatabase);

    console.log("http-request to update material in DB\n");

    try {
        const updateMat = await materialController.updateMaterial(req);
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

