

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    //   apiKey: "AIzaSyC3MIN64hy_oTQfQWUHl0lID-CJkIfci0M",
    //   authDomain: "yt-project-a29f8.firebaseapp.com",
    //   projectId: "yt-project-a29f8",
    //   storageBucket: "yt-project-a29f8.appspot.com",
    //   messagingSenderId: "159898773748",
    //   appId: "1:159898773748:web:2985334de4f06ff73356a1",
    //   measurementId: "G-DLWR9M5SJC"

    apiKey: "AIzaSyDNiidcWIPliAOnROdZr5X1o_lWTTcD4C0",
    authDomain: "road-go-test.firebaseapp.com",
    projectId: "road-go-test",
    storageBucket: "road-go-test.appspot.com",
    messagingSenderId: "115144488342",
    appId: "1:115144488342:web:77d0d0891a88afd33399b7",
    measurementId: "G-N1F6SF2P2L"
};
firebase.initializeApp(firebaseConfig);


render();
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
// function for send message
function phoneAuth(phoneNumber) {

    console.log(phoneNumber);
    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier).then(function (confirmationResult) {

        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        console.log('ok');

    }).catch(function (error) {
        console.log('not ok');

        alert(error.message);
    });
}

// function for code verify
function codeverify(code) {

    coderesult.confirm(code).then(function () {
        var formData = new FormData();
        formData.append('isTrusted', true);

        fetch(`https://localhost:44302/api/Driver/${localStorage.getItem('driverRegId')}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data['isTrusted']);
            })
            .catch(error => console.error('Error fetching data:', error));

        // location.href = 'index.html';
    }).catch(function () {
        alert("wrong code");
    })

}
/*******end OTP CODE******/

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
        console.log(data)
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


    console.log(    phoneAuth("+966"+'560681889'));

var x = 1;
console.log(x++);
document.getElementById("saving-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var ok = true;
    // ok= validateForm();
    ok &= validateFirstName();
    console.log(ok)
    ok &= validateLastName();
    console.log(ok)
    ok &= validatePassword();
    console.log(ok)
    ok &= validatePhone();
    console.log(ok)
    ok &= validateNationalId();
    console.log(ok)
    ok &= validatePlateNumber();
    console.log(ok)
    ok &= validateVehicleColor();
    console.log(ok)
    ok &= validateDrivingLicenseImage();
    console.log(ok)
    ok &= validateFormImage();
    console.log(ok)
    ok &= validateVehicleBackImage();
    console.log(ok)
    ok &= validateVehicleFrontImage();
    console.log(ok)
    ok &= validatePersonalPhoto();
    console.log(ok)

    if (!ok) return ok;


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

    console.log(PlateRight, PlateMiddle, PlateLeft)
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
    formData.append("vehicleColor", VehicleColor)
    formData.append("vehiclePlateRight", PlateRight)
    formData.append("vehiclePlateMiddle", PlateMiddle)
    formData.append("vehiclePlateLeft", PlateLeft)
    formData.append("vehiclePlateNumber", Platenumber)
    formData.append("vehicleFrontImage", VehicleFrontImage)
    formData.append("vehicleBackImage", VehicleBackImage)
    formData.append("isTrusted", false);


    fetch('https://localhost:44302/api/Driver', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('driverRegId', data['id']); 

            localStorage.setItem(`driverphone`, data['phone']);
            return true;

        })
        .catch(error => {
            alert('Error fetching data:', error);
            return false;
        })


    setTimeout(() => {
        location.href = 'OTPValidation.html';
    }, 500);

    return true;
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


function validateFirstName() {
    const firstNameInput = document.getElementById('inputFirstName');
    const firstNameLabel = document.getElementById('firstNameValidation');

    if (firstNameInput.value.trim() === '') {
        firstNameLabel.innerText = 'الإسم الأول مطلوب';
        firstNameInput.focus();
        return false;
    } else if (!hasArabicLetters(firstNameInput.value.trim())) {
        firstNameLabel.innerText = 'يجب أن يكون الاسم المركبة باللغة العربية';
        firstNameInput.focus();
        return false;
    } else {
        console.log(x++);
        firstNameLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validateLastName() {
    const lastNameInput = document.getElementById('inputLastName');
    const lastNameLabel = document.getElementById('lastNameValidation');

    if (lastNameInput.value.trim() === '') {
        lastNameLabel.innerText = 'اسم العائلة مطلوب';
        lastNameInput.focus();

        return false;
    } else if (!hasArabicLetters(lastNameInput.value.trim())) {
        lastNameLabel.innerText = 'يجب أن يكون الاسم المركبة باللغة العربية';
        lastNameInput.focus();
        return false;
    } else {
        console.log(x++);
        lastNameLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validatePhone() {
    const phoneInput = document.getElementById('inputPhone');
    const phoneLabel = document.getElementById('phoneValidation');
    const phoneRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

    if (phoneInput.value.trim() === '') {
        phoneInput.focus();
        phoneLabel.innerText = 'رقم الجوال مطلوب';
        return false;
    }
    // } else if (!phoneRegex.test(phoneInput.value.trim())) {
        // phoneInput.focus();

    //     phoneLabel.innerText = 'يجب ان يكون رقم سعودي';
    //     return false;
    // } 
    else {
        console.log(x++);
        phoneLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validateNationalId() {
    const nationalIdInput = document.getElementById('inputNationalId');
    const nationalIdLabel = document.getElementById('nationalIdValidation');

    if (nationalIdInput.value.trim() === '') {
        nationalIdLabel.innerText = 'رقم الهوية مطلوب';
        return false;
    } else if (nationalIdInput.value.trim().length !== 14) {
        nationalIdLabel.innerText = 'رقم الهوية يجب أن يكون 14 رقم';
        return false;
    } else {
        console.log(x++);
        nationalIdLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('inputPassword');
    const passwordLabel = document.getElementById('passwordValidation');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordInput.value.trim() === '') {
        passwordLabel.innerText = 'كلمة المرور مطلوبة';
        return false;
    } else if (!passwordRegex.test(passwordInput.value.trim())) {
        passwordLabel.innerText = 'كلمة المرور غير صالحة';
        return false;
    } else {
        console.log(x++);
        passwordLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validateVehicleColor() {
    const vehicleColorInput = document.getElementById('inputVehicleColor');
    const vehicleColorLabel = document.getElementById('vehicleColorValidation');
    if (vehicleColorInput.value.trim() === '') {
        vehicleColorLabel.innerText = 'لون المركبة مطلوب';
        return false;
    } else if (!hasArabicLetters(vehicleColorInput.value.trim())) {
        vehicleColorLabel.innerText = 'يجب أن يكون لون المركبة باللغة العربية';
        return false;
    } else {
        console.log(x++);
        vehicleColorLabel.innerText = ''; // Clear the validation message
        return true;
    }
}

function validatePlateNumber() {
    const plateNumberInput = document.getElementById('inputPlatenumber');
    const plateNumberLabel = document.getElementById('plateNumberValidation');
    const plateNumberRegex = /^[0-9]{3}$/;


    if (plateNumberInput.value.trim() === '') {
        plateNumberLabel.innerText = 'رقم اللوحة مطلوب';
        return false;
    } else if (!plateNumberRegex.test(plateNumberInput.value.trim())) {
        plateNumberLabel.innerText = 'رقم اللوحة يجب أن يتكون من 3 أرقام';
        return false;
    } else {
        console.log(x++);
        plateNumberLabel.innerText = ''; // Clear the validation message
        console.log(x++);

        return true;
    }
}
function hasArabicLetters(input) {
    // Arabic Unicode range for letters
    const arabicRegex = /[\u0600-\u06FF]/;

    return arabicRegex.test(input);
}


// ...
function validateImageFile(fileInput, maxFileSizeInBytes, labelElement, errorMessage) {
    const file = fileInput.files[0];

    if (!file) {
        labelElement.innerText = errorMessage || 'الصورة مطلوبة';
        return false;
    }

    if (file.size > maxFileSizeInBytes) {
        labelElement.innerText = errorMessage || 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت';
        return false;
    }

    console.log(x++);
    labelElement.innerText = ''; // Clear the validation message
    return true;
}
const genralErrorMessage = 'يرجى تحميل صورة بحجم أقل من 5 ميجابايت';
const maxFileSize = 5 * 1024 * 1024;
function validatePersonalPhoto() {

    // Example for Personal Photo
    const personalPhotoInput = document.getElementById('personalPhotoFile');
    const personalPhotoLabel = document.getElementById('personalPhotoValidation');

    return validateImageFile(personalPhotoInput, maxFileSize, personalPhotoLabel, genralErrorMessage);
}
function validateFormImage() {

    // Example for Personal Photo
    const formImageInput = document.getElementById('formImageFile');
    const formImageLabel = document.getElementById('formImageValidation');

    return validateImageFile(formImageInput, maxFileSize, formImageLabel, genralErrorMessage);

}
function validateDrivingLicenseImage() {


    // Example for Driving License Image
    const drivingLicenseImageInput = document.getElementById('drivingLicenseImageFile');
    const drivingLicenseImageLabel = document.getElementById('drivingLicenseImageValidation');



    return validateImageFile(drivingLicenseImageInput, maxFileSize, drivingLicenseImageLabel, genralErrorMessage);
}

function validateVehicleFrontImage() {

    // Repeat this pattern for other image file inputs
    // Example for Vehicle Front Image
    const vehicleFrontImageInput = document.getElementById('VehicleFrontImageFile');
    const vehicleFrontImageLabel = document.getElementById('VehicleFrontImageValidation');

    return  validateImageFile(vehicleFrontImageInput, maxFileSize, vehicleFrontImageLabel, genralErrorMessage);
}
function validateVehicleBackImage() {

    // Example for Vehicle Back Image
    const vehicleBackImageInput = document.getElementById('VehicleBackImageFile');
    const vehicleBackImageLabel = document.getElementById('VehicleBackImageValidation');


    return validateImageFile(vehicleBackImageInput, maxFileSize, vehicleBackImageLabel, genralErrorMessage);
}







function validateForm() {
    // Personal Information Section
    var firstName = document.getElementById('inputFirstName').value;
    var lastName = document.getElementById('inputLastName').value;
    var phone = document.getElementById('inputPhone').value;
    var city = document.getElementById('inputCity').value;
    var password = document.getElementById('inputPassword').value;
    var gender = document.getElementById('inputGender').value;
    var nationalId = document.getElementById('inputNationalId').value;

    // Vehicle Information Section
    var plateRight = document.getElementById('inputPlateRight').value;
    var plateMiddle = document.getElementById('inputPlateMiddle').value;
    var plateLeft = document.getElementById('inputPlateLeft').value;
    var plateNumber = document.getElementById('inputPlatenumber').value;
    var vehicleModel = document.getElementById('inputVehicleModel').value;
    var vehicleColor = document.getElementById('inputVehicleColor').value;

    // Images
    var personalPhoto = document.getElementById('personalPhotoFile').files[0];
    var formImage = document.getElementById('formImageFile').files[0];
    var drivingLicenseImage = document.getElementById('drivingLicenseImageFile').files[0];
    var vehicleFrontImage = document.getElementById('VehicleFrontImageFile').files[0];
    var vehicleBackImage = document.getElementById('VehicleBackImageFile').files[0];

    // Regex Patterns
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    var phoneRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

    // Check if required fields are empty
    if (
        firstName === '' || lastName === '' || phone === '' || city === '' ||
        password === '' || gender === '' || nationalId === '' ||
        plateRight === '' || plateMiddle === '' || plateLeft === '' ||
        plateNumber === '' || vehicleModel === '' || vehicleColor === '' ||
        personalPhoto === undefined || formImage === undefined ||
        drivingLicenseImage === undefined || vehicleFrontImage === undefined ||
        vehicleBackImage === undefined
    ) {
        document.getElementById('validation-label').innerText = ' يرجى إدخال الاسم الاول';
        return false;
    }

    // Validate Password using Regex
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.');
        return false;
    }

    // Validate Phone using Regex
    if (!phoneRegex.test(phone)) {
        alert('Invalid phone number format. Please enter a valid Saudi Arabian phone number.');
        return false;
    }

    // Validate National ID length
    if (nationalId.length !== 14) {
        alert('National ID must be 14 digits long.');
        return false;
    }

    // Validate Plate Number length
    if (plateNumber.length !== 3) {
        alert('Plate Number must be 3 characters long.');
        return false;
    }

    // Validate Image Sizes (not greater than 5MB)
    var maxSize = 5 * 1024 * 1024; // 5MB
    if (
        personalPhoto.size > maxSize || formImage.size > maxSize ||
        drivingLicenseImage.size > maxSize || vehicleFrontImage.size > maxSize ||
        vehicleBackImage.size > maxSize
    ) {
        alert('Image size should not exceed 5MB.');
        return false;
    }

    // Validate Arabic Characters for FirstName, LastName, and Color
    var arabicRegex = /^[\u0600-\u06FF\s]+$/;
    if (!arabicRegex.test(firstName) || !arabicRegex.test(lastName) || !arabicRegex.test(vehicleColor)) {
        alert('First Name, Last Name, and Color must contain only Arabic characters.');
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
            // document.getElementById(imgid + "btn").dataset.customProperty = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
// functions end






