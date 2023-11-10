/// on load page 
console.log(JSON.stringify(localStorage))

fetch(`https://localhost:44302/GetDriver?id=${localStorage.getItem("driverid")}`) // Replace with your server endpoint
    .then(response => response.json())
    .then(data => {
        displayDriver(data);

        fillcustomProparty(data);
    })
    .catch(error => console.error('Error fetching data:', error));


function fillcustomProparty(driver) {
    // fill  custom proparty with images sources
    document.getElementById("personalPhotobtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.personalPhoto}`;
    document.getElementById("formImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.formImage}`;
    document.getElementById("drivingLicenseImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.drivingLicenseImage}`;
    document.getElementById("VehicleBackImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.vehicleBackImage}`;
    document.getElementById("VehicleFrontImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.vehicleFrontImage}`;
}

function displayDriver(driver) {
    console.log(driver)
    document.getElementById("inputFirstName").value = driver["firstName"];
    document.getElementById("inputLastName").value = driver["lastName"];
    document.getElementById("inputPhone").value = driver["phone"];
    document.getElementById("inputNationalId").value = driver["nationalId"];
    document.getElementById("inputPassword").value = driver["password"];
    document.getElementById("inputCity").value = driver["city"].name;
    document.getElementById("inputGender").value = driver["gender"] ? "ذكر" : "أنثي";
    document.getElementById("inputVehiclePlate").value = driver["vehiclePlate"];
    document.getElementById("inputVehicleModel").value = driver["vehicleModel"];
    document.getElementById("inputVehicleColor").value = driver["vehicleColor"];


    document.getElementById("drivingLicenseImage").src = `data:image/jpeg;base64,${driver.drivingLicenseImage}`;
    document.getElementById("formImage").src = `data:image/jpeg;base64,${driver.formImage}`;
    document.getElementById("personalPhoto").src = `data:image/jpeg;base64,  ${driver.personalPhoto}`;

    document.getElementById("VehicleFrontImage").src = `data:image/jpeg;base64,  ${driver.vehicleFrontImage}`;
    document.getElementById("VehicleBackImage").src = `data:image/jpeg;base64,  ${driver.vehicleBackImage}`;

}

function changeImgSrc(btn) {
    const newSrc = btn.dataset.customProperty;
    document.getElementById("dynamic-img").src = newSrc;
}

document.getElementById("save-btn").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    
    // Gather form data
    var firstName = document.getElementById("inputFirstName").value;
    var lastName = document.getElementById("inputLastName").value;
    var phone = document.getElementById("inputPhone").value;
    var nationalId = document.getElementById("inputNationalId").value;
    var password = document.getElementById("inputPassword").value;
    var city = document.getElementById("inputCity").value;
    var gender = document.getElementById("inputGender").value;
    var vehiclePlate = document.getElementById("inputVehiclePlate").value;
    var vehicleModel = document.getElementById("inputVehicleModel").value;
    var vehicleColor = document.getElementById("inputVehicleColor").value;

    // Assuming the file inputs have unique IDs like "personalPhoto", "formImage", etc.
    var personalPhoto
    if(document.getElementById("personalPhotoFile").files !==null)
    personalPhoto =  document.getElementById("personalPhotoFile").files[0];

var formImage = document.getElementById("formImageFile").files[0];
    var drivingLicenseImage = document.getElementById("drivingLicenseImageFile").files[0];
    var vehicleFrontImage = document.getElementById("VehicleFrontImageFile").files[0];
    var vehicleBackImage = document.getElementById("VehicleBackImageFile").files[0];
    
    // Create FormData object to handle files
    var formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("nationalId", nationalId);
    formData.append("password", password);
    formData.append("city", city);
    formData.append("gender", gender);
    formData.append("vehiclePlate", vehiclePlate);
    formData.append("vehicleModel", vehicleModel);
    formData.append("vehicleColor", vehicleColor);
    formData.append("personalPhoto", personalPhoto);
    formData.append("formImage", formImage);
    formData.append("drivingLicenseImage", drivingLicenseImage);
    formData.append("vehicleFrontImage", vehicleFrontImage);
    formData.append("vehicleBackImage", vehicleBackImage);
    console.log(formData.vehicleColor)
    // Make PUT request
    fetch(`https://localhost:44302/UpdateDriver?id=${localStorage.getItem("driverid")}`, {
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Assuming the server sends back JSON data
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    })
    .then(data => {
        // Handle the response data
        console.log('Driver updated:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error updating driver:', error);
    });

})

// function updateDriver(){
//     // var fname = document.getElementById("inputFirstName").value ;
//     // var lname = document.getElementById("inputLastName").value ;
//     // var phone = document.getElementById("inputPhone").value
//     // var drivingLicenseImage = document.getElementById("drivingLicenseImage")
//     // var formImage = document.getElementById("formImage")
//     // var personalPhoto = document.getElementById("personalPhoto")


//     // var id= localStorage.getItem("driverid");
//     // const formData = new FormData();

//     // formData.append(`formImage`, formImage);
//     // formData.append(`drivingLicenseImage`, drivingLicenseImage);
//     // formData.append(`personlPhoto`, personalPhoto);
//     // formData.append(`phone`, phone);
//     // formData.append(`lastName`, lname);
//     // formData.append(`firstName`, fname);

//     var formElements = document.querySelector(".saving-form");
//     var data = new formData(formElements);


//     fetch(`https://localhost:7047/Driver/UpdateDriver?id=${id}`, {
//         method: 'PUT',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Handle the response from the server
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error uploading images:', error);
//         });


// }