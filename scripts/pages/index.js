    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        let data = await fetch('../../data/photographers.json').then(response => response.json());
        console.log(data['photographers']);
        
        const photographers = data['photographers'];

        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();
    