const apiUrl = "http://localhost:3000" // création d'une constante qui permet de raccourcir le code

fetch(`${apiUrl}/api/cameras`).then(response=>response.json())// la méthode fetch renvoi toujours un promesse / then s'en sert / la méthode json renvoie elle même une promesse
.then((cameras)=> { // on baptise l'objet response "cameras" grâce au then

    let cardCreation = document.getElementById('card-creation'); // identification du lieu d'injection

    for (let camera of cameras) { // on baptise les sous-objets camera
        const block = document.createElement("div");
        block.className = "col-sm-6"
        block.innerHTML =
            `
            <div class="card mt-3">
                <div class="card-header">${camera.name}</div>
                <img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
                <div class="p-3">
                    <p class="card-text">${camera.price / 100} €</p>
                    <p class="card-text">${camera.description}</p>
                    <a href="pages/product.html?id=${camera._id}" class="btn btn-primary">Détails</a>
                </div>
            </div>`;
        cardCreation.appendChild(block); // injection du code
    }
})