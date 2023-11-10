/*start zezo work*/

/*
declare fetch
*/
fetch('https://localhost:44302/GetAllDrivers') // Replace with your server endpoint
.then(response => response.json())
.then(data => {
    displayDrivers(data);
})
.catch(error => console.error('Error fetching data:', error));


/*
displayDrivers function
*/
function displayDrivers(drivers) {
  // drivers is a json object
  var str = ``
  drivers.forEach(element => {
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
        </td>

        <td>

        <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="data:image/jpeg;base64, ${element.formImage}" onClick="changeImgSrc(this)"></i>

        </td>

        <td>
          <button type="button" class="btn btn-link btn-sm btn-rounded"   data-custom-property="${element["id"]}" onClick="viewEditPage(this)">
            تفاصيل
          </button>
        </td>
      </tr>`



    document.getElementById("drivers-table-body").innerHTML += str;
  });

}

function changeImgSrc(btn) {
  const newSrc = btn.dataset.customProperty;
  document.getElementById("dynamic-img").src = newSrc;
}

function viewEditPage(btn) {
  var id = btn.dataset.customProperty;

  localStorage.setItem("driverid", id);
  window.location.href = "EditDriver.html";
}


/*end zezo work */


