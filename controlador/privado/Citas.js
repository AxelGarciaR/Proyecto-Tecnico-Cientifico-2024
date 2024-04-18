
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

// Abre el agregar cita
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var detalles = document.getElementById("containerExpandAgregar");
  detalles.style.display = "block";


});

// Abre los servicios en proceso
document.getElementById("btnRevisarServicio").addEventListener("click", function () {
  // Mostrar el contenedor containerExpand
  var detalles = document.getElementById("containerExpandServicios");
  detalles.style.display = "block";

  var detallesExpand = document.getElementById("containerExpand");
  detallesExpand.style.display = "none";
});

document.getElementById("btnRegresar").addEventListener("click", function () {
  // Mostrar el contenedor containerExpand
  var detallesServicios = document.getElementById("containerExpandServicios");
  detallesServicios.style.display = "none";

  var detallesExpand = document.getElementById("containerExpand");
  detallesExpand.style.display = "block";
});



// Agregar event listener al botón finalizarCita
document.getElementById("finalizarCita").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var detalles = document.getElementById("containerExpand");
  detalles.style.display = "none";


});

document.getElementById("Cerrar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var detalles = document.getElementById("containerExpandAgregar");
  detalles.style.display = "none";


});

//Js para abrir y cerrar la ventana de las cards de servicios
// Obtener todos los elementos con la clase "cardServicio"
const cardsServicio = document.querySelectorAll('.cardServicio');

// Iterar sobre cada elemento cardServicio
cardsServicio.forEach((cardServicio) => {
  // Obtener el div "contenidoSer" correspondiente a la cardServicio actual
  const contenidoSer = cardServicio.querySelector('.contenidoSer');

  // Agregar un evento "mouseover" a la cardServicio actual
  cardServicio.addEventListener('mouseover', () => {
    contenidoSer.style.display = 'block';
  });

  // Agregar un evento "mouseout" a la cardServicio actual
  cardServicio.addEventListener('mouseout', () => {
    contenidoSer.style.display = 'none';
  });
});


//JS modal

// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("btnRevisarFactura");
var span = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function () {
  modal.style.display = "block";
}

// Cerrar el modal cuando se hace clic en la "x"
span.onclick = function () {
  modal.style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera del modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Obtener referencia a la imagen con el ID "btnAgregarServicio"
const btnAgregarServicio = document.getElementById('btnAgregarServicio');
var spanServicio = document.getElementsByClassName("closeServicios")[0];

// Obtener referencia al modal con el ID "modalServicios"
const modalServicios = document.getElementById('modalServicios');

spanServicio.onclick = function () {
  modalServicios.style.display = "none";
}

// Agregar un evento "click" a la imagen
btnAgregarServicio.addEventListener('click', () => {
  // Mostrar el modal
  modalServicios.style.display = 'block';
});

/**Aqui empieza el tipado de datos**/

/**Funcion para solo letras**/
function soloLetras(event) {
  var inputChar = String.fromCharCode(event.keyCode);
  var soloLetras = /^[a-zA-Z\s]*$/; // Expresión regular para letras y espacios

  if (!soloLetras.test(inputChar)) {
    event.preventDefault();
    return false;
  }
  return true;
}

/**Funcion para solo numeros**/
function soloNumeros(event) {
  var inputChar = String.fromCharCode(event.keyCode);
  var soloNumeros = /^[0-9]*$/; // Expresión regular para números

  if (!soloNumeros.test(inputChar)) {
    event.preventDefault();
    return false;
  }
  return true;
}

