const reqisterbtn = document.getElementById('reqister-btn');

reqisterbtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Loop through text inputs and add their values to FormData
    const firstNamevalue = document.getElementById(`firstName`).value;
    formData.append(`firstName`, firstNamevalue);
    const lastNamevalue = document.getElementById(`lastName`).value;
    formData.append(`lastName`, lastNamevalue);

    const phonevalue = document.getElementById(`phone`).value;
    formData.append(`phone`, phonevalue);
    // Loop through image inputs and add selected files to FormData


    const personlPhotofile = document.getElementById(`personlPhoto`).files[0];
    formData.append(`personlPhoto`, personlPhotofile,`${firstNamevalue}${lastNamevalue}personlPhoto.jpg`);


    const drivingLicenseImagefile = document.getElementById(`drivingLicenseImage`).files[0];
    formData.append(`drivingLicenseImage`, drivingLicenseImagefile,`${firstNamevalue}${lastNamevalue}drivingLicenseImage.jpg`);

    const formImagefile = document.getElementById(`formImage`).files[0];
    formData.append(`formImage`, formImagefile,`${firstNamevalue}${lastNamevalue}formImage.jpg`);




    fetch('/https://localhost:7047/AddNewDriver', {
        method: 'POST',
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
