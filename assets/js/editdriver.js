/// on load page 
console.log(JSON.stringify(localStorage))

fetch(`https://localhost:44302/api/Driver/GetDriver?id=${localStorage.getItem("driverid")}`) // Replace with your server endpoint
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

document.getElementById("save-btn").addEventListener("click", function(e) {

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
    if (document.getElementById("personalPhotoFile").files !== null)
        personalPhoto = document.getElementById("personalPhotoFile").files[0];

    var formImage = document.getElementById("formImageFile").files[0];
    console.log(
        formImage

    )
    var drivingLicenseImage = document.getElementById("drivingLicenseImageFile").files[0];
    var vehicleFrontImage = document.getElementById("VehicleFrontImageFile").files[0];
    var vehicleBackImage = document.getElementById("VehicleBackImageFile").files[0];

    // Create FormData object to handle files
    var formData = 
        {
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "nationalId": nationalId,
            "password": password,
            "city": city,
            "gender": gender,
            "vehiclePlate": vehiclePlate,
            "vehicleModel": vehicleModel,
            "vehicleColor": vehicleColor,
            "personalPhoto": personalPhoto,
            "formImage": formImage,
            "drivingLicenseImage": drivingLicenseImage,
            "vehicleFrontImage": vehicleFrontImage,
            "vehicleBackImage": vehicleBackImage
        };
    

        console.log(JSON.stringify( formData));
        
    // Make PUT request
    fetch(`https://localhost:44302/Driver/UpdateDriver?id=${localStorage.getItem("driverid")}`, {
        body:JSON.stringify( formData),
        headers:{
            "Content-Type":"application/josn; charset=UTF-8"
        }
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

});

function showSelectedImage(event, imgid){
    // console.log("changeedfunc")

    
    const fileInput = event.target;
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const previewImage = document.getElementById(imgid);
            previewImage.src = e.target.result;
            document.getElementById(imgid+"btn").dataset.customProperty= e.target.result;
        };  

        reader.readAsDataURL(fileInput.files[0]);
    }
}
// document.getElementById('VehicleBackImageFile').addEventListener('change', function (event) {

//     console.log("changeed")
//     const fileInput = event.target;
    
//     if (fileInput.files && fileInput.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             const previewImage = document.getElementById('VehicleBackImage');
//             previewImage.src = e.target.result;
//         };  

//         reader.readAsDataURL(fileInput.files[0]);
//     }
// });
