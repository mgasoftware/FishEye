async function displayModal() {
    const { photographer } = await foundSelectPhotographer();
    console.log(photographer.name);
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
