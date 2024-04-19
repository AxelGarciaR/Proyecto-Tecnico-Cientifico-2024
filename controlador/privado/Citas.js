
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
  var verFacturas = document.getElementById("myModal");
  verFacturas.style.display = "block"; 
});

var closeButtonElements = document.getElementsByClassName("close");

// Iterar sobre la colección de elementos y agregar el evento de clic a cada uno
for (var i = 0; i < closeButtonElements.length; i++) {
    closeButtonElements[i].addEventListener("click", function () {
        // Ocultar el contenedor modal
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    });
}



// Abre el agregar cita closeServiciosA
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

});

// Obtener el primer elemento con la clase closeServiciosA
var closeButton = document.getElementsByClassName("closeServiciosA")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
    // Ocultar el contenedor modalAgregarServicio
    var modalAgregarServicio = document.getElementById("modalAgregarServicio");
    modalAgregarServicio.style.display = "none";
});

//Abrir modal de citas
document.getElementById("btnAgregarServicio").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSerA = document.getElementById("modalAgregarCita");
  AgregarSerA.style.display = "block";

});

// Obtener el primer elemento con la clase closeServiciosA
var closeButton = document.getElementsByClassName("closeServiciosB")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
    // Ocultar el contenedor modalAgregarServicio
    var modalAgregarServicio = document.getElementById("modalAgregarCita");
    modalAgregarServicio.style.display = "none";
});


//Abre Agregar cita
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

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

// Obtener el primer elemento con la clase closeServiciosA
var closeButton = document.getElementsByClassName("close")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
    // Ocultar el contenedor modalAgregarServicio
    var RevisarFac = document.getElementById("myModal");
    RevisarFac.style.display = "none";
});



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

