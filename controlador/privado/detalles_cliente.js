// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/privado/cliente.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    //fillData();
});

/*
*   Función asíncrona para llenar el contenedor de los clientes con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillData = async () => {
    DATA_CONTAINER.innerHTML = '';
    const DATA = await fetchData(CLIENTES_API, 'readAll');

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            DATA_CONTAINER.innerHTML = '';
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}


// *Funcion para ir a los detalles del automovil
function gotoDetailsCar() {
    location.href = "../../vistas/privado/detalles_automovil.html";
}
// *Funcion para ir a la pagina anterior
function goBack() {
    window.history.back();
}
