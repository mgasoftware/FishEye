class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('.media img, .media video'));
        const listMedias = links.map(link => link.getAttribute('src'));
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('src'), listMedias, e.currentTarget.getAttribute('alt'));
        }))
    }

    constructor(url, listMedias, title) {
        this.element = this.buildDOM(url);
        this.listMedias = listMedias;
        this.title = this.buildDOM(title);

        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    loadImage(url, title) {
        let checkIMG = url.substr(-1);
        this.url = null;
        const container = this.element.querySelector('.container-slides');
        const loader = document.createElement('div');
        loader.classList.add('lightbox_loader');
        const titleMedia = document.createElement('h2');
        titleMedia.classList.add('titre-media-lightbox');
        container.innerHTML = '';
        titleMedia.textContent = title;
        container.appendChild(titleMedia);
        container.appendChild(loader);
        console.log(title);
        if (checkIMG !== '4') {
            const image = new Image();
            image.onload = () => {
                container.removeChild(loader);
                container.appendChild(image);
                this.url = url;
            }
            image.src = url;
        }
        else {
            const vid = document.createElement('video');
            vid.setAttribute('autoplay', '');
            container.removeChild(loader);
            container.appendChild(vid);
            this.url = url;
            vid.src = url;
        }
    }

    close(e) {
        e.preventDefault();
        const dom = document.getElementById('lightbox');
        dom.style.display = 'none';
        document.removeEventListener('keyup', this.onKeyUp);
    }

    next(e) {
        e.preventDefault();
        let i = this.listMedias.findIndex(listMedia => listMedia === this.url);
        if (i === this.listMedias.length - 1) {
            i = -1;
        }
        this.loadImage(this.listMedias[i + 1]);
    }

    prev(e) {
        e.preventDefault();
        let i = this.listMedias.findIndex(listMedia => listMedia === this.url);
        if (i === 0) {
            i = this.listMedias.length;
        }
        this.loadImage(this.listMedias[i - 1]);
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

    buildDOM(url) {
        const dom = document.getElementById('lightbox');
        dom.style.display = "block";
        dom.innerHTML = `<div class="lightbox-windows">
                            <ul class="container-slides">
                            </ul>
                            <div class="commandes">
                                <button class="left" aria-label="Previous media">
                                <em class="fas fa-chevron-left"></em>
                            </button>
                            <button class="right" aria-label="Next media">
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
Lightbox.init();