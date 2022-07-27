class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('.media img, .media video'));
        const listMedias = links.map(link => link.getAttribute('src'));
        const listTitles = links.map(link => link.getAttribute('alt'));

        links.forEach(link => link.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.key === 'Enter') {
                new Lightbox(e.currentTarget.getAttribute('src'), listMedias, e.currentTarget.getAttribute('alt'), listTitles);
            }
        }));
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('src'), listMedias, e.currentTarget.getAttribute('alt'), listTitles);
        }))
    }

    constructor(url, listMedias, title, listTitles) {
        this.element = this.buildDOM(url);
        this.listMedias = listMedias;
        this.listTitles = listTitles;

        this.loadImage(url, title);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    loadImage(url, title) {
        let checkIMG = url.substr(-3);
        this.url = null;
        this.title = null;

        const main = document.querySelector('main');
        const lightbox = document.querySelector('.lightbox');
        const container = this.element.querySelector('.container-slides');
        const loader = document.createElement('div');
        const buttonLeft = this.element.querySelector('.left');

        loader.classList.add('lightbox_loader');
        const textMedia = document.createElement('h2');
        textMedia.classList.add('titre-media-lightbox');
        container.innerHTML = '';
        main.setAttribute('aria-hidden', 'true');
        lightbox.setAttribute('aria-hidden', 'false');
        buttonLeft.focus();

        container.appendChild(loader);

        if (checkIMG !== 'mp4') {
            const image = new Image();
            image.onload = () => {
                container.removeChild(loader);
                container.appendChild(image);
                container.appendChild(textMedia);
                this.url = url;
                this.title = title;
            }
            image.src = url;
            image.alt = title;
            textMedia.textContent = title;
        }
        else {
            const vid = document.createElement('video');
            vid.setAttribute('autoplay', '');
            container.removeChild(loader);
            container.appendChild(vid);
            container.appendChild(textMedia);
            this.url = url;
            this.title = title;
            vid.src = url;
            vid.alt = title;
            textMedia.textContent = title;
        }
    }

    close(e) {
        e.preventDefault();
        const main = document.querySelector('main');
        const dom = document.getElementById('lightbox');
        main.setAttribute('aria-hidden', 'false');
        dom.setAttribute('aria-hidden', 'true');
        dom.style.display = 'none';
        document.removeEventListener('keyup', this.onKeyUp);
    }

    next(e) {
        e.preventDefault();
        let i = this.listMedias.findIndex(listMedia => listMedia === this.url);
        let y = this.listTitles.findIndex(listTitle => listTitle === this.title);
        if (i === this.listMedias.length - 1) {
            i = -1;
            y = -1;
        }
        this.loadImage(this.listMedias[i + 1], this.listTitles[y + 1]);
    }

    prev(e) {
        e.preventDefault();
        let i = this.listMedias.findIndex(listMedia => listMedia === this.url);
        let y = this.listTitles.findIndex(listTitle => listTitle === this.title);
        if (i === 0) {
            i = this.listMedias.length;
            y = this.listTitles.length;
        }
        this.loadImage(this.listMedias[i - 1], this.listTitles[y - 1]);
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e);
        } else if (e.key === 'ArrowLeft') {
            this.prev(e);
        } else if (e.key === 'ArrowRight') {
            this.next(e);
        }
    }

    buildDOM() {
        const dom = document.getElementById('lightbox');
        dom.style.display = "block";
        dom.innerHTML = `<div class="lightbox-windows">
                            <ul class="container-slides">
                            </ul>
                            <div class="commandes">
                                <button class="left" aria-label="Previous image">
                                    <em class="fas fa-chevron-left"></em>
                                </button>
                                <button class="right" aria-label="Next image">
                                    <em class="fas fa-chevron-right"></em>
                                </button>
                                <button class="close" aria-label="Close dialog">
                                    <em class="fas fa-times close-lightbox-media"></em>
                                </button>
                            </div>
                        </div>`
        dom.querySelector('.close').addEventListener('click', this.close.bind(this));
        dom.querySelector('.right').addEventListener('click', this.next.bind(this));
        dom.querySelector('.left').addEventListener('click', this.prev.bind(this));
        return dom
    }
}

window.setTimeout(() => {
    Lightbox.init();
}, 500);