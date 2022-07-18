function mediaFactory(data) {
    const { id, photographerID, title, image, video, likes, date, price } = data;

    const picture = `assets/images/${image}`;
    const videoMedia = `assets/videos/${video}`;

    function getUserMediaPicture() {
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.className = "media";
        if(image !== undefined){
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.setAttribute('id', id);
            img.setAttribute('onclick', 'showLightBox(" '+title+ ' ", " ' +picture+' ", " ' +image+' ", " ' +video+' " , " ' +videoMedia+' ")');
            div.appendChild(img);
        }
        else {
            const vid = document.createElement('video');
            const src = document.createElement('source');
            src.setAttribute("src", videoMedia);
            src.setAttribute("type", "video/mp4");
            vid.setAttribute('onclick', 'showLightBox(" '+title+ ' ", " ' +picture+' ", " ' +image+' ", " ' +video+' " , " ' +videoMedia+' ")');
            vid.appendChild(src);
            div.appendChild(vid);
        }
        article.appendChild(div);
        return (article);
    }
    return { photographerID, picture, likes, date, getUserMediaPicture };
}