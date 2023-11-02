async function wareEinf() {
    
    //create JSON Object with all data for database 
    var recCycles = document.getElementById("recCycles").value;
    var synthMatType = document.getElementById("type").value;
    var manufacturer = document.getElementById("manufacturer").value;
    var size = document.getElementById("size").value;
    var date = document.getElementById("date").value;
    var employee = document.getElementById("employee").value;


    const material = {
        "recCycles": recCycles,
        "synthMatType": synthMatType,
        "manufacturer": manufacturer,
        "size": size,
        "date": date,
        "employee": employee
    } 

    //post request to backend for adding new material to material databsase
    response = await fetch("http://localhost:8080/Material/addNewMaterial", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"},
        body: JSON.stringify(material)
    })
   
    //clear all input fields after post request was sent
    var inputs = document.getElementsByName("inputMaterial");
    for (var singleInput of inputs) {
        singleInput.value = '';
    }
}

//switch to new page, where changes to material database can be done
async function changeToMatChange() {
    window.open("http://localhost:8080/Material/changeMaterial");
}