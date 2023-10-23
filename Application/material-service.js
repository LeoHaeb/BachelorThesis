class MaterialService {
    constructor (matDatabase) {
        this.matDatabase = matDatabase;
    }

    async getMaterialInfo(id) {
        try {
            const material = await this.matDatabase.getMatById(id);
            return material;
        }
        catch(ex) {
            console.log("No Material found with ID = " + id);
        }
    }

    async addNewMaterial(mat) {
        try{
            const res = await this.matDatabase.addNewMaterialDB(mat);
            return res;
        } catch(ex){
            console.log("Adding new Material failed !\n");
        }
    }
}

module.exports = MaterialService;