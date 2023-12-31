async function registerCustomer() {
    
    //create JSON Object with all data for database 
    var customerName = document.getElementById("custName").value;
    var custAdrStreet = document.getElementById("custAdrStreet").value;
    var custAdrNr = document.getElementById("custAdrNr").value;
    var custAdrPlace = document.getElementById("custAdrPlace").value;
    var custPostCode = document.getElementById("custPostCode").value;
    var custMailAdr = document.getElementById("custMailAdr").value;
    var custPassword = document.getElementById("custPassword").value;
    var custPasswordConf = document.getElementById("custPasswordConf").value;

    if (custPassword != custPasswordConf) {
        alert("password confirmation does not fit");
    }
    else {
        var persImage = document.getElementById("persImage");
    
        var persImageFile = persImage.files[0];

        //upload Umage to server
        const formData = new FormData();
        formData.append("name", persImageFile.name);
        formData.append("customerName", customerName);
        formData.append("customerImage", persImageFile, persImageFile.name);

        //first upload image to server
        let response = await fetch("http://localhost:8080/customer/uploadImage", {
            method: "POST",
            body: formData
        }).then(response => response.json());
        
        console.log(response);

        const pathToImage = response.directory + "/" + response.filename;
        
        const customer = {
            "customerName": customerName,
            "custAdrStreet": custAdrStreet,
            "custAdrNr": custAdrNr,
            "custAdrPlace": custAdrPlace,
            "custPostCode": custPostCode,
            "custMailAdr": custMailAdr,
            "custPassword": custPassword,
            "persImage": {"path": pathToImage},
        } 

        let res = await fetch("http://localhost:8080/customer/addNewCustomer", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(res => res.json());
        console.log("cust_nr for added customer: " + res);
    }
}

//switch to new page, where changes to material database can be done
async function changeToMatChange() {
    window.open("http://localhost:8080/Material/changeMaterial");
}