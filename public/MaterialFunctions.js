async function wareEinf() {
    
    //JSON Objekt erstellen mit allen infos für Datenbank
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

    response = await fetch("http://localhost:8080/Material/addNewMaterial", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"},
        body: JSON.stringify(material)
    })
   
    var inputs = document.getElementsByName("inputMaterial");
    for (var singleInput of inputs) {
        singleInput.value = '';
    }
}