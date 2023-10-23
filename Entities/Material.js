class Material {

    constructor(recCycles, synthMatType, manufacturer, size, date, employee) {
        this.recCycles = recCycles;
        this.synthMatType = synthMatType;
        this.manufacturer = manufacturer;
        this.size = size;
        this.date = date;
        this.employee = employee;
    }

    changeRecCycles(recCycles) {
        this.recCycles = recCycles;
    }

    changeSynthMatType(synthMatType) {
        this.synthMatType = synthMatType;
    }
}

module.exports = Material;