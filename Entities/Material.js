class Material {

    //Constructor for new Material, default matNr = null
    constructor(matNr = null, recCycles=null, synthMatType=null, manufacturer=null, size=null, date=null, employee=null) {
        this.matNr = matNr;
        this.recCycles = recCycles;
        this.synthMatType = synthMatType;
        this.manufacturer = manufacturer;
        this.size = size;
        this.date = date;
        this.employee = employee;
    }
}

module.exports = Material;