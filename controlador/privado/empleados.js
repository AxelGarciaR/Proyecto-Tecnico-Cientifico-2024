
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
});
/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
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

