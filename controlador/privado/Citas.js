// Constante para completar la ruta de la API.
const CITAS_API = 'services/privado/citas.php';
const CITAS_CARDS_CONTAINER = document.getElementById('cards_citas_container');

// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#modalAgregarCita');

var cardContainers = document.getElementsByClassName("card");

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
  loadTemplate();
  fillData();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated')
      }, false)
  })
})()

/*
*   Función asíncrona para llenar el contenedor de los clientes con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillData = async (action = 'readAll', form = null) => {

  CITAS_CARDS_CONTAINER.innerHTML = '';
  const FORM = form ?? new FormData();
  const DATA = await fetchData(CITAS_API, action, FORM);

  createCitaAdd(CITAS_CARDS_CONTAINER);

  if (DATA.status) {
    DATA.dataset.forEach(row => {
      CITAS_CARDS_CONTAINER.innerHTML += createCardCita(row);
    });
  } else {
    if (DATA.error == 'Acción no disponible fuera de la sesión, debe ingresar para continuar') {
      await sweetAlert(4, DATA.error, true); location.href = 'index.html'
    }
    else {
      sweetAlert(4, DATA.error, true);
    }
  }
}


// Función para agregar la card de agregar cliente
function createCitaAdd(container) {
  container.innerHTML += `
  <div class="add-cita-card d-flex align-items-center justify-content-center">
    <img src="../../recursos/imagenes/icons/add.svg" class="hvr-grow" data-bs-toggle="modal"
    data-bs-target="#modalAgregarCita">
  </div>
  `;
}

// Función para generar el HTML de cada cliente
function createCardCita(row) {
  return `
  <div class="card position-relative z-2"><!--Card de la cita N#1-->
      <div class="content z-3">
          <h4 class="open-sans-light-italic">Màs informaciòn</h4>
      </div>
      <div class="line-divis position-absolute z-3"></div>
      <div class="card-izquierda">
          <div class="elemento-fecha-cita d-flex justify-content-center align-items-center text-center">
              <h6 class="open-sans-regular text-black p-0 m-0"><!--Fecha de la cita-->
                  Fecha de la cita programada: <br><strong>${row.fecha_hora_cita}</strong>
              </h6>
          </div>
          <div class="elemento-hora-llegada d-flex justify-content-center align-items-center text-center">
              <h6 class="open-sans-regular-medium text-white p-0 m-0">
                  <!--Hora de llegada del cliente-->
                  Hora de llegada del cliente: <br> ${row.fecha_hora_cita}
              </h6>
          </div>
          <div class="elemento-movilizacion text-black d-flex flex-column justify-content-center align-items-center px-3">
              <h6 class="open-sans-semibold p-0 m-0 mb-1"><!--Movilización del vehículo-->
                  Movilización del vehículo:
              </h6>
              <h6 class="open-sans-regular p-0 m-0"><!--Como se movilizo el vehículo-->
                  ${row.movilizacion_vehiculo}
              </h6>
          </div>
      </div>

      <div class="card-derecha position-relative">
          <div class="cita-number position-absolute text-center">
              <h6 class="open-sans-semibold m-0 p-0 text-white">Cita N° ${row.id_cita}</h6>
              <!--Número de la cita-->
          </div>

          <div class="img-container">
              <img src="../../recursos/imagenes/img_automoviles/carexmpl2.jpg">
          </div>
          <div class="info-cliente text-white d-flex flex-column justify-content-center align-items-center">
              <div class="grupo1 pb-3">
                  <h6 class="open-sans-bold p-0 m-0"><!--DUI del cliente-->
                      DUI del cliente:
                  </h6>
                  <h6 class="open-sans-regular p-0 m-0"><!--Número de DUI del cliente-->
                    ${row.dui_cliente}
                  </h6>
              </div>

              <div class="grupo2">
                  <h6 class="open-sans-bold p-0 m-0"><!--Placa del vehículo-->
                      Placa del Vehiculo:
                  </h6>
                  <h6 class="open-sans-regular p-0 m-0"><!--Número de placa del vehículo-->
                      ${row.placa_automovil}
                  </h6>
              </div>
          </div>
      </div>
  </div>
  `;
}

const openClose = async () => {
  // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
  const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
  if (RESPONSE.isConfirmed) {
      MODAL.hide();
  }
}

/*
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
/*
// Abre el agregar cita closeServiciosA
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

});*/

/* Obtener el primer elemento con la clase closeServiciosA
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


/*Abre Agregar cita
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

});*

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
/*
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
*/
