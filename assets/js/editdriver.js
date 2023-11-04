/// on load page 

const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {

        const Driver = JSON.parse(xhr.responseText);

        console.log("Drivers");
        console.log(Driver);
        displayDriver(Driver);
        fillcustomProparty(Driver)
    }
}
xhr.open("GET", `https://localhost:7047/GetDriver?id=${localStorage.getItem("driverid")}`, false);
xhr.send();


function fillcustomProparty(driver){
        // fill  custom proparty with images sources
    document.getElementById("personalPhotobtn").dataset.customProperty = `/assets/img/${driver["personalPhoto"]}`;
    document.getElementById("formImagebtn").dataset.customProperty = `/assets/img/${driver["formImage"]}`;
    document.getElementById("drivingLicenseImagebtn").dataset.customProperty = `/assets/img/${driver["drivingLicenseImage"]}`;
}
function displayDriver(driver) {
    document.getElementById("inputFirstName").value = driver["firstName"];
    document.getElementById("inputLastName").value = driver["lastName"];
    document.getElementById("inputPhone").value = driver["phone"];
    document.getElementById("drivingLicenseImage").src = `assets\\img\\${driver["drivingLicenseImage"]}`;
    document.getElementById("formImage").src = `assets\\img\\${driver["formImage"]}`;
    document.getElementById("personalPhoto").src = `assets\\img\\${driver["personalPhoto"]}`;





}

function changeImgSrc(btn) {
    const newSrc = btn.dataset.customProperty;
    document.getElementById("dynamic-img").src = newSrc;
}


function updateDriver(){
    var fname = document.getElementById("inputFirstName").value ;
    var lname = document.getElementById("inputLastName").value ;
    var phone = document.getElementById("inputPhone").value 
    var drivingLicenseImage = document.getElementById("drivingLicenseImage")
    var formImage = document.getElementById("formImage")
    var personalPhoto = document.getElementById("personalPhoto")


    var id= localStorage.getItem("driverid");
    const formData = new FormData();

    formData.append(`formImage`, formImage);
    formData.append(`drivingLicenseImage`, drivingLicenseImage);
    formData.append(`personlPhoto`, personalPhoto);
    formData.append(`phone`, phone);
    formData.append(`lastName`, lname);
    formData.append(`firstName`, fname);


    fetch(`https://localhost:7047/Driver/UpdateDriver?id=${id}`, {
        method: 'PUT',
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


}