// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});



// *Funcion para ir a los detalles del automovil
function gotoDetailsCar() {
    location.href = "../../vistas/privado/detalles_automovil.html";
}
// *Funcion para ir a la pagina anterior
function goBack() {
    window.history.back();
}
