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
            
            let quantity = counter
            
            let product = { // on créé le produit qui récupère le infos de la page actuelle
                "id" : camera._id,
                "lenses" : {
                    [selectedLense] : Number(quantity),
                 }
            };

            if (cart !== null) { // si le panier existe
                console.log("le panier existe déjà");
                if(cart[product.id] != undefined) { // s'il le produit est déjà dans le panier
                    console.log("ce produit " + product.id + " est déjà dans le panier");
                    if(cart[product.id].lenses[selectedLense] != undefined) { // si la lentille existe, on lui ajoute une quantité
                        console.log("cette lentille existe dans le panier, on ajoute à la quantité déjà dedans (" + cart[product.id].lenses[selectedLense] + ") le compteur actuel (" + product.lenses[selectedLense] + ") qui passe donc à " + (cart[product.id].lenses[selectedLense] + product.lenses[selectedLense]));
                        cart[product.id].lenses[selectedLense] = cart[product.id].lenses[selectedLense] + product.lenses[selectedLense]
                    } else { // si la lentille n'existe pas, on augmente sa quantité
                        console.log("cette lentille n'existait pas dans le panier, on la créée");
                        cart[product.id].lenses[selectedLense] = product.lenses[selectedLense]; // QUESTION POUR CHRIS pourquoi cela n'écrase-t-il pas le précédent ?
                    }
                }
                else { // si le produit n'est pas dans le panier, on l'ajoute
                    console.log("le produit " + product.id + " n'était pas dans le panier");
                    cart[product.id] = product;
                }
            }
            else { // si le panier n'existe pas
                console.log("le panier n'existait pas, on créé le produit");
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