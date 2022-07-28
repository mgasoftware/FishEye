//Classe qui permet l'ouverture et le traitement de la ajout de like
class AddLikes {
  static init() {
    const likes = Array.from(document.querySelectorAll('.media-likes'));
    //Méthode permettant de lancer la classe suivant l'element d'où l'user le like par la touche entrer
    likes.forEach(like => like.addEventListener('keyup', e => {
      e.preventDefault();
      if (e.key === 'Enter') {
        new AddLikes(e.currentTarget.getAttribute('liked'), like.childNodes[0], e.currentTarget.getAttribute('count'), like);
      }
    }))
    //Méthode permettant de lancer la classe suivant l'element d'où l'user lance le like par le click
    likes.forEach(like => like.addEventListener('click', e => {
      e.preventDefault();
      new AddLikes(e.currentTarget.getAttribute('liked'), like.childNodes[0], e.currentTarget.getAttribute('count'), like);
    }))
  }

  //Méthode permettant d'initialiser les fonctions et objet de la classe
  constructor(liked, pLike, nbLike, like) {
    this.element = this.updateLike(liked, pLike, nbLike, like);
  }

  //Fonction permettant de liké le media choisis
  updateLike(liked, pLike, nbLike, like) {
    const photographAllLikes = document.querySelector('.photograph-all-likes');
    if (liked === 'false') {
      like.setAttribute('liked', 'true');
      pLike.textContent = parseInt(nbLike) + 1;
      photographAllLikes.childNodes[0].textContent = parseInt(photographAllLikes.childNodes[0].textContent) + 1;
      this.liked = liked;
      this.pLike = pLike;
      this.nbLike = nbLike;
      this.like = like;
    }
    else {
      like.setAttribute('liked', 'false');
      pLike.textContent = parseInt(nbLike);
      photographAllLikes.childNodes[0].textContent = parseInt(photographAllLikes.childNodes[0].textContent) - 1;
      this.liked = liked;
      this.pLike = pLike;
      this.nbLike = nbLike;
      this.like = like;
    }
  }
}

//Lancement de la classe Addlikes au lancement du site avec un délai de 500ms pour récupérer les medias afin d'assurer le chargement des média
window.setTimeout(() => {
  AddLikes.init();
}, 500);