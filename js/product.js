const queryString = window.location.search; // renvoi l'URL. le search renvoi ce qui se trouve après le ? de l'url
const urlParams = new URLSearchParams(queryString); // récupére les données() | QAS pourquoi ajoute-t-on new ? pourquoi pas directement const product = window.location.search.get('product') ?
const product = urlParams.get('product'); // insère les données dans la variable product

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras/${product}`).then(response=>response.json())

.then(
(camera)=>
{
let cardCreation = document.getElementById('card-creation');
let inCart = localStorage.getItem(camera._id);

let options = "";
for (let lense of camera.lenses) {
    options += `<option value="${lense}">${lense}</option>`
}

const block = document.createElement("div");
block.className = "col-sm-6"
block.innerHTML = `
<div class="card">
    <div class="card-header">${camera.name}</div>
    <img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
    <p class="card-text">${camera.price / 100} €</p>
    <p class="card-text">${camera.description}</p>
    <div class="form-group">
        <label for="selectLense">Sélectionner la lentille</label>
        <select class="form-control form-control-sm" id="selectLense">
        ${options}
        </select>
    </div>
    <div class="row d-flex justify-content-between">
        <input type="button" class="btn btn-primary col-3" value="-" id="minus-in-cart">
        <input type="button" class="btn btn-primary col-3" value="+" id="plus-in-cart">
        <a href="cart.html" class="btn btn-primary col-3">Panier</a>
    </div>
    <input type="text" value="${inCart}" id="in-cart-count">
</div>
`
;
cardCreation.appendChild(block);

let inCartCount = document.getElementById('in-cart-count'); // on créé un compteur

//bouton ajouter
let plusButton = document.getElementById("plus-in-cart"); // on récupère le bouton sur lequel on veut détecter le clic
plusButton.addEventListener('click', function(event) { // on écoute l'événement click sur le bouton
    event.preventDefault();
    inCart++; // incrementation de 1 sur la variable
    inCartCount.value = inCart;
    localStorage.setItem(camera._id,inCart);
});

//bouton retirer
let minusButton = document.getElementById("minus-in-cart"); // on récupère le bouton sur lequel on veut détecter le clic
minusButton.addEventListener('click', function(event) { // on écoute l'événement click sur le bouton
    event.preventDefault();
    inCart--; // décrementation de 1 sur la variable
    inCartCount.value = inCart;
    localStorage.setItem(camera._id,inCart);
});

console.log(inCart);

});