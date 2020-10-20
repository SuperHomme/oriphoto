let cartList = document.getElementById('cart-list'); // localisation du lieu d'injection

let totalPrice = 0; // initialisation variable

let cart = localStorage.getItem("cart"); // creation variable cart qui récupère ce qui se trouve déjà dans le panier
cart = JSON.parse(cart); // traduit au format js

const apiUrl = "http://localhost:3000";

for (const [productId, product] of Object.entries(cart)) { // pour chaque paire clef / produit des entrées du panier

    for (const [indexLense, quantity] of Object.entries(product.lenses)) { // pour chaque paire indexLentille / quantité

        fetch(`${apiUrl}/api/cameras/${product.id}`).then(response=>response.json()) // récupère les infos de camera
        .then( (camera) => {

            const block = document.createElement("div"); // création des éléments HTML
            block.className ="row";
            block.innerHTML =
                `
                <p class="col-2"><a href="product.html?id=${product.id}">${camera.name}</a></p>
                <p class="col-4">${camera.lenses[indexLense]}</p>
                <p class="col-2">${camera.price / 100} €</p>
                <p class="col-2">${quantity}</p>
                <p class="col-2">${quantity * camera.price / 100} €</p>
                `;
            cartList.appendChild(block); // injection du code
            totalPrice = totalPrice + ( quantity * camera.price / 100); // ajout du total

            console.log(totalPrice)

        });
    };
};

document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') {

        // cout total || problème > si je le mais dans le fetch, les boucles créés plusieurs fois le total, si je le met en dehors, le temps que la promesse réponde, la constante est à zéro
        //window.addEventListener('load', function () {
        let totalPricePlace = document.getElementById('total-cost'); // localisation du lieu d'injection
        const block2 = document.createElement("div"); // création des éléments HTML
        block2.className ="row d-flex justify-content-end";
        block2.innerHTML =
        `
        <p class="col-2"><strong>${totalPrice} €</strong></p>
        `
        ;
        totalPricePlace.appendChild(block2);

        console.log("la page est chargée");
    }
});


// éléments du formulaires en variables
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const adress = form.elements.adress;
const postaleCode = form.elements.postalCode;
const city = form.elements.city;
const email = form.elements.email;
const password = form.elements.password;

// message d'erreurs en variables
const firstNameErrorMessage = document.getElementById('firstNameErrorMessage');
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage');
const adressErrorMessage = document.getElementById('adressErrorMessage');
const postalCodeErrorMessage = document.getElementById('postalCodeErrorMessage');
const cityErrorMessage = document.getElementById('cityErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const passwordErrorMessage = document.getElementById('passwordErrorMessage');

// validation des inputs
const isNotEmpty = value => value !== "" ? true : false;
const isLongEnough = value => value.lenght >= 2 ? true : false;
const containNumber = /[0-9]/;
const doNotContainNumber = value => !value.macth(containNumber) ? true : false;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;
const doNotContainSpecialCharacter = value => !value.macth(specialCharacter) ? true : false;
const regexEmail = /.+@.+\..+/;
const isValidEmail = (value) => value.match(regexEmail) ? true : false;
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);

// on créé objet et tableau vide pour recevoir les informations de la commande
const cartInformation = {
    contact: {},
    products: []
}

// stockage variables à l'intérieur
return cartInformations.contact {
    firstName = firstName.value,
    lastName = lastName.value,
    adress = adress.value,
    postalCode = postalCode.value,
    city = city.value,
    email = email.value,
    password = password.value
}

// définition de la foncion d'envoi des données à l'API
const postData = async (method, url, dataElt) => { 
    const response = await fetch (url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method,
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

let confirmOrderBtn = document.getElementById('confirm-order-btn'); // localisation du bouton de confirmation de commande

confirmOrderBtn.addEventListener("click", async (event) => { // au clic sur le bouton "confirmer la commande"
    event.preventDefault();
    // on vérifie que toutes les données sont bien validées
    const validForm = formValidate();
    if (validForm === true) {
        const response = await postData('POST', `${apiUrl}/api/cameras/order`, cartInformation); // on envoi les données au serveur
        windows.location = `order-confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // orderId est censé être renvoyé par le serveur
    }
})