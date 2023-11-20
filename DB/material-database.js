class MatDatabase{
    constructor(db) {
        this.pool = db.pool;
    }
     

    //sql statement to get material with specific matNr from db_material
    async getMaterialEntitywithID(id) {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from DB_Material where matnr = $1',
            values: [id],
        }
        const matData = await client.query(query);
        client.release();
        console.log("Material-database return for getMaterialEntitywithID(" + id + "): " + JSON.stringify(matData.rows));
        return matData;
    }


    //sql statement to get all materials from db_material
    async getAllMaterialsEntities() {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from DB_Material',
        }
        const matData = await client.query(query);
        client.release();
        console.log("Material-database return for getAllMaterialsEntities : " + JSON.stringify(matData.rows));
        return matData;
    }

    //sql statement to add new material to db_material
    async addNewMaterialEntity(material) {
        const client = await this.pool.connect();
        const query = {
            text: 'insert into db_material(reccycles, synthmattype, employee, manufacturer, size, date) values ($1, $2, $3, $4, $5, $6) returning matnr;',
            values: [material.recCycles, material.synthMatType, material.employee, material.manufacturer, material.size, material.date]
        }
        const res = await client.query(query);
        client.release();
        console.log("Material-database return for addNewMAterialEntity : " + JSON.stringify(res.rows));
        return res;
    }

    //Function to update material database
    async updateMaterialEntity(newMaterial) {
        //variable for counting number of arguments to pass to query $1, $2, ...
        var queryArgNr = 1;

        //array to store relevant attributes to update
        var arrayUpdateMatAttr = [];
        //array to store values for relevant attributes to update
        var arrayUpdateMatAttrVal = [];

        //loop to create arrays, every item is part of a sql query "attr = $x"
        Object.keys(newMaterial).forEach(matAttr => {
            if (newMaterial[matAttr] && matAttr != "matNr") {
                let updateMatAttrString = matAttr + " = $" + String(queryArgNr);
                arrayUpdateMatAttr.push(updateMatAttrString);
                arrayUpdateMatAttrVal.push(newMaterial[matAttr]);
                queryArgNr += 1;
            } 
        });
        
        //add attribute matNr to array, this is ID of the database table
        arrayUpdateMatAttrVal.push(newMaterial["matNr"]);

        //sql update statement
        const client = await this.pool.connect();
        const query = {
            text: 'update db_material set ' + arrayUpdateMatAttr.toString() + ' where matNr = $' + String(queryArgNr),
            values: arrayUpdateMatAttrVal
        }
        const res = await client.query(query);
        client.release();
        console.log("Material-database return for updateMaterialEntity : " + JSON.stringify(res.rows));
        return res;
    }
}

module.exports = MatDatabase;