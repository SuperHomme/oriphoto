let cartList = document.getElementById('cart-list'); // localisation du lieu d'injection

let totalCost = 0;

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras`).then(response=>response.json())

.then(
(cameras)=>
{
    totalCost = 0;

for (let camera of cameras)
{
    let inCart = localStorage.getItem(camera._id);
    // verfication de l'existence du produit en quantité > 1
    if (!isNaN(inCart) && inCart > 0) {
    // generation dynamique de la liste d'article du panier
    const block = document.createElement("div");
    block.className ="row";
    block.innerHTML =
    `
    <p class="col-2"><a href="product.html?product=${camera._id}">${camera.name}</a></p>
    <p class="col-4">${camera.lenses}</p>
    <p class="col-2">${camera.price / 100} €</p>
    <p class="col-2">${inCart}</p>
    <p class="col-2">${inCart * camera.price / 100} €</p>
    `
    ;
    cartList.appendChild(block);// injection du code
    totalCost = totalCost + ( inCart * camera.price / 100)
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