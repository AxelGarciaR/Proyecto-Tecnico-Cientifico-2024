
//Constante donde esta la ruta del archivo php
const TRABAJADORES_API = 'services/privado/trabajadores.php';

// Constante para establecer el cuerpo de la tabla.
const CONTAINER_TRABAJADORES_BODY = document.getElementById('cardsTrabajadores');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#staticBackdrop');


// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    DUI = document.getElementById('dui'),
    NIT = document.getElementById('nit'),
    NOMBRES = document.getElementById('nombres'),
    APELLIDOS = document.getElementById('apellidos'),
    TELEFONO = document.getElementById('telefono'),
    CORREO = document.getElementById('correo'),
    DEPARTAMENTO = document.getElementById('departamento'),
    ESPECIALIZACION = document.getElementById('especializacion'),
    FECHA = document.getElementById('fecha'),
    SALARIO = document.getElementById('salario');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    readTrabajadores();
});
/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

// Método del evento para cuando se envía el formulario de buscar.
document.getElementById('searchForm').addEventListener('submit', async (event) => {

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const formData = new FormData(document.getElementById('searchForm'));

    try {
        // Realizar una solicitud al servidor para buscar productos.
        const searchData = await fetchData(TRABAJADORES_API, 'searchRows', formData);

        // Verificar si la búsqueda fue exitosa.
        if (searchData.status) {
            // Limpiar el contenedor de productos.
            CONTAINER_TRABAJADORES_BODY.innerHTML = '';

            CONTAINER_TRABAJADORES_BODY.innerHTML += `
            <div class="add-auto-card d-flex align-items-center justify-content-center" class="agregar">
                            <img src="../../recursos/imagenes/icons/agregar_cliente.png" class="hvr-grow"
                                onclick="openCreate()">
                        </div>
            `;

            // Verificar si se encontraron resultados.
            if (searchData.dataset.length > 0) {
                // Iterar sobre los resultados y mostrarlos en la vista.
                searchData.dataset.forEach(row => {
                    CONTAINER_TRABAJADORES_BODY.innerHTML += `
                        <div class="auto-card card" onclick="gotoDetail()"> <!--Card de empleados #1-->
                        <div class="content z-3">
                            <h4 class="open-sans-light-italic">Más información</h4> <!--Boton de mas informacion-->
                        </div>
                        <div class="container-img-card"> <!--Imagen de la empresa-->
                            <h1>DARG</h1> <!--Nombre de la empresa-->
                            <img src="../../recursos/imagenes/img_empleados/fondo_cliente.png">
                        </div>
                        <div class="container-img-card2"> <!--Imagen del empleado-->
                            <img src="../../recursos/imagenes/img_empleados/empleado.png">
                            <h1 class=" align-items-center justify-content-center">${row.nombres_trabajador} ${row.apellidos_trabajador}</h1>
                            <!--Nombre del empleado-->
                            <h3 class="">${row.dui_trabajador}</h3> <!--DUI-->
                            <h4 class="">${row.correo_trabajador}</h4> <!--Correo-->
                            <h4 class="">${row.telefono_trabajador}</h4> <!--Telefono-->
                        </div>
                        <div class="container-img-card3"> <!--Logo de la empresa-->
                            <img src="../../recursos/imagenes/img_empleados/logo.png">
                            <h2>${row.nombre_especializacion_trabajador}</h2> <!--Especialización del empleado-->
                        </div>
                        <div class="container-info-card"> <!--Informacion adicional-->
                        </div>
                    </div>
                        `;
                });
            } else {
                // Mostrar un mensaje si no se encontraron resultados.
                PRODUCTOS.innerHTML = '<p>No se encontraron trabajadores.</p>';
            }
        } else {
            // Mostrar un mensaje si ocurrió un error durante la búsqueda.
            console.error('Error al buscar trabajadores:', searchData.error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas.
        }
    } catch (error) {
        console.error('Error al buscar trabajadores:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas.
    }
});


//Método para hacer el select a la base de los trabajadores disponibles
async function readTrabajadores() {
    // Petición para obtener los datos del pedido en proceso.
    const DATA = await fetchData(TRABAJADORES_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CONTAINER_TRABAJADORES_BODY.innerHTML += `
            <div class="auto-card card" onclick="gotoDetail()"> <!--Card de empleados #1-->
            <div class="content z-3">
                <h4 class="open-sans-light-italic">Más información</h4> <!--Boton de mas informacion-->
            </div>
            <div class="container-img-card"> <!--Imagen de la empresa-->
                <h1>DARG</h1> <!--Nombre de la empresa-->
                <img src="../../recursos/imagenes/img_empleados/fondo_cliente.png">
            </div>
            <div class="container-img-card2"> <!--Imagen del empleado-->
                <img src="../../recursos/imagenes/img_empleados/empleado.png">
                <h1 class=" align-items-center justify-content-center">${row.nombres_trabajador} ${row.apellidos_trabajador}</h1>
                <!--Nombre del empleado-->
                <h3 class=""> Dui: ${row.dui_trabajador}</h3> <!--DUI-->
                <h4 class=""> Correo: ${row.correo_trabajador}</h4> <!--Correo-->
                <h4 class=""> Tel: ${row.telefono_trabajador}</h4> <!--Telefono-->
            </div>
            <div class="container-img-card3"> <!--Logo de la empresa-->
                <img src="../../recursos/imagenes/img_empleados/logo.png">
                <h2>${row.nombre_especializacion_trabajador}</h2> <!--Especialización del empleado-->
            </div>
            <div class="container-info-card"> <!--Informacion adicional-->
            </div>
        </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, false);
    }
}



const openSave = () => {
    sweetAlert(1, "Guardado exitosamente", false);
    SAVE_MODAL.hide();
}

var number = 1;

const openClose = async () => {
    if (number == 1) {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
        if (RESPONSE.isConfirmed) {
            SAVE_MODAL.hide();
        }
    }
    else {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction2('¿Seguro qué quieres eliminar al empleado?', 'No podras deshacer la acción');
        if (RESPONSE.isConfirmed) {
            SAVE_MODAL.hide();
        }
    }

}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    number = 1;
    // Actualizar texto de los botones
    document.getElementById('btnUno').innerText = 'Cancelar';
    document.getElementById('btnDos').innerText = 'Guardar';
}

function gotoDetail() {
    const lista_datos = [
        {
            dui: '12345678-9',
            nit: '657-390',
            nombres: 'Axel Gabriel',
            apellidos: 'García Ramos',
            telefono: '1234-5678',
            correo: 'axel@gmail.com',
            departamento: 'Departamento 1',
            especializacion: 'Jefe',
            fecha: '2022-02-09',
            salario: '$2000.00',
        }
    ];

    SAVE_MODAL.show();
    number = 2;
    // Mostrar materiales de respaldo
    lista_datos.forEach(ROW => {
        DUI.value = ROW.dui;
        NIT.value = ROW.nit;
        NOMBRES.value = ROW.nombres;
        APELLIDOS.value = ROW.apellidos;
        TELEFONO.value = ROW.telefono;
        CORREO.value = ROW.correo;
        DEPARTAMENTO.value = ROW.departamento;
        ESPECIALIZACION.value = ROW.especializacion;
        FECHA.value = ROW.fecha;
        SALARIO.value = ROW.salario;
    });

    // Actualizar texto de los botones
    document.getElementById('btnUno').innerText = 'Eliminar';
    document.getElementById('btnDos').innerText = 'Actualizar';
}

// Función para mostrar la imagen seleccionada en un elemento de imagen.
function displaySelectedImage(event, elementId) {
    // Obtiene el elemento de imagen según su ID.
    const selectedImage = document.getElementById(elementId);
    // Obtiene el elemento de entrada de archivo del evento.
    const fileInput = event.target;

    // Verifica si hay archivos seleccionados y al menos uno.
    if (fileInput.files && fileInput.files[0]) {
        // Crea una instancia de FileReader para leer el contenido del archivo.
        const reader = new FileReader();

        // Define el evento que se ejecutará cuando la lectura sea exitosa.
        reader.onload = function (e) {
            // Establece la fuente de la imagen como el resultado de la lectura (base64).
            selectedImage.src = e.target.result;
        };

        // Inicia la lectura del contenido del archivo como una URL de datos.
        reader.readAsDataURL(fileInput.files[0]);
    }
}


document.getElementById('dui').addEventListener('input', function (event) {
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

document.getElementById('nit').addEventListener('input', function (event) {
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

document.getElementById('nombres').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras o espacios
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

document.getElementById('apellidos').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras o espacios
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
});

document.getElementById('telefono').addEventListener('input', function (event) {
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

document.getElementById('correo').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar espacios en blanco
    inputValue = inputValue.replace(/\s/g, '');

    // Asegurar que el correo electrónico no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada limitada
    event.target.value = inputValue;
});

document.getElementById('salario').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar los espacios en blanco
    inputValue = inputValue.replace(/\s/g, '');

    // Reemplazar cualquier caracter que no sea número, coma o punto con una cadena vacía
    inputValue = inputValue.replace(/[^\d,.]/g, '');

    // Actualizar el valor del campo de texto con la entrada limitada
    event.target.value = inputValue;

    // Validar y agregar la clase 'invalid' si es necesario
    event.target.classList.toggle('invalid', !/^[\d.,]*$/.test(inputValue));
});

