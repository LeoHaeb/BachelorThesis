const Material = require('../Entities/Material');

class MaterialService {
    //constructor for service-object
    //database is attribute of this object
    constructor () {
    }

    //method to get material from database for specific matNr = id
    async getMaterialwithID(id, matDatabase) {
        try {
            //draw all information for custoemr from database
            const material = await matDatabase.getMatById(id);
            const materialRow = material.rows[0];

            //create Material Object with information from database
            //constructor(matNr = null, recCycles=null, synthMatType=null, manufacturer=null, size=null, date=null, employee=null)
            materialReturnObj = new Material(materialRow.matnr, materialRow.reccycles, materialRow.synthmattype, materialRow.employee, materialRow.manufacturer, materialRow.size, materialRow.date);

            console.log("MaterialService return for getMaterialwithID(id = " + id + "): " + materialReturnObj);
            return materialReturnObj;
        }
        catch(ex) {
            console.log("No Material found with ID = " + id);
        }
    }

    //method for adding new material object to material database
    async addNewMaterial(recCycles, synthMatType, manufacturer, size, date, employee, matDatabase) {
        try{
            //create new Object form entity Material
            const mat = new Material(null, recCycles, synthMatType, manufacturer, size, date, employee);

            //use dependency injection to add new material to database
            const res = await matDatabase.addNewMaterialEntity(mat);
            console.log("result of addNewMaterialEntity: " + res);

            //set matNr with given id from db
            mat.setMatNr(res.rows[0].matnr);

            console.log("MaterialService return for addNewMaterial: " + mat);
            return mat;
        } catch(ex){
            console.log("Adding new Material failed !\n");
        }
    }

    //method to get all materials from material database
    async getAllMaterials(matDatabase) {
        try {
            const allMaterials = await matDatabase.getAllMaterialsEntities();
            
            const returnMaterialList = [];

            for (let i = 0; i < allMaterials.rows.length; i++) {

                var materialRow = allMaterials.rows[i];
                var materialObj = new Material(materialRow.matnr, materialRow.reccycles, materialRow.synthmattype, materialRow.employee, materialRow.manufacturer, materialRow.size, materialRow.date);
                returnMaterialList.push(materialObj);
            }
            return returnMaterialList;
        } catch (ex) {
            console.log("Getting all Materials failed !\n")
        }
    }

    //method to update specific material object in material database
    async updateMaterial(newMat, matDatabase) {
        try {
            const res = await matDatabase.updateMaterialEntity(newMat);
            return res;
        } catch(ex) {
            console.log("updating material with matNr = " + newMat.matNr + " failed");
        }
    }
}

module.exports = MaterialService;