// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a la función para cargar el template
    loadTemplate();

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

    // Obtener el input del nombre del servicio
    const nombreServicioInput = document.getElementById('exampleInputEmail1');

    // Agregar un evento de teclado al input del nombre del servicio
    nombreServicioInput.addEventListener('keydown', function(event) {
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

    // Agregar un evento de entrada al input para verificar el límite de caracteres del nombre del servicio
    nombreServicioInput.addEventListener('input', function(event) {
        // Obtener el valor actual del input
        const currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Obtener el input de la descripción del servicio
    const descripcionServicioInput = document.getElementById('exampleInputPassword1');

    // Agregar un evento de teclado al input de la descripción del servicio
    descripcionServicioInput.addEventListener('keydown', function(event) {
        // Verificar si la longitud actual del texto excede 50 caracteres
        if (event.target.value.length >= 50) {
            // Prevenir la entrada de texto si ya se alcanzó el límite de caracteres
            event.preventDefault();
        }
    });
});

function goBack() {
    window.history.back();
}
