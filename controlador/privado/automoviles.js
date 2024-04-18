const MODELOS_CONTAINER = document.getElementById('contenedor-modelos');
const MARCAS_CONTAINER = document.getElementById('contenedor-marcas');

const BUSCAR_MODELOS = document.getElementById('btnBuscarModelos');
const REGRESAR_MARCAS = document.getElementById('btnReturn');

// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#staticBackdrop');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

function rotarImagen(idImagen) {
    var imagen = document.getElementById(idImagen);
    if (!imagen.classList.contains('rotacion-90')) {
        imagen.classList.add('rotacion-90');
    } else {
        imagen.classList.remove('rotacion-90');
    }
}

function showModelos() {
    MODELOS_CONTAINER.classList.remove('d-none');
    MARCAS_CONTAINER.classList.add('d-none');

    BUSCAR_MODELOS.classList.add('d-none');
    REGRESAR_MARCAS.classList.remove('d-none');
}

function showMarcas() {
    MODELOS_CONTAINER.classList.add('d-none');
    MARCAS_CONTAINER.classList.remove('d-none');

    BUSCAR_MODELOS.classList.remove('d-none');
    REGRESAR_MARCAS.classList.add('d-none');
}

$('#datepicker-desde').datepicker({
    uiLibrary: 'bootstrap5'
});
$('#datepicker-hasta').datepicker({
    uiLibrary: 'bootstrap5'
});

$('#datepicker-desdeRE').datepicker({
    uiLibrary: 'bootstrap5'
});
$('#datepicker-hastaRE').datepicker({
    uiLibrary: 'bootstrap5'
});

function gotoDetail() {
    location.href = "../../vistas/privado/detalles_automovil.html";
}

const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
    if (RESPONSE.isConfirmed) {
        MODAL.hide();
    }
}

const openNoti = async () => {
    // Llamada a la función para mostrar una notificación
    sweetAlert(1, 'Se ha guardado con exito', 300);
    MODAL.hide();
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

document.getElementById('input_placa').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número ni una letra
    inputValue = inputValue.replace(/[^A-Za-z0-9]/g, '');

    // Limitar la longitud máxima a 8 caracteres
    inputValue = inputValue.slice(0, 7);

    // Formatear el texto como "11a1-111"
    let formattedValue = '';

    if (inputValue.length > 4) {
        formattedValue += inputValue.slice(0, 4) + '-';
        inputValue = inputValue.slice(4);
    }

    // Agregar el último grupo de dígitos
    if (inputValue.length > 0) {
        formattedValue += inputValue;
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = formattedValue;

    // Validar y agregar la clase 'invalid' si es necesario
    event.target.classList.toggle('invalid', !/^\d{4}-\d{2}-\d{2}$/.test(formattedValue));
});

document.getElementById('input_duiP').addEventListener('input', function (event) {
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