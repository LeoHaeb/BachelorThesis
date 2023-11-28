document.addEventListener("DOMContentLoaded", init);

async function init() {
    //empty all inboxes
    var inputBoxes = document.getElementsByName("inputProductionFail");

    inputBoxes.forEach(element => {
        element.value = "";
    })
}

async function noteProductionFail(productionStep) {

    //read in input boxes
    switch(productionStep) {
        case 1:
            amountFailedPurse_L = document.getElementById("amount_GB_L_cutting").value;
            amountFailedPurse_XL = document.getElementById("amount_GB_XL_cutting").value;
            amountFailedPurse_XXL = document.getElementById("amount_GB_XXL_cutting").value;
            amountFailedSuitCase = document.getElementById("amount_suitcase_cutting").value;
            break;
        case 2:
            amountFailedPurse_L = document.getElementById("amount_GB_L_welding").value;
            amountFailedPurse_XL = document.getElementById("amount_GB_XL_welding").value;
            amountFailedPurse_XXL = document.getElementById("amount_GB_XXL_welding").value;
            amountFailedSuitCase = document.getElementById("amount_suitcase_welding").value;
            break;
        case 3:
            amountFailedPurse_L = document.getElementById("amount_GB_L_LaserCutting").value;
            amountFailedPurse_XL = document.getElementById("amount_GB_XL_LaserCutting").value;
            amountFailedPurse_XXL = document.getElementById("amount_GB_XXL_LaserCutting").value;
            amountFailedSuitCase = document.getElementById("amount_suitcase_LaserCutting").value;
    }

    //create JSON Object for POST Request
    const updateinformation = {
        "productionStep": productionStep,
        "amountFailedPurse_L": amountFailedPurse_L,
        "amountFailedPurse_XL": amountFailedPurse_XL,
        "amountFailedPurse_XXL": amountFailedPurse_XXL,
        "amountFailedSuitCase": amountFailedSuitCase
    }

    //update production db with failed products
    const response = await fetch("http://localhost:8080/productionFails/updateFailedProducts/", {
        method: "POST",
        headers: {
            'Accept': 'application/JSON',
            'Content-Type': 'application/JSON'},
        body: JSON.stringify(updateinformation)
    });
}