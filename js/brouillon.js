// question à Steeve
// QAS : "debugger", ça sert à l'écrtirue du code, le code s'arrête, c'est un outil de programmation ?
// QAS : camera is not defined alors que le console.log fonctionne ?
// QAS : comment on parse le json ? directement avec .json() ?
// QAS : en fait, console.log ne sert qu'à la partie "ecriture du code" ; on retire tout ensuite ?
// QAS : comment créer un élément dans un élément, dans un élément ?

///// creation d'éléments imbriqués qui ne fonctionne pas
// nouvel élément de type div
let newDiv = document.createElement("div");
// on afecte une classe à la div
newDiv.classList.add('col-sm-6');
newDiv.classList.add('new-card');
// identification du lieu d'injection
let cardCreation = document.getElementById('card-creation');
// injection du code
cardCreation = cardCreation.appendChild(newDiv);
// identification du lieu d'injection
let newCard = document.getElementsByClassName('new-card');
// injection du code
newCard = newCard.appendChild(newDiv);

///// boucle qui ne marche pas
// 
for (let camera of cameras)
{
let newDiv = document.createElement("div");
// identification du lieu d'injection
let cardCreation = document.getElementById('card-creation');
// injection du code
cardCreation.innerHTML = '<div class="col-sm-6"><div class="card"><div class="card-header">`${camera.name}`</div><img class="card-img-top" src="#" alt="Card image cap"><div class="card-body"><p class="card-text">Lenses</p><p class="card-text">Price</p><p class="card-text">Description</p><a href="#" class="btn btn-primary">Détails</a></div></div></div>';
}

// choses à faire
// 1 - créer un structure DOM reprenant tous les éléments card
// 2 - insérer une variable dans les éléments du DOM
// 3 - lier la variable aux éléments mis à dispo par l'API
// 4 - insérer cela dans une boucle pour générer autant de cartes que d'articles

// déclaration de variables. est-ce utile ?
let cameraId = camera._id;
let cameraName = camera.name;
let cameraPrice = camera.price
let cameraDescritpion = camera.description;
let cameraLenses = camera.lenses;
let cameaImageUrl = camera.imageUrl;