const form = document.getElementById('form');
const modal = document.getElementById("contact_modal");
const body = document.querySelector('body');
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const inputs = document.querySelectorAll("#first, #last, #email, #message");

function onKeyUp(e) {
    if (e.code == "Escape") {
        closeModal();
    }
}

async function displayModal() {
    document.addEventListener('keyup', onKeyUp);

    modal.style.display = "block";
    body.style.overflow = "hidden";
    main.setAttribute('aria-hidden', 'true');
    aside.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

function closeModal() {
    document.removeEventListener('keyup', onKeyUp);
    modal.style.display = "none";
    body.style.overflow = "scroll";
    main.setAttribute('aria-hidden', 'false');
    aside.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
}



const resetForm = () => {
    inputs.forEach(input => {
        input.value = '';
    });
}

const formSubmit = e => {
    const firstName = document.getElementById('first');
    const lastName = document.getElementById('last');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    e.preventDefault();
    console.log("Prenom: " + firstName.value);
    console.log("Nom: " + lastName.value);
    console.log("Email: " + email.value);
    console.log("Message: " + message.value);
    resetForm();
    closeModal();
}

form.addEventListener('submit', formSubmit);