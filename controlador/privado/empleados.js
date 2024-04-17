
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#staticBackdrop');

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

const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el administrador de forma permanente?');
    console.log('Resultado de la confirmación:', RESPONSE);
    if (RESPONSE === true) {
        SAVE_MODAL.hide();
    }
}

function gotoDetail() {
    location.href = "../../vistas/privado/detalles_automovil.html";
}