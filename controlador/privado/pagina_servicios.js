// Método del evento para cuando el documento ha cargado
document.addEventListener('DOMContentLoaded', async () => {
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

