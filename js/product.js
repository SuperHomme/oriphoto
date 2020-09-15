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
    <label for="selectLense">Sélectionner la lentille</label>
    <div class="row">
        <select class="form-control form-control-sm col-3" id="selectLense">${options}</select>
        <input class="col-3" type="number" value="${inCart}" id="in-cart-count">
        <div class="col-3">
            <a href="cart.html" class="btn btn-primary">Panier</a>
        </div>
    </div>
</div>
`
;
cardCreation.appendChild(block);

let inCartCount = document.getElementById('in-cart-count'); // on créé un compteur

inCartCount.addEventListener('change', function(event) { // on écoute l'événement click sur le bouton
    event.preventDefault();
    localStorage.setItem(camera._id,inCartCount.value);
});


console.log(inCart);

});