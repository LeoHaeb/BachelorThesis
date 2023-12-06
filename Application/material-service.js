const Material = require('../Entities/Material');

class MaterialService {
    //constructor for service-object
    //database is attribute of this object
    constructor () {
    }

    //method to get material from database for specific matNr = id
    async getMaterialwithID(id, matDatabase) {
        try {
            //get entry from database for id
            const material = await matDatabase.getMaterialEntitywithID(id);
            const materialRow = material.rows[0];

            //create Material Object with information from database
            const materialReturnObj = new Material(materialRow.matnr, materialRow.reccycles, materialRow.synthmattype, materialRow.manufacturer, materialRow.size, materialRow.date, materialRow.employee);

            console.log("MaterialService return for getMaterialwithID(id = " + id + "): " + materialReturnObj);
            //return material object
            return materialReturnObj;
        }
        catch(ex) {
            console.log("Problem in class Material-service in method getMaterialwithID(" + id + ")");
            console.log("error: " + ex);
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
            console.log("Problem in class Material-service in method addNewMaterial");
        }
    }

    //method to get all materials from material database as list of Matreial Objects
    async getAllMaterials(matDatabase) {
        try {
            //get all materials entries from db
            const allMaterials = await matDatabase.getAllMaterialsEntities();
            
            //list for material objects
            const returnMaterialList = [];

            //create material object for each entry and push it to list
            for (let i = 0; i < allMaterials.rows.length; i++) {

                var materialRow = allMaterials.rows[i];
                var materialObj = new Material(materialRow.matnr, materialRow.reccycles, materialRow.synthmattype, materialRow.employee, materialRow.manufacturer, materialRow.size, materialRow.date);
                returnMaterialList.push(materialObj);
            }
            
            console.log("MaterialService return for getAllMaterials: " + returnMaterialList);
            return returnMaterialList;
        } catch (ex) {
            console.log("Problem in class Material-service in method getAllMaterials")
            console.log("error: " + ex);
        }
    }

    //method to update specific material object in material database
    async updateMaterial(newMat, matDatabase) {
        try {
            //update db entry with new material object
            const res = await matDatabase.updateMaterialEntity(newMat);
            console.log("MaterialService return for updateMaterial: " + res);
            return res;
        } catch(ex) {
            console.log("Problem in class Material-service in method getAllMaterials");
            console.log("error: " + ex);
        }
    }
}

module.exports = MaterialService;