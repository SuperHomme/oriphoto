// choses à faire
// 1 - créer un structure DOM reprenant tous les éléments card
// 2 - insérer une variable dans les éléments du DOM
// 3 - lier la variable aux éléments mis à dispo par l'API
// 4 - insérer cela dans une boucle pour générer autant de cartes que d'articles

const apiUrl = "http://localhost:3000"
fetch(`${apiUrl}/api/cameras`).then(response=>response.json())
.then((cameras)=>{
//    console.log(cameras)
for (let camera of cameras){
    console.log(camera)
}
})

// déclaration de variables : utile ?
let cameraName = camera.name;
let cameraPrice = camera.price
let cameraDescritpion = camera.description;
let cameraLenses = camera.lenses;
let cameaImageUrl = camera.imageUrl;

// création d'une class en attendant de savoir importer depuis l'API
class Camera
{
constructor(name, price, description, lenses, imageUrl)
{
this.name = name;
this.price = price;
this.descritpion = description;
this.lenses = lenses;
this.imageUrl = imageUrl;
}
}

// avant utilisation de la boucle (génération dynamique), test pour un article simple
document.getElementsByClassName("acameraname").innerText = `Nom : ${aCamera.price}`;
document.getElementsByClassName("acameraprice").innerText = `Prix : ${aCamera.price}`;

// boucle pour chaque article contenu dans l'array articles
for (let camera of cameras)
{
camera.name
camera.price
camera.description
camera.lenses
camera.imageUrl
}