document.addEventListener("DOMContentLoaded", init);

async function init() {
    //get first 10 production orders from database 

    const displayInformation = {
        "amount": 10
    }

    const amount = 10;

    var someOrders = await fetch("http://localhost:8080/scanner/getSomeOrders?amount=" + amount).then((someOrders) => someOrders.json())
    
    console.log(someOrders);

    //create table out of data (source: https://www.tutorialspoint.com/how-to-convert-json-data-to-a-html-table-using-javascript-jquery)
    // Get the container element where the table will be inserted
    let container = document.getElementById("container");
    
    // Create the table element
    let table = document.createElement("table");
    table.setAttribute("name", "tableOrders");
    
    // Get the keys (column names) of the first object in the JSON data
    let cols = Object.keys(someOrders[0]);
    
    // Create the header element
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    
    // Loop through the column names and create header cells
    cols.forEach((item) => {
        let th = document.createElement("th");
        th.setAttribute("name", "tableOrders");
        th.innerText = item; // Set the column name as the text of the header cell
        tr.appendChild(th); // Append the header cell to the header row
    });

    thead.appendChild(tr); // Append the header row to the header
    table.append(tr) // Append the header to the table
    
    // Loop through the JSON data and create table rows
    someOrders.forEach((item) => {
        let tr = document.createElement("tr");
    
        // Get the values of the current object in the JSON data
        let vals = Object.values(item);
    
        // Loop through the values and create table cells
        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.setAttribute("name", "tableOrders");
            if (elem.customer_defaultAddress_name) {
                td.innerText = elem.customer_defaultAddress_name;
            }
            else if(elem.customer_shippingAddress_name) {
                td.innerText = elem.customer_defaultAddress_name;
            }
            else if(elem.customer_billingAddress_name) {
                td.innerText = elem.customer_billingAddress_name
            }
            else {
                td.innerText = elem; // Set the value as the text of the table cell
            }
            tr.appendChild(td); // Append the table cell to the table row
        });
        table.appendChild(tr); // Append the table row to the table
    });
    container.appendChild(table) // Append the table to the container element
}


async function scanButtonFunction() {
    //get id from qr-code
    //var urlCode = await fetch("http://localhost:8080/scanner/scanCode").then((urlCode) => urlCode.json())

    //start python script
    subprocess.run("python", "../Python/qrCodeScanner.py")
    console.log(urlCode);
}