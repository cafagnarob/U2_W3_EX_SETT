const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQxMTczOWY4NzAwMTU3YWIwODIiLCJpYXQiOjE3NzY0MDk4NzMsImV4cCI6MTc3NzYxOTQ3M30.g5-In3DcqXmbJRItD1JrH6Yr9nIc4WhPMv61N10XJNM"
const spinner = document.getElementById("spinner")

const allTheParameters = new URLSearchParams(location.search)
const productId = allTheParameters.get("id")

const getDetails = function () {
  fetch(`${productUrl}${productId}`, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        spinner.classList.add("d-none")
        return response.json()
      } else {
        throw new Error("errore nel recupere dei dettagli")
      }
    })
    .then((data) => {
      console.log("DETTAGLI", data)
      const row = document.getElementById("details")
      row.innerHTML = `
        <div class="col-12 col-md-6 ">
            <div class="card custom-card">
                <img src="${data.imageUrl}" class="card-img-top" alt="product_picture">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <div class=' d-flex justify-content-between'>
                    <p class="card-text">${data.brand}</p>
                    <p class="card-price">${data.price}€</p>
                    </div>
                    </div>
            </div>
        </div>
    `
    })
    .catch((err) => {
      spinner.classList.add("d-none")
      console.log("errore fetch", err)
      const row = document.getElementById("details")
      row.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
        <ion-icon name="alert-outline"></ion-icon>
        <div>
          ${err}
        </div>
      </div>
          `
    })
}

getDetails()

const deleteProduct = function () {
  fetch(`${productUrl}${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO ELIMINATO")
        location.assign("./index.html")
      } else {
        throw new Error("errore nell eliminazione del prodotto!")
      }
    })
    .catch((err) => {
      console.log("ERRORE FETCH", err)
    })
}
