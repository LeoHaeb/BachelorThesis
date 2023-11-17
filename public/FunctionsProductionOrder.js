document.addEventListener("DOMContentLoaded", init);

async function init() {
    //get all material from database and save in variable allData
    const allMaterialData = await fetch("http://localhost:8080/Material/getAllMaterial").then(allData => allData.json())

    var selList = document.getElementsByName("materials");

    for (let index=0; index<selList.length; index++) {
        console.log("index: " + index);
        for (i in allMaterialData) {
            var option = document.createElement("option");
            option.text = allMaterialData[i].matNr + ": " + allMaterialData[i].manufacturer + " " + allMaterialData[i].synthMatType;
            selList[index].add(option);
        }
    }
}

//function to insert new product in html site
function insertnewProduct() {
    var tableProd = document.getElementById("tableProducts");
    var newProdName = document.getElementById("inputNameNewProd");
    var row = tableProd.insertRow(1);
    for (let i=0; i<4; i++){
        var cell = row.insertCell(i);
        switch(i) {
            case 0:
                var x = document.createElement("input");
                x.setAttribute("type", "checkbox");
                x.setAttribute("id", "ckeck");
                cell.appendChild(x);
                break;
            case 1:
                cell.innerHTML = newProdName.value;
                break;
            case 2:
                var x = document.createElement("input");
                x.setAttribute("type", "text");
                cell.appendChild(x);
                break;
            case 3:
                var x = document.createElement("select");
                x.setAttribute("name", "materials");
                cell.appendChild(x);
                loadMaterials();
                break;
        }
    }
}

//function to add new products to backend databases for production
async function addProducts() {
    var amount_GB_L =  document.getElementById("amount_GB_L").value;
    var material_GB_L = document.getElementById("selMaterials_GB_L").value;

    var amount_GB_XL =  document.getElementById("amount_GB_XL").value;
    var material_GB_XL = document.getElementById("selMaterials_GB_XL").value;

    var amount_GB_XXL =  document.getElementById("amount_GB_XXL").value;
    var material_GB_XXL = document.getElementById("selMaterials_GB_XXL").value;

    var amount_suitCase =  document.getElementById("amount_suitcase").value;
    var material_suitCase = document.getElementById("selMaterials_suitcase").value;

    const newProducts = {
        "listNewProducts" : [
            {
                "productName": "GB_L",
                "amount": amount_GB_L,
                "matNr": getMatNr(material_GB_L)
            },
            {
                "productName": "GB_XL",
                "amount": amount_GB_XL,
                "matNr": getMatNr(material_GB_XL)
            },
            {
                "productName": "GB_XXL",
                "amount": amount_GB_XXL,
                "matNr": getMatNr(material_GB_XXL)
            },
            {
                "productName": "suitcase",
                "amount": amount_suitCase,
                "matNr": getMatNr(material_suitCase)
            }
        ]
    }

    //post request to backend to add Products to database
    response = await fetch("http://localhost:8080/production/addNewProductsToProduction", {
        method: "POST",
        headers: {
            'Accept': 'application/JSON',
            'Content-Type': 'application/JSON'},
        body: JSON.stringify(newProducts)
    }) 
}

//function to get matNr from selection
function getMatNr(selection) {
    const selectionSplit = selection.split(":");
    return selectionSplit[0];
}