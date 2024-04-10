const LOGIN_FORM = document.getElementById('LoginForm');
const CONREC_FORM = document.getElementById('RecForm');
const CONREST_FORM = document.getElementById('RestForm');

const textREC = document.getElementById('textREC');
const textREST = document.getElementById('textREST');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
    CONREC_FORM.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
});

function showRecCon() {
    LOGIN_FORM.classList.add('d-none');
    CONREC_FORM.classList.remove('d-none');
    textREC.classList.remove('d-none');
    textREST.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
}

function showRestCon() {
    LOGIN_FORM.classList.add('d-none');
    CONREC_FORM.classList.add('d-none');
    textREC.classList.add('d-none');
    textREST.classList.remove('d-none');
    CONREST_FORM.classList.remove('d-none');
}

function showLogin() {
    LOGIN_FORM.classList.remove('d-none');
    CONREC_FORM.classList.add('d-none');
    textREC.classList.add('d-none');
    textREST.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
}

function goto_panel_principal() {
    location.href = "/vistas/privado/panel_principal.html";
}