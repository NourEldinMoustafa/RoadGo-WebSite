/*start zezo work*/

/*
declare fetch
*/

fillCities()
function fillCities() {
  fetch('https://localhost:44302/api/City', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      fillSelectOptions(data, "city-select");
    })
    .catch(error => console.error('Error fetching data:', error));



}
fillModels();
function fillModels() {
  fetch('https://localhost:44302/api/VehicleModel', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {

      var Select = document.getElementById('model-select');
      Select.innerHTML = ``;
      data.forEach(data => {
        var child = document.createElement("option")
        child.textContent = data['year'];
        child.value = data['id'];

        Select.appendChild(child);
      });
    })
    .catch(error => console.error('Error fetching data:', error));

}


fetch('https://localhost:44302/api/Driver', {
  method: 'GET'
}) // Replace with your server endpoint
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayDrivers(data);
  })
  .catch(error => console.error('Error fetching data:', error));


function updatePageContent() {
  // Implement the logic to update your page content based on the currentDriverIndex
  // For example, you can fetch and display information about the drivers.
  console.log('Updating page content for driver index:', currentDriverIndex);
}



document.getElementById('recipient-name').addEventListener('focus', function () {
  document.getElementById('popup-validation-label').style.display = 'none';

});



document.getElementById('popoup-add-btn').addEventListener('click', function (event) {

  const name = document.getElementById('recipient-name').value;
  document.getElementById('recipient-name').value = ''




  const str = document.getElementById('popup-label').innerText;
  console.log(str);
  if (str === 'المدينة') {
    var formdata = new FormData();
    formdata.append('name', name);
    fetch('https://localhost:44302/api/city', {
      method: 'POST',
      body: formdata
    }) // Replace with your server endpoint
      .then(response => response.json())
      .then(data => {
        fillCities()
        document.getElementById('popup-validation-label').style.display = 'block';
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));

  }
  else if (str === 'الموديل') {
    var formdata = new FormData();
    formdata.append('year', name);
    fetch('https://localhost:44302/api/VehicleModel', {
      method: 'POST',
      body: formdata
    }) // Replace with your server endpoint
      .then(response => response.json())
      .then(data => {
        fillModels();
        document.getElementById('popup-validation-label').style.display = 'block';
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  else {
    console.log('error here');
  }

});





/*
displayDrivers function
*/
function changeWordinPopup(msg) {
  document.getElementById('popup-label').innerText = msg;
}

function fillSelectOptions(data, id) {

  var Select = document.getElementById(id);
  Select.innerHTML = ``;
  var icon = document.createElement('i');
  icon.classList.add('bi');
  icon.classList.add('bi-x');
  data.forEach(data => {
    var child = document.createElement("option")
    child.textContent = data['name'];
    child.value = data['id'];
    Select.appendChild(child);
  });
}



function displayDrivers(drivers) {
  // drivers is a json object
  var str = ``;

  document.getElementById("drivers-table-body").innerHTML = '';

  for (var i = 0; i < drivers.length; i++) {
    var element = drivers[i];
    console.log(element)
    str = `      <tr>
        <td>
          <div class="d-flex align-items-center">
          
          <img
          src="data:image/jpeg;base64,  ${element.personalPhoto}"
          alt=""
          style="width: 100px; height: 100px"
          class="rounded-circle"
          data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64,  ${element.personalPhoto}"
           onClick="changeImgSrc(this)" />

          <div class="ms-3">
              <p class="fw-bold mb-1">${element["firstName"]} ${element["lastName"]}  </p> <!-- من ال api هيجي داتا-->
              
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">${element["phone"]}</p>
        </td>


        <td>
        <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64, ${element.drivingLicenseImage}" onClick="changeImgSrc(this)"></i>

        </td>
        

        <td>

        <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64, ${element.formImage}" onClick="changeImgSrc(this)"></i>

        </td>

        <td>
        <input type='checkbox'>
        
        </td>
        <td>
          <button style="color: #18c76e; type="button" class="btn btn-link btn-sm btn-rounded"   data-custom-property="${element["id"]}" onClick="viewEditPage(this)">
            تفاصيل
          </button>
        </td>
      </tr>`

    document.getElementById("drivers-table-body").innerHTML += str;
  }
  // drivers.forEach(element => {
  //   str = `      <tr>
  //       <td>
  //         <div class="d-flex align-items-center">

  //         <img
  //         src="data:image/jpeg;base64,  ${element.personalPhoto}"
  //         alt=""
  //         style="width: 100px; height: 100px"
  //         class="rounded-circle"
  //         data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64,  ${element.personalPhoto}"
  //          onClick="changeImgSrc(this)" />

  //         <div class="ms-3">
  //             <p class="fw-bold mb-1">${element["firstName"]} ${element["lastName"]}  </p> <!-- من ال api هيجي داتا-->

  //           </div>
  //         </div>
  //       </td>
  //       <td>
  //         <p class="fw-normal mb-1">${element["phone"]}</p>
  //       </td>


  //       <td>
  //       <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64, ${element.drivingLicenseImage}" onClick="changeImgSrc(this)"></i>

  //       </td>


  //       <td>

  //       <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64, ${element.formImage}" onClick="changeImgSrc(this)"></i>

  //       </td>

  //       <td>
  //         <button type="button" class="btn btn-link btn-sm btn-rounded"   data-custom-property="${element["id"]}" onClick="viewEditPage(this)">
  //           تفاصيل
  //         </button>
  //       </td>

  //       <td>

  //     </td>
  //     </tr>`

  //   document.getElementById("drivers-table-body").innerHTML += str;
  // });

}

function changeImgSrc(btn) {
  const newSrc = btn.dataset.customProperty;
  document.getElementById("dynamic-img").src = newSrc;
}

function viewEditPage(btn) {
  var id = btn.dataset.customProperty;

  localStorage.setItem("driverid", id);
  window.location.href = "DriverDetails.html";
}


/*end zezo work */


