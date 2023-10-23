class MatDatabase{
    constructor (pool) {
        this.db = pool;
    }

    async getMatById(id) {
        const query = {
            //text: 'select * from DB_Material where matnr = $1',
            text: 'insert into db_material(reccycles, synthmattype) values ($1, $2);',
            //values: [id],
            values: ['1', 'test']
        }
        const matData = await this.db.query(query);
        return matData;
    }

    async addNewMaterialDB(material) {
        const query = {
            text: 'insert into db_material(reccycles, synthmattype, employee, manufacturer, size, date) values ($1, $2, $3, $4, $5, $6) returning matnr;',
            values: [material.recCycles, material.synthMatType, material.employee, material.manufacturer, material.size, material.date]
        }
        const res = await this.db.query(query);
        console.log("res: " + JSON.stringify(res.rows));
        return res;
    }

    
}

module.exports = MatDatabase;