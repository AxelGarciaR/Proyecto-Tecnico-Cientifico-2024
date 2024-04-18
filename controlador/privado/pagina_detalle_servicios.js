// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Resto del código...
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
    nombreServicioInput.addEventListener('input', function(event) {
        // Obtener el valor actual del input
        let currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Permitir borrar pero no ingresar números en el campo de nombre del servicio
    nombreServicioInput.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        const keyCode = event.keyCode || event.which;

        // Permitir retroceder (Backspace) y eliminar (Delete)
        if (keyCode === 8 || keyCode === 46) {
            return; // Permitir estas teclas sin restricciones
        }

        // Verificar si la tecla presionada es un número
        const isNumber = /^[0-9]$/.test(event.key);

        // Si la tecla es un número, prevenir la acción predeterminada
        if (isNumber) {
            event.preventDefault();
        }
    });

    // Obtener el input de la descripción del servicio
    const descripcionServicioInput = document.getElementById('exampleInputPassword1');

    // Agregar un evento de teclado al input de la descripción del servicio
    descripcionServicioInput.addEventListener('input', function(event) {
        // Obtener el valor actual del input
        let currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Permitir borrar pero no ingresar números en el campo de descripción del servicio
    descripcionServicioInput.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        const keyCode = event.keyCode || event.which;

        // Permitir retroceder (Backspace) y eliminar (Delete)
        if (keyCode === 8 || keyCode === 46) {
            return; // Permitir estas teclas sin restricciones
        }

        // Verificar si la tecla presionada es un número
        const isNumber = /^[0-9]$/.test(event.key);

        // Si la tecla es un número, prevenir la acción predeterminada
        if (isNumber) {
            event.preventDefault();
        }
    });
});
