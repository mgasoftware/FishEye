function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ' ' + country;
        const p = document.createElement('p');
        p.textContent = tagline;
        const p2 = document.createElement('p');
        p2.className = "price";
        p2.textContent = price + '€/jour';
        const a = document.createElement('a');
        a.href = 'http://127.0.0.1:5500/photographer.html?id=' + id;
        a.setAttribute("role", name);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(p2);
        return (article);
    }
    return { name, id, picture, getUserCardDOM }
}