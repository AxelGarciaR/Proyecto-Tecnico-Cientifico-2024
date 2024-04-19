//Abrir modal de citas
document.getElementById("btnAgregarSer").addEventListener("click", function () {
    // Ocultar el contenedor containerExpand
    var AgregarSerB = document.getElementById("modalAServicios");
    AgregarSerB.style.display = "block";
  
  });
  
  // Obtener el primer elemento con la clase closeServiciosA
  var closeButton = document.getElementsByClassName("closeAServicios")[0];
  
  // Agregar el evento de clic al botón de cierre
  closeButton.addEventListener("click", function () {
      // Ocultar el contenedor modalAgregarServicio
      var AgregarSerB = document.getElementById("modalAServicios");
      AgregarSerB.style.display = "none";
  });