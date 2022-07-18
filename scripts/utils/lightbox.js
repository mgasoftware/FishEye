const lightbox = document.querySelector(".lightbox");
const close = document.getElementById('close');
const body = document.querySelector("body");

async function showLightBox(title, urlIMG, image, video, urlVideo) {
  let checkIMG = parseInt(urlVideo.substr(-2));
  const containerSlides = document.querySelector(".container-slides");
  if (checkIMG === 4) {
    console.log('video');
    const vid = document.createElement('video');
    const src = document.createElement('source');
    src.setAttribute("src", urlVideo);
    src.setAttribute("type", "video/mp4");
    vid.setAttribute('autoplay', '');
    vid.appendChild(src);
    containerSlides.appendChild(vid);
  }
  else {
    console.log('photo');
    const img = document.createElement('img');
    img.setAttribute("src", urlIMG);
    img.setAttribute("alt", title);
    containerSlides.appendChild(img);
  }
  lightbox.style.display = "block";
  lightbox.setAttribute('aria-hidden', 'false');
  body.style.overflow = "hidden";
}

function closeLightBox() {
  lightbox.style.display = "none";
  lightbox.setAttribute('aria-hidden', 'true');
  body.style.overflow = "scroll";
}

document.addEventListener('keydown', function (e) {
  if (e.code == "Escape") {
      closeLightBox();
  }
});