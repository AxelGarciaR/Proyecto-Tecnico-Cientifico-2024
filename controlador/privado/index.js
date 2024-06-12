const LOGIN_FORM = document.getElementById('LoginForm');
const CONREC_FORM = document.getElementById('RecForm');
const CONREST_FORM = document.getElementById('RestForm');

const textREC = document.getElementById('textREC');
const textREST = document.getElementById('textREST');

//Constante donde esta la ruta del archivo php
const USER_API = 'services/privado/usuarios.php';
//Constante para llamar al form de inicio de sesion
const FORM_LOGIN_INPUTS = document.getElementById('FormLoginInputs');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
    CONREC_FORM.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
    // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'panel_principal.html';
    } else if (DATA.status) {
        // Se muestra el formulario para iniciar sesión.
        LOGIN_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.message, true);
    }

});

// Método del evento para cuando se envía el formulario de inicio de sesión.
FORM_LOGIN_INPUTS.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_LOGIN_INPUTS);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'panel_principal.html');
        window.location.href = 'panel_principal.html';
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

//Funcion para mostrar el formulario de recuperar contraseña
function showRecCon() {
    LOGIN_FORM.classList.add('d-none');
    CONREC_FORM.classList.remove('d-none');
    textREC.classList.remove('d-none');
    textREST.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
}

//Funcion para mostrar el formulario de recuperacion de contraseña cuando se ha verificado la direccion de correo electronico
function showRestCon() {

    sweetAlert(1, 'Se ha verificado su dirección de correo electrónico', 250);

    LOGIN_FORM.classList.add('d-none');
    CONREC_FORM.classList.add('d-none');
    textREC.classList.add('d-none');
    textREST.classList.remove('d-none');
    CONREST_FORM.classList.remove('d-none');
}

//Funcion para mostrar el formulario de login
function showLogin() {
    LOGIN_FORM.classList.remove('d-none');
    CONREC_FORM.classList.add('d-none');
    textREC.classList.add('d-none');
    textREST.classList.add('d-none');
    CONREST_FORM.classList.add('d-none');
}


const openNoti1 = async () => {
    // Llamada a la función para mostrar una notificación
    sweetAlert(1, 'El <span class="open-sans-bold-italic">código de verificación</span> ha sido enviado a su direcciòn de corrreo electrónico', 250);
}

document.getElementById('Input_Contra21').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar los espacios en blanco
    inputValue = inputValue.replace(/\s/g, '');

    // Limitar la longitud máxima a 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada limitada
    event.target.value = inputValue;
});


document.getElementById('Input_ContraNEW').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar los espacios en blanco
    inputValue = inputValue.replace(/\s/g, '');

    // Limitar la longitud máxima a 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada limitada
    event.target.value = inputValue;
});


