/*start zezo work*/

/*
declare HttpRequest
*/
const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status == 200) {

    const Drivers = JSON.parse(xhr.responseText);

    console.log("Drivers");
    console.log(Drivers);
    displayDrivers(Drivers)
  }
}
xhr.open("GET", "https://localhost:7047/GetAllDrivers", false);
xhr.send();

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
          src="assets/img/${element["personalPhoto"]}"
          alt=""
          style="width: 100px; height: 100px"
          class="rounded-circle"
          data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="/assets/img/${element["personalPhoto"]}"
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
        <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="/assets/img/${element["formImage"]}" onClick="changeImgSrc(this)"></i>

        </td>
        </td>

        <td>

        <i class="bi bi-eye" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-custom-property="/assets/img/${element["formImage"]}" onClick="changeImgSrc(this)"></i>

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