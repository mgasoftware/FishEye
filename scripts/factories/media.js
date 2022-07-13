function mediaFactory(data) {
    const { id, photographerID, title, image, video, likes, date, price } = data;

    const picture = `assets/images/${image}`;
    const videoMedia = `assets/images/${video}`;

    function getUserMediaPicture() {
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.className = "media";
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        div.appendChild(img);
        article.appendChild(div);
        return (article);
    }
    return { photographerID, picture, likes, date, getUserMediaPicture };
}