const apiUrl = "http://localhost:3000" // création d'une constante qui permet de raccourcir le code
fetch(`${apiUrl}/api/cameras`).then(response=>response.json())// la méthode fetch renvoi toujours un promesse / then s'en sert / la méthode json renvoie elle même une promesse

// boucle apparaisant dans la console pour afficher les objets camera contenus dans l'objet parent cameras
.then(
(cameras)=> // on baptise l'objet response "cameras" grâce au then
{

let cardCreation = document.getElementById('card-creation'); // identification du lieu d'injection

for (let camera of cameras) // on baptise les sous-objets camera
{
// injection du code
const block = document.createElement("div");
block.className = "col-sm-6"
block.innerHTML = `
<div class="card">
<div class="card-header">${camera.name}</div>
<img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
<p class="card-text">${camera.price / 100} €</p>
<p class="card-text">${camera.description}</p>
<a href="pages/product.html?product=${camera._id}" class="btn btn-primary">Détails</a>
</div></div>`;
cardCreation.appendChild(block);
}
})