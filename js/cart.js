let cartList = document.getElementById('cart-list'); // localisation du lieu d'injection

let totalPrice = 0; // initialisation variable
let nbLense = 0;
let nbLoop = 0;

let cart = localStorage.getItem("cart"); // creation variable cart qui récupère ce qui se trouve déjà dans le panier
cart = JSON.parse(cart); // traduit au format js

const apiUrl = "http://localhost:3000";

let bar = new Promise((resolve, reject) => {

    for (const [productId, product] of Object.entries(cart)) { // pour chaque paire id  / produit des entrées du panier

        for (const [indexLense, quantity] of Object.entries(product.lenses)) { // pour chaque paire indexLentille / quantité

            nbLoop ++; // on compte le nombre de tours

            fetch(`${apiUrl}/api/cameras/${productId}`).then(response=>response.json()) // récupère les infos de camera
            .then((camera) => {

                const block = document.createElement("div"); // création des éléments HTML
                block.className ="row";
                block.innerHTML =
                    `
                    <p class="col-2"><a href="product.html?id=${product._id}">${camera.name}</a></p>
                    <p class="col-4">${camera.lenses[indexLense]}</p>
                    <p class="col-2">${camera.price / 100} €</p>
                    <p class="col-2">${quantity}</p>
                    <p class="col-2">${quantity * camera.price / 100} €</p>
                    `;
                cartList.appendChild(block); // injection du code
                totalPrice = totalPrice + ( quantity * camera.price / 100); // ajout du total
                
                nbLense ++; // on incrémente le nombre de lentilles différentes
                
                if ((nbLense) == nbLoop) {
                    resolve();
                }
            });
        };
    };
});
        
bar.then(() => {

        let totalPricePlace = document.getElementById('total-cost'); // localisation du lieu d'injection
        const block2 = document.createElement("div"); // création des éléments HTML
        block2.className ="row d-flex justify-content-end";
        block2.innerHTML =
        `
        <p class="col-2"><strong>${totalPrice} €</strong></p>
        `
        ;
        totalPricePlace.appendChild(block2);
});

let form = document.forms.frm;

// collecte des éléments du formulaires en variables
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const postalCode = form.elements.postalCode;
const city = form.elements.city;
const email = form.elements.email;

// message d'erreurs en variables
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage');
const firstNameErrorMessage = document.getElementById('firstNameErrorMessage');
const addressErrorMessage = document.getElementById('addressErrorMessage');
const postalCodeErrorMessage = document.getElementById('postalCodeErrorMessage');
const cityErrorMessage = document.getElementById('cityErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');

// validation des inputs
const isNotEmpty = value => value !== "" ? true : false;
const isLongEnough = value => value.length >= 2 ? true : false;
const containNumber = /[0-9]/;
const doNotContainNumber = value => !value.match(containNumber) ? true : false;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;
const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false;
const regexEmail = /.+@.+\..+/;
const isValidEmail = (value) => value.match(regexEmail) ? true : false;
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);


let confirmOrderBtn = document.getElementById('confirm-order-btn'); // localisation du bouton de confirmation de commande

confirmOrderBtn.addEventListener("click", function(event) { // au clic sur le bouton "confirmer la commande"
    event.preventDefault();

    // conditions de validation du formulaire
    const formValidate = () => {

        if(isValidInput(lastName.value)) {
            lastNameErrorMessage.textContent = "";
        } else {
            firstNameErrorMessage.textContent = "veuillez renseigner votre nom";
            console.log("alert lastName")
            firstName.focus();
            return false;
        }

        if (isValidInput(firstName.value)) {
            firstNameErrorMessage.textContent = "";
        } else {
            firstNameErrorMessage.textContent = "veuillez renseigner votre prénom";
            firstName.focus();
            return false;
        }

        if(isNotEmpty(address.value) && isLongEnough(address.value)) {
            addressErrorMessage.textContent = "";
        } else {
            addressErrorMessage.textContent = "veuillez renseigner votre adresse";
            address.focus();
            return false;
        }

        if(!doNotContainNumber(postalCode.value)) {
            postalCodeErrorMessage.textContent = "";
        } else {
            postalCodeErrorMessage.textContent = "veuillez renseigner votre code postal";
            postalCode.focus();
            return false;
        }

        if(isValidInput(city.value)) {
            cityErrorMessage.textContent = "";
        } else {
            cityErrorMessage.textContent = "veuillez renseigner votre ville";
            city.focus();
            return false;
        }

        if(isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";
        } else {
            emailErrorMessage.textContent = "veuillez renseigner votre email";
            email.focus();
            return false;
        }

        return true;
    }

    // stockage variables à l'intérieur
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        postalCode: postalCode.value,
        city: city.value,
        email: email.value,
    }

    // on change la forme du panier : on passe d'un objet à un tableau
    const arrayCart = Object.keys(cart)
    .map(function(key) {
        return cart[key];
    });

    // on créé objet et tableau pour recevoir les informations de la commande
    const cartInformation = {
        contact: contact,
        products: arrayCart
    }

    // définition de la foncion d'envoi des données à l'API

    const postData = async (method, url, dataElt) => { 
        const response = await fetch (url, {
            headers: {
                'Content-Type' : 'application/json'
            },
            method: method,
            body: JSON.stringify(dataElt)
        })
        return await response.json();
    }

    // on vérifie que toutes les données sont bien validées
    const validForm = formValidate();
    if (validForm === true) {
        const response = postData('POST', `${apiUrl}/api/cameras/order`, cartInformation); // on envoi les données au serveur
        response.then(function(result) {
            const orderId = result.orderId;
            window.location.href = `order-confirmation.html?id=${orderId}&price=${totalPrice}&user=${firstName.value}`; // orderId est censé être renvoyé par le serveur
        });
    } else {
        console.log("erreur")
    };
});

// TODO : vider le panier après la commande
// TODO : n'afficher le formulaire que si le panier existe, voir au clic sur un btn "passer commande"
// TODO : afficher "aucun produit dans le panier" si panier vide
// TODO : bouton remove product / chgt quantité
// TODO : afficher dans l'ordre les produits, voire un seul produit et à côté les différentes lentilles de ce produit