// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/privado/cliente.php';

// Constantes para establecer los elementos del componente Modal.
const MODAL_JURIDICO = new bootstrap.Modal('#agregarClienteJuridicoModal');
// Constantes para establecer los elementos de la card de clientes.
const CLIENTES_CARDS_CONTAINER = document.getElementById('clientes_container');
const ADD_FORM_JURIDICO = document.getElementById('addFormJuridico');

// Constantes de cada campo del formulario
const DUI = document.getElementById('input_dui'),
    NIT = document.getElementById('input_nit'),
    TELEFONO = document.getElementById('input_telefono'),
    NRC = document.getElementById('input_nrc'),
    DEPARTAMENTO = document.getElementById('input_departamento'),
    NOMBRES = document.getElementById('input_nombre'),
    APELLIDOS = document.getElementById('input_apellido'),
    CORREO = document.getElementById('input_correo'),
    RUBRO_COMERCIAL = document.getElementById('input_rubro_comercial');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    fillTable();
});

const addSaveJuridico = async () => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM_JURIDICO);
    FORM.append('fecha_registro', getDateTime());
    FORM.append('tipo_cliente', 'Persona juridica')
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTES_API, 'createRow', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Llamada a la función para mostrar una notificación
        sweetAlert(1, 'Se ha guardado con exito', 300);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
        MODAL_JURIDICO.hide();
        // Resetear el formulario
        document.getElementById('AddForm').reset();
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}

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
    CLIENTES_CARDS_CONTAINER.innerHTML += `
    <!--Contenedor de la primera card - card de agregar automovil-->
    <div class="add-cliente-card d-flex align-items-center justify-content-center">
        <img src="../../recursos/imagenes/icons/add.svg" class="hvr-grow" data-bs-toggle="modal"
            data-bs-target="#agregarClienteJuridicoModal">
    </div>
    `;
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CLIENTES_CARDS_CONTAINER.innerHTML += `
            <!--Card del Cliente -->
            <div class="cliente-card card" onclick="gotoDetail()">
                <div class="content z-3">
                    <h4 class="open-sans-light-italic">Màs informaciòn</h4>
                </div>
                <div class="container-img-card">
                    <img src="../../recursos/imagenes/img_clientes/personas.png">
                </div>
                <div class="container-info-card position-relative p-3 justify-content-center align-items-center">
                    <div class="line-red-split position-absolute"></div>
                    <div class="d-flex flex-column">
                        <h5 class="m-0 p-0 open-sans-bold text-black text-start">${row.nombres_cliente} ${row.apellidos_cliente}</h5>
                        <p class="open-sans-light-italic m-0 p-0 text-start clrGry1">cliente ${row.id_cliente}</p>
                    </div>
                    <div class="info-row-2 d-flex gap-5">
                        <div class="d-flex flex-column position-relative">
                            <div class="line-red-split-2 position-absolute"></div>
                            <h6 class="m-0 p-0 open-sans-bold text-black text-start">DUI</h6>
                            <p class="open-sans-light m-0 p-0 text-start clrGry1">${row.dui_cliente}</p>
                        </div>
                        <div class="d-flex flex-column">
                            <h6 class="m-0 p-0 open-sans-bold text-black text-start">Teléfono</h6>
                            <p class="open-sans-light m-0 p-0 text-start clrGry1">${row.telefono_cliente}</p>
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
const openCloseJuridico = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
    if (RESPONSE.isConfirmed) {
        MODAL_JURIDICO.hide();
    }
}

// Funcion para ir hacia la pagina de detalles del automovil
function gotoDetail() {
    location.href = "../../vistas/privado/cliente_juridica.html";
}

// Funcion que hace el efecto de rotacion en la flecha de cada elemento de los filtros
function rotarImagen(idImagen) {
    var imagen = document.getElementById(idImagen);
    if (!imagen.classList.contains('rotacion-90')) {
        imagen.classList.add('rotacion-90');
    } else {
        imagen.classList.remove('rotacion-90');
    }
}

function getDateTime() {
    // Crear un nuevo objeto Date para obtener la fecha y hora actual
    let fechaHoraActual = new Date();

    // Formatear la fecha y hora en el formato adecuado para MySQL (YYYY-MM-DD HH:MM:SS)
    let fechaHoraMySQL = fechaHoraActual.getFullYear() + '-' +
        ('0' + (fechaHoraActual.getMonth() + 1)).slice(-2) + '-' +
        ('0' + fechaHoraActual.getDate()).slice(-2) + ' ' +
        ('0' + fechaHoraActual.getHours()).slice(-2) + ':' +
        ('0' + fechaHoraActual.getMinutes()).slice(-2) + ':' +
        ('0' + fechaHoraActual.getSeconds()).slice(-2);

    // Mostrar la fecha y hora formateada en la consola
    console.log(fechaHoraMySQL);
    return fechaHoraActual;
}

//----------------------------VALIDACIONES-----------------

document.getElementById('input_nrc').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Asegurar que el texto no supere los 11 caracteres
    inputValue = inputValue.slice(0, 11);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

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