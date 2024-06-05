// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/privado/cliente.php';

// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#agregarCategoriaModal');
// Constantes para establecer los elementos de la card de clientes.
const CLIENTES_CARDS_CONTAINER = document.getElementById('clientes_container');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    fillTable();
});

/*
*   Función asíncrona para llenar el contenedor de los clientes con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async () => {
    CLIENTES_CARDS_CONTAINER.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTES_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CLIENTES_CARDS_CONTAINER.innerHTML += `
            <!--Card del Cliente 5-->
            <div class="auto-card card" onclick="gotoDetail()">
                <div class="content z-3">
                    <h4 class="open-sans-light-italic">Conoce al Cliente</h4>
                </div>
                <div class="container-img-card">
                    <img src="../../recursos/imagenes/img_personanatural/personas.png">
                </div>
                <div class="container-info-card position-relative">
                    <div class="line-red-split position-absolute"></div>
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-column f1">
                            <h2>Axel garcia</h2>
                            <p>Cliente #0003</p>
                        </div>
                        <div class="d-flex justify-content-around" id="detalles-card">
                            <div class="contenedor-dui d-flex-flex-column position-relative ">
                                <h1>DUI</h1>
                                <p>12345678-9</p>
                            </div>

                            <div class="linear2 position-relative"></div>

                            <div class="contenedor-telefono d-flex-flex-column">
                                <h1>Telefono</h1>
                                <p>2222-2222</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

//Funcion que muestra la alerta de confirmacion
const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
    if (RESPONSE.isConfirmed) {
        MODAL.hide();
    }
}
//Funcion que muestra la alerta de notificacion
const openNoti = async () => {
    // Llamada a la función para mostrar una notificación
    sweetAlert(1, 'Se ha guardado con exito', 300);
    MODAL.hide();
}

// Funcion para ir hacia la pagina de detalles del automovil
function gotoDetail() {
    location.href = "../../vistas/privado/cliente_juridica.html";
}

//----------------------------VALIDACIONES-----------------
document.getElementById('input_dui').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 9 dígitos
    inputValue = inputValue.slice(0, 9);

    // Formatear el número agregando el guión antes del último dígito si hay al menos dos dígitos
    if (inputValue.length > 1) {
        inputValue = inputValue.slice(0, -1) + '-' + inputValue.slice(-1);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
});


document.getElementById('input_nit').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 14 dígitos
    inputValue = inputValue.slice(0, 14);

    // Formatear el número agregando los guiones
    let formattedValue = '';

    if (inputValue.length > 4) {
        formattedValue += inputValue.slice(0, 4) + '-';
        inputValue = inputValue.slice(4);
    }

    if (inputValue.length > 6) {
        formattedValue += inputValue.slice(0, 6) + '-';
        inputValue = inputValue.slice(6);
    }

    if (inputValue.length > 3) {
        formattedValue += inputValue.slice(0, 3) + '-';
        inputValue = inputValue.slice(3);
    }

    // Agregar el último grupo de dígitos
    if (inputValue.length > 0) {
        formattedValue += inputValue;
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = formattedValue;
});


document.getElementById('input_telefono').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 8);

    // Formatear el número agregando el guión
    if (inputValue.length > 4) {
        inputValue = inputValue.slice(0, 4) + '-' + inputValue.slice(4);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
});


document.getElementById('input_nombre').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras o espacios
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

document.getElementById('input_apellido').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras o espacios
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

document.getElementById('input_correo').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar espacios en blanco
    inputValue = inputValue.replace(/\s/g, '');

    // Asegurar que el correo electrónico no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada limitada
    event.target.value = inputValue;
});