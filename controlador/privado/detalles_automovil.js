// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#staticBackdrop2');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

function goBack() {
    window.history.back();
}

function gotoDetailsServ() {
    location.href = '../../vistas/privado/detalles_servicios_automovil.html'
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
    sweetAlert(1,'Se ha actualizado con éxito', 300);
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