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

/*         setMatNr: (matNr) => this.matNr = matNr;
        setRecCycles: (recCycles) => this.recCycles = recCycles;
        setSynthMatType: (synthMatType) => this.synthMatType = synthMatType;
        setManufacturer: (manufacturer) => this.manufacturer = manufacturer;
        setSize: (size) => this.size = size;
        setDate: (date) => this.date = date;
        setEmployee: (employee) => this.employee = employee; */
    }

    setMatNr(id) {
        this.matNr = id;
    }

    stringifyMaterial(){
        const returnString = "Material: " + "matNr: " + this.matNr.toString() + ", "
        + "recCycles: " + this.recCycles.toString() + ", "
        + "synthMatType" + this.synthMatType.toString() + ", "
        + "manufacturer" + this.manufacturer.toString() + ", "
        + "size" + this.size.toString() + ", "
        + "date" + this.date.toString() + ", "
        + "employee" + this.employee.toString();

        return returnString;
    }
}

module.exports = Material;