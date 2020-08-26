// renvoi l'URL. le search renvoi ce qui se trouve après le ? de l'url
const queryString = window.location.search;
// récupére les données QAS 
const urlParams = new URLSearchParams(queryString);
// insère les données dans la variable product
const product = urlParams.get('product');

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras/${product}`).then(response=>response.json())

.then(
(camera)=>
{
let cardCreation = document.getElementById('card-creation');
const block = document.createElement("div");
block.className = "col-sm-6"
block.innerHTML = `
<div class="card">
<div class="card-header">${camera.name}</div>
<img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
<div class="card-body"><p class="card-text">${camera.lenses}</p>
<p class="card-text">${camera.price / 100} €</p>
<p class="card-text">${camera.description}</p>
<a href="#" class="btn btn-primary">Ajouter au panier</a>
</div></div>`;
cardCreation.appendChild(block);
})