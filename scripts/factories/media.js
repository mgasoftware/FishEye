function mediaFactory(data) {
  const { id, photographerID, title, image, video, likes, date, price } = data;

  const picture = `assets/images/${image}`;
  const videoMedia = `assets/videos/${video}`;

  function getUserMediaPicture() {
    const article = document.createElement('article');
    const div = document.createElement('div');
    const divMediaInfos = document.createElement('div');
    const divLikeHeart = document.createElement('div');
    const pTitle = document.createElement('p');
    const pLikes = document.createElement('p');
    const i = document.createElement('i');

    div.className = "media";
    divMediaInfos.className = "media-infos";
    divLikeHeart.className = "media-likes";
    divLikeHeart.setAttribute('liked', 'false');
    divLikeHeart.setAttribute('count', likes);
    pTitle.textContent = title;
    pLikes.textContent = likes ;
    i.classList.add('fa-solid'); 
    i.classList.add('fa-heart');
    i.setAttribute('alt', 'like');
    i.setAttribute('tabindex', '0');

    if (image !== undefined) {
      const img = document.createElement('img');

      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      img.setAttribute('tabindex', '0');

      div.appendChild(img);
    }
    else {
      const vid = document.createElement('video');
      vid.setAttribute('src', videoMedia);
      vid.setAttribute('alt', title);
      vid.setAttribute('tabindex', '0');
      div.appendChild(vid);
    }
    divMediaInfos.appendChild(pTitle);
    divLikeHeart.appendChild(pLikes);
    divLikeHeart.appendChild(i);
    divMediaInfos.appendChild(divLikeHeart);
    article.appendChild(div);
    article.appendChild(divMediaInfos);
    return (article);
  }

  return { photographerID, picture, likes, date, getUserMediaPicture };
}