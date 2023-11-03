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
