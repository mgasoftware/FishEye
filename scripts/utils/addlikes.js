class AddLikes {
    static init() {
        const likes = Array.from(document.querySelectorAll('.media-likes'));
        likes.forEach(like => like.addEventListener('click', e => {
            e.preventDefault();
            new AddLikes(e.currentTarget.getAttribute('liked'), like.childNodes[0], e.currentTarget.getAttribute('count'), like);
        }))
    }

    constructor(liked, pLike, nbLike, like) {
        this.element = this.updateLike(liked, pLike, nbLike, like);
    }

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
window.setTimeout(() => {
    AddLikes.init();
}, 500);