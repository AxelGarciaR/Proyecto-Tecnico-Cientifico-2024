// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/privado/cliente.php';

// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#agregarClienteModal');
// Constantes para establecer los elementos de la card de clientes.
const CLIENTES_JURIDICO_CONTAINER = document.getElementById('clientesJuridicoContainer');
const CLIENTES_NATURAL_CONTAINER = document.getElementById('clientesNaturalContainer');
const ADD_FORM = document.getElementById('addForm');

const PERSONA_NATURAL_DIV = document.getElementById('personaNatural');
const PERSONA_JURIDICA_DIV = document.getElementById('personaJuridica');
const RUBRO_COMERCIAL_DIV = document.getElementById('rubro_comercial');
const NRC_DIV = document.getElementById('nrc');
const NRF_DIV = document.getElementById('nrf');

// Constantes de cada campo del formulario
const DUI = document.getElementById('input_dui'),
    NIT = document.getElementById('input_nit'),
    TELEFONO = document.getElementById('input_telefono'),
    NRC = document.getElementById('input_nrc'),
    NRF = document.getElementById('input_nrf'),
    DEPARTAMENTO = document.getElementById('input_departamento'),
    NOMBRES = document.getElementById('input_nombre'),
    APELLIDOS = document.getElementById('input_apellido'),
    CORREO = document.getElementById('input_correo'),
    RUBRO_COMERCIAL = document.getElementById('input_rubro_comercial');

let TIPO_CLIENTE;

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    // Selecciona la primera pestaña y la muestra.
    var primeraPestana = document.querySelector('#personaNatural-tab');
    if (primeraPestana) {
        primeraPestana.click();
        // Muestra el div de la tabla y oculta el div de agregar.
        PERSONA_NATURAL_DIV.classList.remove('d-none');
        PERSONA_JURIDICA_DIV.classList.add('d-none');
    }

});

const checkFormValidity = form => {
    const validities = [];
    Array.from(form.elements).forEach(element => {
        // Verificar si el campo está visible
        const isVisible = !element.classList.contains('d-none');
        // Verificar si el campo es un elemento de formulario (input, select, textarea)
        const isFormElement = ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);

        if (isVisible && isFormElement) {
            validities.push(element.checkValidity());
            console.log(`Elemento: ${element.id}, Validez: ${element.checkValidity()}, Mensaje de error: ${element.validationMessage}`);
        }
    });

    return validities.every(valid => valid); // Retorna true si todos los elementos son válidos.
};

