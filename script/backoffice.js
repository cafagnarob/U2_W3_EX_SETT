const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQxMTczOWY4NzAwMTU3YWIwODIiLCJpYXQiOjE3NzY0MDk4NzMsImV4cCI6MTc3NzYxOTQ3M30.g5-In3DcqXmbJRItD1JrH6Yr9nIc4WhPMv61N10XJNM"

const allTheParameters = new URLSearchParams(location.search)
const productId = allTheParameters.get("id")

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const form = document.getElementById("product_form")
form.addEventListener("submit", function (e) {
  e.preventDefault()
  const name = document.getElementById("name").value
  const description = document.getElementById("description").value
  const brand = document.getElementById("brand").value
  const imageUrl = document.getElementById("imageUrl").value
  const price = document.getElementById("price").value
  console.log(name, description, brand, imageUrl, price)
  const nuovoProdotto = new Product(name, description, brand, imageUrl, price)
  console.log("prodotto recuperato dal form", nuovoProdotto)

  let urlToUse
  if (productId) {
    urlToUse = productUrl + "/" + productId
  } else {
    urlToUse = productUrl
  }
  fetch(urlToUse, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(nuovoProdotto),
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(productId ? "PRODOTTO MODIFICATO" : "PRODOTTO CREATO")
        if (productId) {
          location.assign("./index.html")
        } else if (!productId) {
          const row = document.getElementById("details")
          row.innerHTML = ``
        }
        loadProducts()
        form.reset()
      } else {
        throw new Error("il server ha rifiutato il prodotto")
      }
    })
    .catch((err) => {
      spinner.classList.add("d-none")
      console.log("salvataggio prodotto fallito", err)
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
})

if (productId) {
  fetch(productUrl + "/" + productID)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nel recupero prodotto")
      }
    })
    .then((data) => {
      const name = document.getElementById("name").value
      const description = document.getElementById("description").value
      const brand = document.getElementById("brand").value
      const imageUrl = document.getElementById("imageUrl").value
      const price = document.getElementById("price").value

      name = data.name
      description = data.description
      brand = data.brand
      imageUrl = data.imageUrl
      price = data.price
    })
    .catch((err) => {
      spinner.classList.add("d-none")
      console.log("errore nel riempimento del form")
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

// card detail nel backof

window.addEventListener("DOMContentLoaded", () => {
  loadProducts()
})

const loadProducts = function () {
  fetch(productUrl, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const row = document.getElementById("details")

      row.innerHTML = ""

      data.forEach((product) => {
        row.innerHTML += `
        <div class="col-12 col-md-4" id="${product._id}">
            <div class="card mb-4 custom-card">
                <img src="${product.imageUrl}" class="card-img-top" alt="product_picture">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-truncate">${product.description}</p>
                    <div class=' d-flex justify-content-between'>
                    <p class="card-text">${product.brand}</p>
                    <p class="card-price">${product.price}€</p>
                    </div>
                    <div class="d-flex justify-content-around flex-column">
                        <a href="./backoffice.html?id=${product._id}" class="btn btn-info custom-btn-mod text-light mb-2 p-0">MODIFICA </a>
                        <button class="btn  custom-btn p-0" onclick="deleteProduct('${product._id}') ">ELIMINA </button>
                    </div>
                </div>
            </div>
        </div>
    `
      })
    })
}

const deleteProduct = function (id) {
  if (!id) {
    console.log("id mancante")
    return
  } else {
    const conferma = confirm("eliminare prodotto?")
    if (conferma) {
      fetch(`${productUrl}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: apiKey,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("PRODOTTO ELIMINATO")
            document.getElementById(id).remove()
          } else {
            throw new Error("errore nell eliminazione del prodotto!")
          }
        })
        .catch((err) => {
          spinner.classList.add("d-none")
          console.log("ERRORE FETCH", err)
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
  }
}
