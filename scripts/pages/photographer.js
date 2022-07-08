//Mettre le code JavaScript lié à la page photographer.html
// Fontions d'usine en asynchrone de récupération des photographes
async function getPhotographers() {
    // Récupération des données JSON
    let data = await fetch('../../data/photographers.json').then(response => response.json());
    console.log(data['photographers']);

    const photographers = data['photographers'];

    return ({
        photographers: [...photographers]
    })
}

//Fonction de d'affichage d'un photographe
async function displayData(photographers) {
    const photographersHeader = document.querySelector(".photograph-header");

    

    const photographerModel = photographerFactory(photographers);
    const profilDOM = photographerModel.getProfilDOM();
    photographersHeader.appendChild(profilDOM);

    // photographers.forEach((photographer) => {
    //     const photographerModel = photographerFactory(photographer);
    //     const userCardDOM = photographerModel.getUserCardDOM();
    //     photographersSection.appendChild(userCardDOM);
    // });
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
