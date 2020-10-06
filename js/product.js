const queryString = window.location.search; // renvoi l'URL.
const urlParams = new URLSearchParams(queryString); // récupére les données() avec le URLSearchParams renvoi ce qui se trouve après le ? de l'url | QAC pourquoi ajoute-t-on new ? pourquoi pas directement const id = window.location.search.get('id') ?
const id = urlParams.get('id'); // insère les données dans la variable id

const apiUrl = "http://localhost:3000";
fetch(`${apiUrl}/api/cameras/${id}`).then(response=>response.json())

.then((camera) => {
    let cardCreation = document.getElementById('card-creation');
    let counter = 0;

    let options = "";
    
    for (let i = 0 ; i < camera.lenses.length ; i++) {
        options += `<option value="${i}">${camera.lenses[i]}</option>`
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
                <input class="col-3" type="number" value="${counter}" min="1" max="100" id="product-counter">
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
    let selectLenseBtn = document.getElementById('selectLense'); // localisation du la liste déroulante sur les options de lentilles

    selectedLense = document.getElementById('selectLense').value;

    selectLenseBtn.addEventListener('change', function(event) { // changement de la lentille selectionnée
        selectedLense = document.getElementById('selectLense').value;
        // console.log("lentille : ", selectedLense);
    });

    addToCartBtn.addEventListener('click', function(event) { // on écoute l'événement click sur le bouton "ajouter au panier"
        event.preventDefault(); // évite que la vue saute au début de page (c'est l'ancre # qui le provoque)

        counter = document.getElementById('product-counter').value;

        if (counter >= 1) {

            let cart = localStorage.getItem("cart"); // creation variable cart qui récupère ce qui se trouve déjà dans le panier
            cart = JSON.parse(cart); // traduit au format js
            
            let product = { // on créé le produit qui récupère le infos de la page actuelle
                "id" : camera._id,
                "quantity" : counter,
                "lense" : selectedLense // le [i] du tableau lenses
            };

            if (cart !== null) { // si le panier existe
                console.log("le panier existe");
                if(cart[product.id] != undefined) { // s'il le produit est déjà dans le panier
                    console.log("le produit est déjà dans le panier")
                    console.log(cart[product.id])
                    product.quantity = product.quantity + counter;
                }
            }
            else { // si le panier n'existe pas
                console.log("le panier n'existe pas, on créé le produit");
                cart = { // on créé le produit
                    [product.id]: product
                }
            }                      

            document.getElementById('product-counter').value = 0; // on remet le compteur à zéro pour signifier que tout est parti dans le panier
            localStorage.setItem("cart", JSON.stringify(cart)); // on traduit le panier au format JSON

        }
        
        else {
            console.log('problème : cart < 1'); // message d'erreur
        }
    });
});