/// on load page 

fetch(`https://localhost:7047/GetDriver?id=${localStorage.getItem("driverid")}`) // Replace with your server endpoint
.then(response => response.json())
.then(data => {
    displayDriver(data);
    
})
.catch(error => console.error('Error fetching data:', error));

fillcustomProparty(driver);

function fillcustomProparty(driver){
        // fill  custom proparty with images sources
    document.getElementById("personalPhotobtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.personalPhoto}`;
    document.getElementById("formImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.formImage}`;
    document.getElementById("drivingLicenseImagebtn").dataset.customProperty = `data:image/jpeg;base64, ${driver.drivingLicenseImage}`;
}
function displayDriver(driver) {
    document.getElementById("inputFirstName").value = driver["firstName"];
    document.getElementById("inputLastName").value = driver["lastName"];
    document.getElementById("inputPhone").value = driver["phone"];
    document.getElementById("drivingLicenseImage").src = `data:image/jpeg;base64,${driver.drivingLicenseImage}`;
    document.getElementById("formImage").src = `data:image/jpeg;base64,${driver.formImage}`;
    document.getElementById("personalPhoto").src = `data:image/jpeg;base64,  ${driver.personalPhoto}`;

}

function changeImgSrc(btn) {
    const newSrc = btn.dataset.customProperty;
    document.getElementById("dynamic-img").src = newSrc;
}


function updateDriver(){
    // var fname = document.getElementById("inputFirstName").value ;
    // var lname = document.getElementById("inputLastName").value ;
    // var phone = document.getElementById("inputPhone").value 
    // var drivingLicenseImage = document.getElementById("drivingLicenseImage")
    // var formImage = document.getElementById("formImage")
    // var personalPhoto = document.getElementById("personalPhoto")


    // var id= localStorage.getItem("driverid");
    // const formData = new FormData();

    // formData.append(`formImage`, formImage);
    // formData.append(`drivingLicenseImage`, drivingLicenseImage);
    // formData.append(`personlPhoto`, personalPhoto);
    // formData.append(`phone`, phone);
    // formData.append(`lastName`, lname);
    // formData.append(`firstName`, fname);

    var formElements = document.querySelector(".saving-form");
    var data = new formData(formElements);


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