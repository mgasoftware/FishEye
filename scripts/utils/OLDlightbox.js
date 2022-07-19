// class LightBox {
//   static init() {
//     const medias  = foundMedia();
//     console.log(medias);
//     medias.media.forEach(media => media.addEventListener('click', e => {
//       e.preventDefault();
//       new LightBox(e.currentTarget.getAttribute('href'));
//     }))
//   }

//   constructor(url) {
//     const element = this.buildDom(url);
//     document.body.appendChild(element);
//   }

//   buildDom(url) {
//     const dom = document.createElement('div');
//     dom.classList.add('lightbox');
//     dom.innerHTML = ` <button class="lightbox_close"><em class="fas fa-times close-lightbox-media"></em></button>
//                       <button class="lightbox_next"><em class="fas fa-chevron-right"></em></button>
//                       <button class="lightbox_prev"><em class="fas fa-chevron-left"></em></button>
//                       <div class="lightbox_container">
//                         <img src="${url}" alt="${title}">
//                       </div>
//                     `
//     return dom;
//   }
// }
// LightBox.init();


async function initLightBox() {
  const medias = await foundMedia();
  console.log(medias.media[0].title);
  for (i = 0; i < medias.media.length; i++){
    const picture = `assets/images/${medias.media[i].image}`;
    console.log(picture);
  }
  // medias.media.forEach(media => media.addEventListener('click', e => {
  //   e.preventDefault();
  //   new LightBox(e.currentTarget.getAttribute('href'));
  // }))
}

async function constructLightBox(url){
  const element = buildDOMLightBox();
  document.body.appendChild(element);

}

async function buildDOMLightBox(url) {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.innerHTML = ` <button class="lightbox_close"><em class="fas fa-times close-lightbox-media"></em></button>
                      <button class="lightbox_next"><em class="fas fa-chevron-right"></em></button>
                      <button class="lightbox_prev"><em class="fas fa-chevron-left"></em></button>
                      <div class="lightbox_container">
                        <img src="${url}">
                      </div>
                    `
    return dom;
}

initLightBox();









// const lightbox = document.querySelector(".lightbox");
// const close = document.getElementById('close');
// const body = document.querySelector("body");

// async function showLightBox(title, urlIMG, image, video, urlVideo) {
//   let checkIMG = parseInt(urlVideo.substr(-2));
//   const containerSlides = document.querySelector(".container-slides");
//   const titleMediaLightbox = document.querySelector(".titre-media-lightbox");
//   if (checkIMG === 4) {
//     console.log('video');
//     const vid = document.createElement('video');
//     const src = document.createElement('source');
//     src.setAttribute("src", urlVideo);
//     src.setAttribute("type", "video/mp4");
//     vid.setAttribute('autoplay', '');
//     vid.appendChild(src);
//     containerSlides.appendChild(vid);
//   }
//   else {
//     console.log('photo');
//     const img = document.createElement('img');
//     img.setAttribute("src", urlIMG);
//     img.setAttribute("alt", title);
//     containerSlides.appendChild(img);
//   }
//   const p = document.createElement('p');
//   p.textContent = title;
//   titleMediaLightbox.appendChild(p);
//   lightbox.style.display = "block";
//   lightbox.setAttribute('aria-hidden', 'false');
//   body.style.overflow = "hidden";
// }

// function closeLightBox() {
//   lightbox.style.display = "none";
//   lightbox.setAttribute('aria-hidden', 'true');
//   body.style.overflow = "scroll";
// }

// document.addEventListener('keydown', function (e) {
//   if (e.code == "Escape") {
//       closeLightBox();
//   }
// });

class Lightbox {
  static init() {
      const links = Array.from(document.querySelectorAll('.media img, .media video'));
      const listMedias = links.map(link => link.getAttribute('src'));
      links.forEach(link => link.addEventListener('click', e => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute('src'), listMedias);
      }))
  }
  /**
  * @param {string} url URL de l'image
  */

  constructor(url, listMedias) {
      this.element = this.buildDOM(url);
      this.listMedias = listMedias;
      this.loadImage(url);
      this.onKeyUp = this.onKeyUp.bind(this);

      document.body.appendChild(this.element);
      document.addEventListener('keyup', this.onKeyUp);
  }

  loadImage(url) {
      let checkIMG = url.substr(-1);
      this.url = null;
      const container = this.element.querySelector('.container-slides');
      const loader = document.createElement('div');
      loader.classList.add('lightbox_loader');
      container.innerHTML = '';
      // container.appendChild(loader);
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
          const source = document.createElement('source');
          source.setAttribute("src", url);
          source.setAttribute("type", "video/mp4");
          vid.setAttribute('autoplay', '');
          vid.appendChild(source);
          vid.onload = () => {
              container.removeChild(loader);
              container.appendChild(vid);
              this.url = url;
          }
          source.src = url;
          console.log(vid.src = url);
      }
  }

  close(e) {
      e.preventDefault();
      window.setTimeout(() => {
          this.element.parentElement.removeChild(this.element);
      }, 500)
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
      const dom = document.createElement('div');
      dom.classList.add('lightbox');
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
                          <h2 class="titre-media-lightbox"></h2>
                          </div>
                      </div>`
      dom.querySelector('.close').addEventListener('click', this.close.bind(this));
      dom.querySelector('.right').addEventListener('click', this.next.bind(this));
      dom.querySelector('.left').addEventListener('click', this.prev.bind(this));
      return dom
  }
}
Lightbox.init();