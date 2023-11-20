const MaterialService = require('../Application/Material-service');
const Material = require("../Entities/Material")

class MaterialController {
    constructor(matDatabase) {
        this.matDatabase = matDatabase;
    }


    //method to get Material object with materialNr as id
    async getMaterialwithID(id) {
        //create MAterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const material = await materialService.getMaterialwithID(id, this.matDatabase);

        console.log("MaterialController return for getMaterialwithID: " + material);
        //return Material object
        return material;
    }


    //method to get all Materials as list of material Objects
    async getAllMaterials() {

        //create MaterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const allMaterials = await materialService.getAllMaterials(this.matDatabase);

        console.log("MaterialController return for getAllMaterials: " + allMaterials);
        return allMaterials;
    }

    
    //method to add new Material to db
    async addNewMaterial(req) {
        
        const reqBody = req.body;
        
        //get all information from request body to work with
        const recCycles = parseInt(reqBody.recCycles);
        const synthMatType = reqBody.synthMatType; 
        const manufacturer = reqBody.manufacturer; 
        const size = parseInt(reqBody.size); 
        const date = reqBody.date; 
        const employee = reqBody.employee;

        //create MaterialService Object
        const materialService = new MaterialService()

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const addedMat = await materialService.addNewMaterial(recCycles, synthMatType, manufacturer, size, date, employee, this.matDatabase);

        console.log("MaterialController return for addNewMaterial: " + addedMat);
        //return new material object
        return addedMat;
    }


    //update entry in material db
    async updateMaterial(req) {

        const reqBody = req.body;
        //create material object
        const material = new Material(parseInt(reqBody.matNr), parseInt(reqBody.recCycles), reqBody.synthMatType, reqBody.manufacturer, parseInt(reqBody.size), reqBody.date, reqBody.employee);

        //create MaterialService Object
        const materialService = new MaterialService(this.matDatabase)

        //invoke method from Use Case Layer to work with material object, dependency injection with material database
        const updatedMat = await materialService.updateMaterial(material, this.matDatabase);

        console.log("MaterialController return for updateMaterial: " + updatedMat);
        return updatedMat;
    }
}

module.exports = MaterialController;