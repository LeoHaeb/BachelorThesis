class MaterialService {
    //constructor for service-object
    //database is attribute of this object
    constructor (matDatabase) {
        this.matDatabase = matDatabase;
    }

    //method to get material from database for specific matNr = id
    async getMaterialInfo(id) {
        try {
            const material = await this.matDatabase.getMatById(id);
            return material;
        }
        catch(ex) {
            console.log("No Material found with ID = " + id);
        }
    }

    //method for adding new material object to material database
    async addNewMaterial(mat) {
        try{
            const res = await this.matDatabase.addNewMaterialDB(mat);
            return res;
        } catch(ex){
            console.log("Adding new Material failed !\n");
        }
    }

    //method to get all materials from material database
    async getAllMaterials() {
        try {
            const res = await this.matDatabase.getAllMaterialsDB();
            return res;
        } catch (ex) {
            console.log("Getting all Materials failed !\n")
        }
    }

    //method to update specific material object in material database
    async updateMaterial(newMat) {
        try {
            const res = await this.matDatabase.updateMaterialDB(newMat);
            return res;
        } catch(ex) {
            console.log("updating material with matNr = " + newMat.matNr + " failed");
        }
    }
}

module.exports = MaterialService;