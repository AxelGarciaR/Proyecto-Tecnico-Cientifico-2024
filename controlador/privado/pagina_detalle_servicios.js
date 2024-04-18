// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#exampleModal');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    // Llama a la función para cargar el template
    loadTemplate();

    // Obtener el input del nombre del servicio
    const nombreServicioInput = document.getElementById('exampleInputEmail1');

    // Agregar un evento de teclado al input del nombre del servicio
    nombreServicioInput.addEventListener('input', function (event) {
        // Obtener el valor actual del input
        let currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Permitir borrar pero no ingresar números en el campo de nombre del servicio
    nombreServicioInput.addEventListener('keydown', function (event) {
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
    descripcionServicioInput.addEventListener('input', function (event) {
        // Obtener el valor actual del input
        let currentValue = event.target.value;

        // Verificar si la longitud del valor actual excede 50 caracteres
        if (currentValue.length > 50) {
            // Establecer el valor del input al substring de los primeros 50 caracteres
            event.target.value = currentValue.slice(0, 50);
        }
    });

    // Permitir borrar pero no ingresar números en el campo de descripción del servicio
    descripcionServicioInput.addEventListener('keydown', function (event) {
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

function goBack() {
    window.history.back();
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
