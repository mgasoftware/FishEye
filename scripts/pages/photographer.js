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
    let media = new Array();

    for (let i = 0; i < medias.length; i++) {
        if (photographerID == medias[i].photographerId) {
            media[i] = medias[i];
        }
    }

    media = media.filter((x) => String(x || '').trim());

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
    console.log(medias.media);

    medias.media.forEach(media => {
        const mediaModel = mediaFactory(media);
        const userMediaDOM = mediaModel.getUserMediaPicture();
        photographBody.appendChild(userMediaDOM);
    });

};

async function init() {
    const { photographer } = await foundSelectPhotographer();
    const medias  = await foundMedia();
    displayData(photographer);
    displayMedia(medias);
};

init();