const addSave = async () => {
    const isValid = await checkFormValidity(ADD_FORM);
    if (isValid) {
        console.log('TodoGud'); // Código a ejecutar después de la validación
        /* Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(ADD_FORM);
        FORM.append('fecha_registro', getDateTime());
        FORM.append('tipo_cliente', TIPO_CLIENTE);

        // Petición para guardar los datos del formulario.
        const DATA = await fetchData(CLIENTES_API, 'createRow', FORM);

        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, 'Se ha guardado con éxito', 300);
            fillData();
            MODAL.hide();
            resetForm(); // Resetea el formulario
            ADD_FORM.classList.remove('was-validated'); // Quita la clase de validación
        } else {
            await sweetAlert(2, DATA.error, false);
        }*/
    } else {
        console.log('Que paso?: Formulario no válido');
    }
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

/*
*   Función asíncrona para llenar el contenedor de los clientes con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillData = async () => {
    // Lógica para mostrar clientes naturales o jurídicos
    if (TIPO_CLIENTE == 'Persona natural') {
        CLIENTES_NATURAL_CONTAINER.innerHTML = '';
        const FORM2 = new FormData();
        FORM2.append('tipo_persona', TIPO_CLIENTE);
        const DATA2 = await fetchData(CLIENTES_API, 'readAll', FORM2);

        createCardAdd(CLIENTES_NATURAL_CONTAINER);

        if (DATA2.status) {
            DATA2.dataset.forEach(row => {
                CLIENTES_NATURAL_CONTAINER.innerHTML += createCardCliente(row);
            });
        } else {
            sweetAlert(4, DATA2.error, true);
        }
    } else {
        CLIENTES_JURIDICO_CONTAINER.innerHTML = '';
        const FORM1 = new FormData();
        FORM1.append('tipo_persona', TIPO_CLIENTE);
        const DATA1 = await fetchData(CLIENTES_API, 'readAll', FORM1);

        createCardAdd(CLIENTES_JURIDICO_CONTAINER);

        if (DATA1.status) {
            DATA1.dataset.forEach(row => {
                CLIENTES_JURIDICO_CONTAINER.innerHTML += createCardCliente(row);
            });
        } else {
            sweetAlert(4, DATA1.error, true);
        }
    }
}

// Función para generar el HTML de cada cliente
function createCardCliente(row) {
    return `
        <!--Card del Cliente -->
        <div class="cliente-card card" onclick="gotoDetail(${row.id_cliente})">
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
}

// Función para agregar la card de agregar cliente
function createCardAdd(container) {
    container.innerHTML += `
        <!--Contenedor de la primera card - card de agregar automovil-->
        <div class="add-cliente-card d-flex align-items-center justify-content-center">
            <img src="../../recursos/imagenes/icons/add.svg" class="hvr-grow" data-bs-toggle="modal"
                data-bs-target="#agregarClienteModal">
        </div>
    `;
}

// Función para mostrar el div de agregar trabajador y ocultar el div de la tabla.
function showPersonaNatural(boton) {
    TIPO_CLIENTE = 'Persona natural';
    fillData();
    PERSONA_NATURAL_DIV.classList.remove('d-none');
    PERSONA_JURIDICA_DIV.classList.add('d-none');
    RUBRO_COMERCIAL_DIV.classList.add('d-none');
    RUBRO_COMERCIAL.classList.add('d-none');
    NRC_DIV.classList.add('d-none');
    NRC.classList.add('d-none');
    NRF_DIV.classList.add('d-none');
    NRF.classList.add('d-none');
    resetForm();
    updateButtonColors(boton);
}

// Función para mostrar el div de la tabla y ocultar el div de agregar trabajador.
function showPersonaJuridica(boton) {
    TIPO_CLIENTE = 'Persona juridica';
    fillData();
    PERSONA_JURIDICA_DIV.classList.remove('d-none');
    PERSONA_NATURAL_DIV.classList.add('d-none');
    RUBRO_COMERCIAL_DIV.classList.remove('d-none');
    RUBRO_COMERCIAL.classList.remove('d-none');
    NRC_DIV.classList.remove('d-none');
    NRC.classList.remove('d-none');
    NRF_DIV.classList.remove('d-none');
    NRF.classList.remove('d-none');
    resetForm();
    updateButtonColors(boton);
}

//Funcion que muestra la alerta de confirmacion
const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
    if (RESPONSE.isConfirmed) {
        MODAL.hide();
        resetForm();
    }
}

// Funcion para ir hacia la pagina de detalles del automovil
function gotoDetail(idCliente) {
    location.href = `../../vistas/privado/detalles_cliente.html?id_cliente=${idCliente}`;
}


function resetForm() {
    // Resetea el formulario y los mensajes de validación
    ADD_FORM.reset(); // Resetea el formulario
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
    return fechaHoraMySQL;
}

// Función para cambiar el color de los botones según el que se haya clicado.
function updateButtonColors(boton) {
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = 'white';
        b.style.color = 'black';
        b.style.borderBottom = '0px solid red';
        b.style.border = '0px';
    });
    boton.style.backgroundColor = 'white';
    boton.style.color = 'black';
    boton.style.borderBottom = '3px solid red';
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

    // Eliminar caracteres que no sean letras, espacios o tildes
    inputValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

document.getElementById('input_apellido').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras, espacios o tildes
    inputValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '');

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