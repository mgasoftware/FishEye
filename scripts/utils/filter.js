function filterMedias(medias, photographer) {
  const select = document.querySelector('.select');
  const selectopt = document.querySelectorAll('.selectopt');

  select.addEventListener('change', e => {
    if (selectopt[0].checked) {
      medias.media = medias.media.sort((a, b) => a.likes < b.likes ? 1 : -1);
    }
    else if (selectopt[1].checked) {
      medias.media = medias.media.sort((a, b) => a.date > b.date ? 1 : -1);
    }
    else if (selectopt[2].checked) {
      medias.media = medias.media.sort((a, b) => a.title > b.title ? 1 : -1);
    }
    displayMedia(medias, photographer);
    window.setTimeout(() => {
      Lightbox.init();
    }, 500);
    window.setTimeout(() => {
      AddLikes.init();
    }, 500);
  })
}

