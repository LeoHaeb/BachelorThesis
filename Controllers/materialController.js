const MaterialService = require('../Application/material-service');
const Material = require("../Entities/Material")

class MaterialController {
    constructor(matDatabase) {
        this.matDatabase = matDatabase;
    }



    async getMaterialwithID(id) {
        //create MAterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const material = await materialService.getMaterialwithID(id, this.matDatabase);

        console.log("MaterialController return for getMaterialwithID: " + material);
        return material;
    }



    async getAllMaterials() {

        //create MaterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const allMaterials = await materialService.getAllMaterials(this.matDatabase);

        console.log("MaterialController return for getAllMaterials: " + allMaterials);
        return allMaterials;
    }

    

    async addNewMaterial(req) {
        
        const reqBody = req.body;
         
        const recCycles = parseInt(reqBody.recCycles);
        const synthMatType = reqBody.synthMatType; 
        const manufacturer = reqBody.manufacturer; 
        const size = parseInt(reqBody.size); 
        const date = reqBody.date; 
        const employee = reqBody.employee;

        //create MaterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Use Case Layer to work with material object, dependency injection with material database
        const addedMat = await materialService.addNewMaterial(recCycles, synthMatType, manufacturer, size, date, employee, this.matDatabase);

        console.log("MaterialController return for addNewMaterial: " + addedMat);
        return addedMat;
    }



    async updateMaterial(req) {

        const reqBody = req.body;
        //create material object
        const material = new Material(parseInt(reqBody.matNr), parseInt(reqBody.recCycles), reqBody.synthMatType, reqBody.manufacturer, parseInt(reqBody.size), reqBody.date, reqBody.employee);

        //create MaterialService Object
        const materialService = new MaterialService(this.matDatabase)

        //invoke method from Use Use Case Layer to work with material object, dependency injection with material database
        const addedMat = await materialService.updateMaterial(material, this.matDatabase);

        console.log("MaterialController return for addNewMaterial: " + addedMat);
        return addedMat;
    }
}

module.exports = MaterialController;