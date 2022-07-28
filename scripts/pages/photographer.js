//Variable de l'id de l'url
const photographerID = window.location.search.split("?id=").join("");

//Fonction de récupération de photographe selectionné 
async function foundSelectPhotographer() {
  let data = await fetch('../../data/photographers.json').then(response => response.json());
  let photographers = data.photographers;
  let photographer;

  for (let i = 0; i < photographers.length; i++) {
    if (parseInt(photographerID) === photographers[i].id) {
      photographer = photographers[i];
    }
  }
  return ({ photographer });
}

//Fonction de récupération du média du photographe selectionné 
async function foundMedia() {
  let data = await fetch('../../data/photographers.json').then(response => response.json());
  let medias = data.media;
  let media = new Array();

  for (let i = 0; i < medias.length; i++) {
    if (parseInt(photographerID) === medias[i].photographerId) {
      media[i] = medias[i];
    }
  }

  //filtre qui retour le tableau media sans les champs vide 
  media = media.filter((x) => String(x).trim());

  return ({ media });
}

//Fonction d'affichage des informations du photographe selectionné (nom, prenom, photo....)
async function displayData(photographer) {
  const photographHeader = document.querySelector(".photograph-header");
  const modalHeader = document.querySelector(".modal-header");

  const photographerModel = photographerFactory(photographer);

  const userProfilDOM = photographerModel.getProfilInfoDOM();
  const userIMGDOM = photographerModel.getProfilIMGDOM();
  const userNameDOM = photographerModel.getProfilNameDOM();

  photographHeader.appendChild(userProfilDOM);
  photographHeader.appendChild(userIMGDOM);
  modalHeader.appendChild(userNameDOM);
}

//Fonction d'affichage des medias du photographe selectionné
async function displayMedia(medias, photographer) {
  const photographBody = document.querySelector(".photograph-body");
  const photographLikes = document.querySelector(".photograph-like");
  let likesCount = 0;
  let price = '';
  photographBody.innerHTML = ``;
  photographLikes.innerHTML = ``;

  for (let i = 0; i < medias.media.length; i++) {
    likesCount = medias.media[i].likes;
  }

  const divLikeHeart = document.createElement('div');
  const p = document.createElement('p');
  const pPrice = document.createElement('p');
  const i = document.createElement('i');

  p.textContent = likesCount; 
  price = photographer.price;
  pPrice.className = "price";
  pPrice.textContent = price + '€/jour';
  i.classList.add('fa-solid');
  i.classList.add('fa-heart');
  divLikeHeart.className = "photograph-all-likes";

  divLikeHeart.appendChild(p);
  divLikeHeart.appendChild(i);
  photographLikes.appendChild(pPrice);
  photographLikes.appendChild(divLikeHeart);

  medias.media.forEach(media => {
    const mediaModel = mediaFactory(media);
    const userMediaDOM = mediaModel.getUserMediaPicture();
    photographBody.appendChild(userMediaDOM);
  });
}

//Fonction d'initialisation des fonctions
async function init() {
  const { photographer } = await foundSelectPhotographer();
  const medias = await foundMedia();
  displayData(photographer);
  displayMedia(medias, photographer);
  filterMedias(medias, photographer);
}

init();