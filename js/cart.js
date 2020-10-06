let cartList = document.getElementById('cart-list'); // localisation du lieu d'injection

let totalCost = 0;

let cart = localStorage.getItem("cart"); // creation variable cart qui récupère ce qui se trouve déjà dans le panier
cart = JSON.parse(cart); // traduit au format js

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras`).then(response=>response.json())

.then( (cameras) => {
    totalCost = 0;

    for (product of cart) {

        let productId = Object.keys(cart);
        let product = Object.entries(cart);
        let quantity = product[0][1].quantity;
        let lense = product[0][1].lense;

        // verfication de l'existence du produit en quantité > 1
        if (!isNaN(quantity) && quantity > 0) {

        // generation dynamique de la liste d'article du panier
        const block = document.createElement("div");
        block.className ="row";
        block.innerHTML =
        `
        <p class="col-2"><a href="product.html?id=${camera._id}">${camera.name}</a></p>
        <p class="col-4">${lense}</p>
        <p class="col-2">${camera.price / 100} €</p>
        <p class="col-2">${quantity}</p>
        <p class="col-2">${quantity * camera.price / 100} €</p>
        `
        ;
        cartList.appendChild(block);// injection du code
        totalCost = totalCost + ( quantity * camera.price / 100)
    }
}

// cout total
let totalCostPlace = document.getElementById('total-cost'); // localisation du lieu d'injection
const block = document.createElement("div");
block.className ="row d-flex justify-content-end";
block.innerHTML =
`
<p class="col-2"><strong>${totalCost} €</strong></p>
`
;
totalCostPlace.appendChild(block);

});