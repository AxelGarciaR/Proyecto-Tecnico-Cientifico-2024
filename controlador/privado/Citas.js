
var cardContainers = document.getElementsByClassName("cardContainer");

for (var i = 0; i < cardContainers.length; i++) {
    cardContainers[i].addEventListener("click", function () {
        var detalles = document.getElementById("containerExpand");
        detalles.style.display = "block";
    });
}

// Agregar event listener al botón finalizarCita
document.getElementById("finalizarCita").addEventListener("click", function () {
    // Ocultar el contenedor containerExpand
    var detalles = document.getElementById("containerExpand");
    detalles.style.display = "none";


});


//JS modal

// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("btnRevisarFactura");
var span = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar el modal cuando se hace clic en la "x"
span.onclick = function() {
  modal.style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

