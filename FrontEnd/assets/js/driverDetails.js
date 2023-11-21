/// on load page 



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

        var Select = document.getElementById('inputVehicleModel');
        Select.innerHTML = ``;
        data.forEach(data => {
            var child = document.createElement("option")
            child.textContent = data['year'];
            child.value = data['id'];

            Select.appendChild(child);
        });
    })
    .catch(error => console.error('Error fetching data:', error));



fetch(`https://localhost:44302/api/Driver/${localStorage.getItem("driverid")}`)
    .then(response => response.json())
    .then(data => {
        displayDriver(data);
        fillcustomProparty(data);
    })
    .catch(error => console.error('Error fetching data:', error));








document.addEventListener('DOMContentLoaded', function () {
    var inputFields = document.querySelectorAll('input, select, password, textarea');
    inputFields.forEach(function (input) {
        input.disabled = true;
    });
});


document.getElementById("edit-btn").addEventListener("click", function (event) {
    event.preventDefault();
    event.target.style.display = 'none';
    document.getElementById("save-btn").style.display = 'inline';
    document.getElementById("delete-btn").style.display = 'inline';
    var inputFields = document.querySelectorAll('input, select, password, textarea');
    inputFields.forEach(function (input) {
        input.disabled = false;
    });
})




document.getElementById("delete-btn").addEventListener("click", function (event) {
    event.preventDefault();

    fetch(`https://localhost:44302/api/Driver/${localStorage.getItem("driverid")}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {


            location.href = 'dashboard.html';
        })
        .catch(error => console.error('Error fetching data:', error));


})

document.getElementById("saving-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // var ok = inputvalidation();
    // if(ok === true){

    // }


    var formData = new FormData();

    if (document.getElementById("personalPhotoFile").files.length > 0) {
        formData.append("personalPhoto", document.getElementById("personalPhotoFile").files[0])
    }

    if (document.getElementById("formImageFile").files.length > 0) {
        formData.append("formImage", document.getElementById("formImageFile").files[0])
    }

    if (document.getElementById("drivingLicenseImageFile").files.length > 0) {
        formData.append("drivingLicenseImage", document.getElementById("drivingLicenseImageFile").files[0])
    }

    if (document.getElementById("VehicleFrontImageFile").files.length > 0) {
        formData.append("vehicleFrontImage", document.getElementById("VehicleFrontImageFile").files[0])
    }

    if (document.getElementById("VehicleBackImageFile").files.length > 0) {
        formData.append("vehicleBackImage", document.getElementById("VehicleBackImageFile").files[0])
    }


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

    const genderRadios = document.getElementsByName('isTrusted-radio');

    // Loop through radio buttons to find the selected one
    let isTrusted;
    for (const radio of genderRadios) {
        if (radio.checked) {
            isTrusted = radio.value;
            break;
        }
    }

    console.log(isTrusted);
    if (isTrusted === "true") {
        formData.append("isTrusted", true);
    }
    else
        formData.append("isTrusted", false);







    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("nationalId", NationalId);
    formData.append("gender", Gender);
    formData.append("cityId", CityId);
    formData.append("vehicleModelId", VehicleModel);
    formData.append("vehicleColor", VehicleColor);
    formData.append("vehiclePlateRight", PlateRight);
    formData.append("vehiclePlateMiddle", PlateMiddle);
    formData.append("vehiclePlateLeft", PlateLeft);
    formData.append("vehiclePlateNumber", Platenumber);




    fetch(`https://localhost:44302/api/Driver/${localStorage.getItem("driverid")}`, {
        method: 'PUT',
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            document.getElementById('update-alert').style.display = 'block';

        })
        .catch(error => console.error('Error fetching data:', error));


});












/* statr funcfunction*/
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

    document.getElementById("inputCity").value = driver["cityId"];

    document.getElementById("inputGender").value = driver["gender"];
    document.getElementById("inputPlateRight").value = driver["vehiclePlateRight"];
    document.getElementById("inputPlateMiddle").value = driver["vehiclePlateMiddle"];
    document.getElementById("inputPlateLeft").value = driver["vehiclePlateLeft"];
    document.getElementById("inputPlatenumber").value = driver["vehiclePlateNumber"];

    document.getElementById("inputVehicleModel").value = driver["vehicleModelId"];
    document.getElementById("inputVehicleColor").value = driver["vehicleColor"];


    document.getElementById("drivingLicenseImage").src = `data:image/jpeg;base64,${driver.drivingLicenseImage}`;
    document.getElementById("formImage").src = `data:image/jpeg;base64,${driver.formImage}`;
    document.getElementById("personalPhoto").src = `data:image/jpeg;base64,  ${driver.personalPhoto}`;

    document.getElementById("VehicleFrontImage").src = `data:image/jpeg;base64,  ${driver.vehicleFrontImage}`;
    document.getElementById("VehicleBackImage").src = `data:image/jpeg;base64,  ${driver.vehicleBackImage}`;

    if (driver['isTrusted'])
        document.getElementById('trusted-chechbox').checked = true;
    else
        document.getElementById('not-trusted-chechbox').checked = true;

}




/// function used in HTML Tags

function changeImgSrc(btn) {
    const newSrc = btn.dataset.customProperty;
    document.getElementById("dynamic-img").src = newSrc;
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

/* end funcfunction*/
