
fetch('https://localhost:44302/GetAllCitis') // Replace with your server endpoint
    .then(response => response.json())
    .then(data => {
        fillcitySelect(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function fillcitySelect(cities) {
    cities.forEach(city => {
        var child = document.createElement("option",)
        child.textContent = city['name'];
        child.value = city['id'];

        document.getElementById("city-select").appendChild(child)
    });
}



const reqisterbtn = document.getElementById('reqister-btn');

reqisterbtn.addEventListener('submit', (e) => {
    e.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phone = document.getElementById("phone").value;
    var nationalId = document.getElementById("nationalId").value;
    var password = document.getElementById("password").value;
    var cityId = document.getElementById("city-select").value;
    var gender = document.getElementById("gender").value;
    var vehiclePlate = "2345-ن ن ا";
    var vehicleModel = document.getElementById("vehicleModel").value;
    var vehicleColor = document.getElementById("vehicleColor").value;

    // Assuming the file inputs have unique IDs like "personalPhoto", "formImage", etc.
    var personalPhoto
    if (document.getElementById("personalPhoto").files !== null)
        personalPhoto = document.getElementById("personalPhoto").files[0];

    var formImage = document.getElementById("formImage").files[0];
    var drivingLicenseImage = document.getElementById("drivingLicenseImage").files[0];
    var vehicleFrontImage = document.getElementById("VehicleFrontImage").files[0];
    var vehicleBackImage = document.getElementById("VehicleBackImage").files[0];

    // Create FormData object to handle files
    var formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("nationalId", nationalId);
    formData.append("password", password);
    formData.append("cityId", cityId);
    formData.append("gender", gender);
    formData.append("vehiclePlate", vehiclePlate);
    formData.append("vehicleModel", vehicleModel);
    formData.append("vehicleColor", vehicleColor);
    formData.append("personalPhoto", personalPhoto);
    formData.append("formImage", formImage);
    formData.append("drivingLicenseImage", drivingLicenseImage);
    formData.append("vehicleFrontImage", vehicleFrontImage);
    formData.append("vehicleBackImage", vehicleBackImage);



    fetch('https://localhost:44302/AddNewDriver', {
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
        })
        .catch(error => {
            console.error('Error uploading images:', error);
        });
});
