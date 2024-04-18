// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#agregarCategoriaModal');

// Método del evento para cuando el documento ha cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el input del nombre de la categoría
    const nombreCategoriaInput = document.getElementById('nombreCategoria');

    // Agregar un evento de teclado al input
    nombreCategoriaInput.addEventListener('keydown', function (event) {
        // Obtener el código de la tecla presionada
        const keyCode = event.keyCode || event.which;

        // Permitir retroceder (Backspace), eliminar (Delete) y mover el cursor (Flechas)
        if (keyCode === 8 || keyCode === 46 || (keyCode >= 37 && keyCode <= 40)) {
            return; // Permitir estas teclas sin restricciones
        }

        // Verificar si la tecla presionada es una letra
        const isLetter = /^[A-Za-z]$/.test(event.key);

        // Si la tecla no es una letra, prevenir la acción predeterminada
        if (!isLetter) {
            event.preventDefault();
        }
    });

    // Agregar un evento de entrada al input para verificar el límite de caracteres
    nombreCategoriaInput.addEventListener('input', function (event) {
        // Obtener el valor actual del input
        const currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Llama a la función para cargar el template
    loadTemplate();

});

// Función para mostrar la advertencia de éxito y cerrar el modal
function showSuccessAlert() {
    // Cierra el modal
    $('#agregarCategoriaModal').modal('hide');

    // Muestra la advertencia de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La categoría se ha agregado correctamente.',
        confirmButtonColor: '#dc3545', // Color rojo para el botón de cerrar
        confirmButtonText: 'Cerrar' // Texto del botón de cerrar
    });
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
    sweetAlert(1,'Se ha guardado con exito', 300);
    MODAL.hide();
}
