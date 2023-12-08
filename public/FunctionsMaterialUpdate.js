document.addEventListener("DOMContentLoaded", init);

async function init() {
    //get all material from database and save in variable allData
    res = await fetch("http://localhost:8080/Material/getAllMaterial").then(allData => allData.json())
    let allData = res.rows;
             
    //create table out of data (source: https://www.tutorialspoint.com/how-to-convert-json-data-to-a-html-table-using-javascript-jquery)
         // Get the container element where the table will be inserted
         let container = document.getElementById("container");
         
         // Create the table element
         let table = document.createElement("table");
         table.setAttribute("name", "tableMaterials");
         
         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(allData[0]);
         
         // Create the header element
         let thead = document.createElement("thead");
         let tr = document.createElement("tr");
         
         // Loop through the column names and create header cells
         cols.forEach((item) => {
            let th = document.createElement("th");
            th.setAttribute("name", "tableMaterials");
            th.innerText = item; // Set the column name as the text of the header cell
            tr.appendChild(th); // Append the header cell to the header row
         });
         thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         allData.forEach((item) => {
            let tr = document.createElement("tr");
            
            // Get the values of the current object in the JSON data
            let vals = Object.values(item);
            
            // Loop through the values and create table cells
            vals.forEach((elem) => {
               let td = document.createElement("td");
               td.setAttribute("name", "tableMaterials");
               td.innerText = elem; // Set the value as the text of the table cell
               tr.appendChild(td); // Append the table cell to the table row
            });
            table.appendChild(tr); // Append the table row to the table
         });
         container.appendChild(table) // Append the table to the container element

}

//function to update material database
async function changeMat() {

    //create json object with data for material 
    var matNr = document.getElementById("matNr").value;
    var recCycles = document.getElementById("recCycles").value;
    var synthMatType = document.getElementById("type").value;
    var manufacturer = document.getElementById("manufacturer").value;
    var size = document.getElementById("size").value;
    var date = document.getElementById("date").value;
    var employee = document.getElementById("employee").value;

    const upDateMaterial = {
        "matNr": matNr,
        "recCycles": recCycles,
        "synthMatType": synthMatType,
        "manufacturer": manufacturer,
        "size": size,
        "date": date,
        "employee": employee
    } 

    //send POST request for updating material database
    response = await fetch("http://localhost:8080/Material/updateMaterial/" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"},
        body: JSON.stringify(upDateMaterial)
    })

    //clear all input fields
    var inputs = document.getElementsByName("inputMaterial");
    for (var singleInput of inputs) {
        singleInput.value = '';
    }
}
