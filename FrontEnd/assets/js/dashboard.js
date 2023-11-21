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

function fillCities() {
  fetch('https://localhost:44302/api/City', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      displayCitiesInTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}


//***************************************** */
function fillCities() {
  fetch('https://localhost:44302/api/City', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      displayCitiesInTable(data);
    })
    .catch(error => console.error('An error occurred while fetching data:', error));
}

function displayCitiesInTable(cities) {
  const tableBody = document.getElementById('cities-table-body');

  // Clear previous content in the table body
  tableBody.innerHTML = '';

  cities.forEach(city => {
    const row = tableBody.insertRow();

    const cityIdCell = row.insertCell();
    cityIdCell.textContent = city.id;

    const cityNameCell = row.insertCell();
    cityNameCell.textContent = city.name;

    const actionCell = row.insertCell();

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.onclick = function() {
      deleteCity(city.id, row);
    };
      const updateButton = document.createElement('button');
    updateButton.textContent = 'تعديل';
    updateButton.onclick = function() {
      updateCity(city.id, cityNameCell);
    };
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(updateButton);

  });

}

function deleteCity(cityId, row) {
  fetch(`https://localhost:44302/api/City/${cityId}`, {
    method: 'DELETE'
  })
    .then(() => {
      const table = document.getElementById('cities-table');
      table.deleteRow(row.rowIndex);
    })
    .catch(error => console.error('An error occurred while deleting city:', error));
    
}



//***************************************** */





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


//***************************************** */
function fillModels() {
  fetch('https://localhost:44302/api/VehicleModel', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      displayModelsInTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayModelsInTable(models) {
  const tableBody = document.getElementById('models-table-body');

  // Clear previous content in the table body
  tableBody.innerHTML = '';

  models.forEach(model => {
    const row = tableBody.insertRow();

    const modelIdCell = row.insertCell();
    modelIdCell.textContent = model.id;

    const yearCell = row.insertCell();
    yearCell.textContent = model.year;

    const actionCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.onclick = function() {
      deleteModel(model.id, row);
    };

    const updateButton = document.createElement('button');
    updateButton.textContent = 'تعديل';
    updateButton.onclick = function() {
      updateModel(model.id, row);
    };

    actionCell.appendChild(deleteButton);
    actionCell.appendChild(updateButton);
  });
}

function deleteModel(modelId, row) {
  fetch(`https://localhost:44302/api/VehicleModel/${modelId}`, {
    method: 'DELETE'
  })
    .then(() => {
      const table = document.getElementById('models-table');
      table.deleteRow(row.rowIndex);
    })
    .catch(error => console.error('Error deleting model:', error));
}





//***************************************** */

fetch('https://localhost:44302/api/Driver', {
  method: 'GET'
}) // Replace with your server endpoint
  .then(response => response.json())
  .then(data => {

    displayDrivers(data);
  })
  .catch(error => console.error('Error fetching data:', error));



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
        
        `
    if (element['isTrusted']) {
      var nxtstr = `
          <td>
        <img src='assets/correct-icon.svg' style='width:20px; hight:20px;'>
        
        </td>
        <td>
        <button style="color: #18c76e; type="button" class="btn btn-link btn-sm btn-rounded"   data-custom-property="${element["id"]}" onClick="viewEditPage(this)">
            تفاصيل
            </button>
            </td>
            </tr>`
      str += nxtstr;
    }
    else {
      var nxtstr = `
            <td>
            <img src='assets/red-x-wrong-icon.svg' style='width:15px; hight:15px;'>

            
            </td>
            <td>
            <button style="color: #18c76e; type="button" class="btn btn-link btn-sm btn-rounded"   data-custom-property="${element["id"]}" onClick="viewEditPage(this)">
                تفاصيل
                </button>
                </td>
                </tr>`
      str += nxtstr;

    }
    document.getElementById("drivers-table-body").innerHTML += str;

  }

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


function searchByPhoneNumber() {
  // Get the input value (phone number)
  const phoneNumber = document.getElementById('phone').value.trim();

  // Get the table and table body
  const table = document.getElementById('drivers-table');
  const tableBody = document.getElementById('drivers-table-body');

  // Get all rows in the table body
  const rows = tableBody.getElementsByTagName('tr');

  // Loop through each row
  for (let i = 0; i < rows.length; i++) {
    // Get the cell in the "رقم الجوال" column (assuming it's the second column, adjust as needed)
    const cell = rows[i].getElementsByTagName('td')[1];

    // Check if the cell contains the searched phone number
    if (cell) {
      const cellText = cell.textContent || cell.innerText;
      const match = cellText.includes(phoneNumber);

      // Show/hide the row based on the match
      rows[i].style.display = match ? '' : 'none';
    }
  }
}

// Attach the search function to the button click event
document.getElementById('search-btn').addEventListener('click', searchByPhoneNumber);



function filterTableByIsTrusted() {

  // Get the selected value of the isTrusted dropdown
  const selectedValue = document.getElementById('isTrusted-select').value;

  // Get all rows in the table
  const tableBody = document.getElementById('drivers-table-body');

  // Get all rows in the table body
  const rows = tableBody.getElementsByTagName('tr');

  // Loop through each row and show/hide based on the selected value
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display='';
    const cell = rows[i].getElementsByTagName('td')[4];
    const img = cell.getElementsByTagName('img')[0];
    console.log(selectedValue);
    console.log(img.src);
    // Check if the cell contains the src=assets/correct-icon.svg

    if (selectedValue === '3') {
      if (img.src === 'http://127.0.0.1:5500/FrontEnd/assets/correct-icon.svg') {

        rows[i].style.display = 'none';
      }
    }
    else if (selectedValue === '2') {
      if (img.src === 'http://127.0.0.1:5500/FrontEnd/assets/red-x-wrong-icon.svg') {

        rows[i].style.display = 'none';
      }
    }
    else rows[i].style.display = '';



  }
}

// Attach the filter function to the select change event
document.getElementById('isTrusted-select').addEventListener('change', filterTableByIsTrusted);
/*end zezo work */


