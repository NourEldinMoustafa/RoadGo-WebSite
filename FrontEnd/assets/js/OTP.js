const driverid = localStorage.getItem('driverRegId');
const driverphone = localStorage.getItem('driverphone');
console.log(driverphone);


document.getElementById('four-digits').innerText = driverphone.substring(driverphone.length - 4);
document.addEventListener("DOMContentLoaded", function (event) {
    function OTPInput() {
        const inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keydown', function (event) {
                if (event.key === "Backspace") {
                    inputs[i].value = '';
                    if (i !== 0) inputs[i - 1].focus();
                }
                else {
                    if (i === inputs.length - 1 && inputs[i].value !== '') {
                        return true;
                    }
                    else if (event.keyCode > 47 && event.keyCode < 58) {
                        inputs[i].value = event.key;
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    }
                    else if (event.keyCode > 64 && event.keyCode < 91) {
                        inputs[i].value = String.fromCharCode(event.keyCode);

                        if (i !== inputs.length - 1)
                            inputs[i + 1].focus(); event.preventDefault();
                    }
                }
            });
        }
    }
    OTPInput();


});
function OTPInputValue() {
    const inputs = document.querySelectorAll('input');
    var otpValues = Array();

    for (let i = 0; i < inputs.length; i++) {
        otpValues.push(inputs[i].value);
    }

    return otpValues.join('').toString();
}


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


function phoneAuth(phoneNumber) {

    console.log(phoneNumber);
    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier).then(function (confirmationResult) {

        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        console.log('ok');

    }).catch(function (error) {

        alert(error.message);
    });
}

function codeverify(code) {

    coderesult.confirm(code).then(function () {
        var formData = new FormData();
        formData.append('isTrusted', true);

        fetch(`http://nashed123-001-site1.anytempurl.com/api/Driver/${driverid}`, {
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


// phoneAuth(`+966${driverphone}`);
phoneAuth(`${driverphone}`);

document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault();
    // Example of using the OTPInput function and getting the values
    const otpCode = OTPInputValue();
    // Log the values for testing
    codeverify(otpCode);

});

document.getElementById('resend-btn').addEventListener('click', function (event) {
    event.preventDefault();

    // phoneAuth(`+966${driverphone}`);
    phoneAuth(`${driverphone}`);

});
