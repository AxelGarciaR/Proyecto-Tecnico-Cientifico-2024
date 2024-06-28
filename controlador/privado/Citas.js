
var cardContainers = document.getElementsByClassName("card");

for (var i = 0; i < cardContainers.length; i++) {
  cardContainers[i].addEventListener("click", function () {
    var detalles = document.getElementById("containerExpand");
    detalles.style.display = "block";
  });
}

document.getElementById("cerrarCitas").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var cerrarCita = document.getElementById("containerExpand");
  cerrarCita.style.display = "none";
});

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

document.addEventListener('DOMContentLoaded', async () => {

  /**********************Validaciones detalles citas**********************/
  document.getElementById('inputHoraEntradaD').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

  document.getElementById('inputDireccion').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Eliminar caracteres que no sean letras o espacios
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Asegurar que el texto no supere los 50 caracteres
    inputValue = inputValue.slice(0, 50);

    // Actualizar el valor del campo de texto con la entrada validada
    event.target.value = inputValue;
  });

  document.getElementById('inputHoraSalida').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

  document.getElementById('inputPlacaAutomovilD').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número ni una letra
    inputValue = inputValue.replace(/[^A-Za-z0-9]/g, '');

    // Limitar la longitud máxima a 8 caracteres
    inputValue = inputValue.slice(0, 7);

    // Formatear el texto como "11a1-111"
    let formattedValue = '';

    if (inputValue.length > 4) {
      formattedValue += inputValue.slice(0, 4) + '-';
      inputValue = inputValue.slice(4);
    }

    // Agregar el último grupo de dígitos
    if (inputValue.length > 0) {
      formattedValue += inputValue;
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = formattedValue;

    // Validar y agregar la clase 'invalid' si es necesario
    event.target.classList.toggle('invalid', !/^\d{4}-\d{2}-\d{2}$/.test(formattedValue));
  });


  /************Agregar Servicios*************/

  document.getElementById('inputPlacaAutomovilA').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número ni una letra
    inputValue = inputValue.replace(/[^A-Za-z0-9]/g, '');

    // Limitar la longitud máxima a 8 caracteres
    inputValue = inputValue.slice(0, 7);

    // Formatear el texto como "11a1-111"
    let formattedValue = '';

    if (inputValue.length > 4) {
      formattedValue += inputValue.slice(0, 4) + '-';
      inputValue = inputValue.slice(4);
    }

    // Agregar el último grupo de dígitos
    if (inputValue.length > 0) {
      formattedValue += inputValue;
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = formattedValue;

    // Validar y agregar la clase 'invalid' si es necesario
    event.target.classList.toggle('invalid', !/^\d{4}-\d{2}-\d{2}$/.test(formattedValue));
  });

  document.getElementById('inputHoraAproxFin').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

  document.getElementById('inputHoraFin').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

  /******Validaciones para agregar servicio********/

  document.getElementById('inputHoraAproxS').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

  document.getElementById('inputHoraFinS').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 8 dígitos
    inputValue = inputValue.slice(0, 6);

    // Formatear el número agregando el guión
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
  });

});

//Codigo de las alerts
