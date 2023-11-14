document.getElementById("third-form").style.display= 'none';

fetch('https://localhost:44302/api/City', {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        fillSelectOptions(data, "inputCity");
    })
    .catch(error => console.error('Error fetching data:', error));




fetch('https://localhost:44302/api/VehicleModel', {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        fillSelectOptions(data, "inputVehicleModel");
    })
    .catch(error => console.error('Error fetching data:', error));


fetch('https://localhost:44302/api/VehicleColor', {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        fillSelectOptions(data, "inputVehicleColor");
    })
    .catch(error => console.error('Error fetching data:', error));




document.getElementById("saving-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // var ok = inputvalidation();
    // if(ok === true){

    // }

    const personalphotofile = document.getElementById("personalPhotoFile").files[0];
    const formImageFile = document.getElementById("formImageFile").files[0];
    const drivingLicenseImageFile = document.getElementById("drivingLicenseImageFile").files[0];
    const firstName = document.getElementById("inputFirstName").value;
    const lastName = document.getElementById("inputLastName").value;
    const phone = document.getElementById('inputPhone').value;
    const password = document.getElementById("inputPassword").value;
    const NationalId = document.getElementById("inputNationalId").value;
    const CityId = document.getElementById("inputCity").value;
    const Gender = document.getElementById("inputGender").value;
    const PlateRight = document.getElementById("inputPlateRight").value;
    const PlateMiddle = document.getElementById("inputPlateMiddle").value;
    const PlateLeft = document.getElementById("inputPlateLeft").value;
    const Platenumber = document.getElementById("inputPlatenumber").value;
    const VehicleModel = document.getElementById("inputVehicleModel").value;
    const VehicleColor = document.getElementById("inputVehicleColor").value;
    const VehicleFrontImage = document.getElementById("VehicleFrontImageFile").files[0];
    const VehicleBackImage = document.getElementById("VehicleBackImageFile").files[0];

    console.log(PlateRight,PlateMiddle,PlateLeft)
    console.log(Platenumber)

    console.log(Gender)
    
    // console.log(CityId);
    var formData = new FormData();


    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("phone", phone)
    formData.append("personalPhoto", personalphotofile)
    formData.append("drivingLicenseImage", drivingLicenseImageFile)
    formData.append("formImage", formImageFile)
    formData.append("password", password)
    formData.append("nationalId", NationalId)
    formData.append("gender", Gender)
    formData.append("cityId", CityId)
    formData.append("vehicleModelId", VehicleModel)
    formData.append("vehicleColorId", VehicleColor)
    formData.append("vehiclePlateRight", PlateRight)
    formData.append("vehiclePlateMiddle", PlateMiddle)
    formData.append("vehiclePlateLeft", PlateLeft)
    formData.append("vehiclePlateNumber", Platenumber)
    formData.append("vehicleFrontImage", VehicleFrontImage)
    formData.append("vehicleBackImage", VehicleBackImage)


    fetch('https://localhost:44302/api/Driver', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
        })
        .catch(error => console.error('Error fetching data:', error));

});




// functions start

function fillSelectOptions(data, id) {

    var Select = document.getElementById(id);
    Select.innerHTML = ``;
    data.forEach(data => {
        var child = document.createElement("option")
        child.textContent = data['name'];
        child.value = data['id'];

        Select.appendChild(child);
    });
}

function inputvalidation() {
    const personalphotofile = document.getElementById("personalPhotoFile");
    if (personalphotofile.files.length === 0) {
        // show to end user somthing

        return false;
    }

    const firstName = document.getElementById("inputFirstName").value;
    if (firstName.length === 0) {
        // show to end user somthing

        return false;
    }

    const lastName = document.getElementById("inputLastName").value;
    if (lastName.length === 0) {
        // show to end user somthing

        return false;
    }

    //refrance: https://gist.github.com/homaily/8672499
    const phoneRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

    const phone = document.getElementById('inputPhone').value;
    if (!phoneRegex.test(phone)) {
        // show to end user somthing

        return false;
    }


    // This regular expression enforces the following criteria for a password:
    // At least one lowercase letter.
    // At least one uppercase letter.
    // At least one digit.
    // Minimum length of 8 characters.

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const password = document.getElementById("inputPassword").value;

    if (!passwordRegex.test(password)) {
        // show to end user somthing


        return false;
    }





    return true;

}





// functions use it in html tags
function activate() {
    document.getElementById("a-driver-data").classList.toggle("active")
    document.getElementById("a-reg-data").classList.toggle("active")
}



function showSelectedImage(event, imgid) {
    // console.log("changeedfunc")


    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const previewImage = document.getElementById(imgid);
            previewImage.src = e.target.result;
            document.getElementById(imgid + "btn").dataset.customProperty = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
// functions end