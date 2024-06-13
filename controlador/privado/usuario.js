//Llamada al php donde se encuentra el metodo
const USER_API = 'services/privado/usuarios.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán actualizados');
    if (RESPONSE.isConfirmed) {
       location.href = '../../vistas/privado/panel_principal.html';
    }
}

const openNoti = async () => {
    // Llamada a la función para mostrar una notificación
    sweetAlert(1, 'Se ha actualizado con exito', 300);
}

const openLogout = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction2('¿Está seguro de cerrar la sesión?');;
    if (RESPONSE.isConfirmed) {
       location.href = '../../vistas/privado/index.html';
    }


}
