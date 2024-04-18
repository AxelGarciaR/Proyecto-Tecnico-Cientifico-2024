// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

function goBack() {
    window.history.back();
}

// Obtener el botón "Aceptar" del modal
const aceptarBtn = document.querySelector('#exampleModal .modal-body .btn-danger');

// Agregar un evento clic al botón "Aceptar"
aceptarBtn.addEventListener('click', function () {
    // Mostrar la alerta cuando se hace clic en el botón "Aceptar"
    Swal.fire({
        icon: 'success',
        title: '¡Servicio agregado con éxito!',
        showConfirmButton: false,
        timer: 1500
    }).then((result) => {
        // Cierra el modal después de que se muestra la alerta
        $('#exampleModal').modal('hide');
    });
});
