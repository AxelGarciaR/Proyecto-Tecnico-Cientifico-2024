// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

// página_servicios.js

// Función para mostrar la advertencia de éxito
function showSuccessAlert() {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La categoría se ha agregado correctamente.',
        showConfirmButton: false // Oculta el botón de confirmación
    });
}