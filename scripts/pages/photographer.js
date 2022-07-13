const photographerID = window.location.search.split("?id=").join("");

async function foundSelectPhotographer() {
    let data = await fetch('../../data/photographers.json').then(response => response.json());
    let photographers = data.photographers;
    let photographer;

    for (let i = 0; i < photographers.length; i++) {

        if (photographerID == photographers[i].id) {
            photographer = photographers[i];
        }
    }
    return ({ photographer });
}

async function foundMedia() {
    let data = await fetch('../../data/photographers.json').then(response => response.json());
    let medias = data.media;
    let media = {};

    for (let i = 0; i < medias.length; i++) {
        if (photographerID == medias[i].photographerId) {
            media[i] = medias[i];
        }
    }

    console.log(media);

    return ({ media });
}

async function displayData(photographer) {
    const photographHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);


    const userProfilDOM = photographerModel.getProfilInfoDOM();
    const userIMGDOM = photographerModel.getProfilIMGDOM();


    photographHeader.appendChild(userProfilDOM);
    photographHeader.appendChild(userIMGDOM);
};


async function displayMedia(medias) {
    const photographBody = document.querySelector(".photograph-body");

    Object.keys(medias).forEach((media) => {
        console.log(`Error${media}`);
        const mediaModel = mediaFactory(media);
        const userMediaDOM = mediaModel.getUserMediaPicture();
        photographBody.appendChild(userMediaDOM);
    }) 
};

async function init() {
    const { photographer } = await foundSelectPhotographer();
    const medias  = await foundMedia();
    displayData(photographer);
    displayMedia(medias);
    console.log(medias);
};

init();