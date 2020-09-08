let cartList = document.getElementById('cart-list'); // localisation du lieu d'injection

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras`).then(response=>response.json())

.then(
(cameras)=>
{

for (let camera of cameras)
{
    // injection du code
    let inCart = localStorage.getItem(camera._id);
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
    cartList.appendChild(block);
}
});

// cout total
let totalCost = 770;
let totalCostPlace = document.getElementById('total-cost'); // localisation du lieu d'injection
const block = document.createElement("div");
block.className ="row d-flex justify-content-end";
block.innerHTML =
`
<p class="col-2"><strong>${totalCost} €</strong></p>
`
;
totalCostPlace.appendChild(block);