const CARDS_SERVICIOS = document.getElementById('container-cards');
const DETAILS = document.getElementById('contenedor-details');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

function goBack() {
    window.history.back();
}
function showDetails() {
    CARDS_SERVICIOS.classList.add('d-none');
    DETAILS.classList.remove('d-none');
}

function Return() {
    CARDS_SERVICIOS.classList.remove('d-none');
    DETAILS.classList.add('d-none');
}