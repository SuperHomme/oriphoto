const queryString = window.location.search; // renvoi l'URL.
const urlParams = new URLSearchParams(queryString); // récupére les données() avec le URLSearchParams renvoi ce qui se trouve après le ? de l'url | QAC pourquoi ajoute-t-on new ? pourquoi pas directement const id = window.location.search.get('id') ?
const id = urlParams.get('id'); // insère les données dans la variable id

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras/${id}`).then(response=>response.json())

.then((camera) => {
    let cardCreation = document.getElementById('card-creation');
    let inCart = localStorage.getItem(camera._id); // A CHANGER // recupere la quantité de camera mise dans le panier

    if (inCart < 1) {
        inCart = 1;
    }

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
                <input class="col-3" type="number" value="${inCart}" id="product-counter">
                <div class="col-3">
                    <a href="#" class="btn btn-primary" id="add-to-cart-btn">Ajouter au panier</a>
                </div>
                <div class="col-3">
                    <a href="cart.html" class="btn btn-primary">Panier</a>
                </div>
            </div>
        </div>
    `;
    cardCreation.appendChild(block);

    let addToCartBtn = document.getElementById('add-to-cart-btn'); // localisation du bouton "ajouter au panier"
    let selectLenseBtn = document.getElementById('selectLense');
    let selectedLense = document.getElementById('selectLense').value;
    console.log("lentille initiale : ", selectedLense);

    addToCartBtn.addEventListener('click', function(event) { // on écoute l'événement click sur le bouton "ajouter au panier"
        event.preventDefault(); // évite que la vue saute au début de page (c'est l'ancre # qui le provoque)

        selectLenseBtn.addEventListener('change', function(event) { // changement de la lentille selectionnée
            selectedLense = document.getElementById('selectLense').value;
            console.log("lentille : ", selectedLense);

            inCart = document.getElementById('product-counter').value;

            let cart = JSON.parse(localStorage.getItem("cart")); // creation variable cart, qui récupérère ce qui est déjà dans le panier (cart)

            if (cart === null) { // s'il n'y avait rien dans le panier, on crée un tableau
                cart = [];
            }

            let product = {
                "id" : camera._id,
                "inCart" : inCart,
                "lense" : selectedLense
            };

            cart.push(product);

            for (let i of cart) {
                if (product.id == cart[i].id && product.lense == cart[i].lense) {
                    console.log("comprende cabron");
                } else {
                    cart.push(product); // on ajoute les produits au panier
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
    });
});