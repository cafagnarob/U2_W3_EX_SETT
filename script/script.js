const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQxMTczOWY4NzAwMTU3YWIwODIiLCJpYXQiOjE3NzY0MDk4NzMsImV4cCI6MTc3NzYxOTQ3M30.g5-In3DcqXmbJRItD1JrH6Yr9nIc4WhPMv61N10XJNM"
const spinner = document.getElementById("spinner")

fetch(productUrl, {
  headers: {
    Authorization: apiKey,
  },
})
  .then((response) => {
    if (response.ok) {
      spinner.classList.add("d-none")
      return response.json()
    } else {
      throw new Error("responce errata")
    }
  })
  .then((data) => {
    console.log("prodotti esistenti", data)

    data.forEach((productObj) => {
      const newCol = document.createElement("div")
      newCol.classList.add("col-12", "col-md-4", "col-lg-4")
      newCol.innerHTML = `
            <div class="card w-100 custom-card mb-4">
                <img src= '${productObj.imageUrl}' class="card-img-top h-75" alt="product_picture">
                <div class="card-body h-25">
                    <h5 class="card-title">${productObj.name}</h5>
                    <p class="card-text text-truncate">${productObj.description}</p>
                   <div class=' d-flex justify-content-between'>
                    <p class="card-text">${productObj.brand}</p>
                    <p class="card-price">${productObj.price}€</p>
                    </div>
                    <div class='d-flex justify-content-center'>
                    <a href="./detail.html?id=${productObj._id}" class="btn btn-primary custom-btn ">VAI AI DETTAGLI</a>
                </div>
                </div>
            </div>
        `
      const row = document.getElementById("product-row")
      row.appendChild(newCol)
    })
  })
  .catch((err) => {
    spinner.classList.add("d-none")
    console.log("ERRORE NELLA FETCH", err)
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
