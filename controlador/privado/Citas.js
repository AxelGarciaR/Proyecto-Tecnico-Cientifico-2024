// Constante para completar la ruta de la API.
const CITAS_API = 'services/privado/citas.php';
const CITAS_CARDS_CONTAINER = document.getElementById('cards_citas_container');

// Constantes para establecer los elementos del componente Modal.
const MODAL = new bootstrap.Modal('#modalAgregarCita');

const INPUT_FECHA_LLEGADA = document.getElementById('datepicker_llegada');
const INPUT_AUTOMOVIL = document.getElementById('input_automovil');
const INPUT_ZONA = document.getElementById('input_zona');
const INPUT_DIRECCION_REGRESO = document.getElementById('input_regreso');
const INPUT_HORA = document.getElementById('input_hora');
const INPUT_MOVILIZACION = document.getElementById('input_movilizacion');
const INPUT_DIRECCION_IDA = document.getElementById('input_ida');

const INPUT_FECHA_LLEGADA_UPDATE = document.getElementById('datepicker_llegada_UPDATE');
const INPUT_AUTOMOVIL_UPDATE = document.getElementById('input_automovil_UPDATE');
const INPUT_ZONA_UPDATE = document.getElementById('input_zona_UPDATE');
const INPUT_DIRECCION_REGRESO_UPDATE = document.getElementById('input_regreso_UPDATE');
const INPUT_HORA_UPDATE = document.getElementById('input_hora_UPDATE');
const INPUT_MOVILIZACION_UPDATE = document.getElementById('input_movilizacion_UPDATE');
const INPUT_DIRECCION_IDA_UPDATE = document.getElementById('input_ida_UPDATE');

const ADD_FORM = document.getElementById('addForm');
const UPDATE_FORM = document.getElementById('updateForm');

const BUTTONS_EN_ESPERA = document.getElementById('acccionBtnEspera');
const BUTTONS_EN_ESPERA_FORM = document.getElementById('btnUpdateEspera');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
  loadTemplate();
  fillData();
  fillSelect(CITAS_API, 'readAutomoviles', 'input_automovil');
  fillSelect(CITAS_API, 'readAutomoviles', 'input_automovil_UPDATE');

  $('#datepicker_llegada').datepicker({
    autoclose: true, // Cierra automáticamente después de seleccionar
    uiLibrary: 'bootstrap5', // Indica que estás usando Bootstrap 5
    minDate: new Date() // Establece la fecha máxima como hoy
  });
  $('#datepicker_llegada_UPDATE').datepicker({
    autoclose: true, // Cierra automáticamente después de seleccionar
    uiLibrary: 'bootstrap5', // Indica que estás usando Bootstrap 5
    minDate: new Date() // Establece la fecha máxima como hoy
  });
});

let id_citaW;

function clicCita(id_cita, estado_cita) {
  if (estado_cita == 'En espera') {
    BUTTONS_EN_ESPERA.classList.remove('d-none');
    BUTTONS_EN_ESPERA_FORM.classList.remove('d-none');
  }
  else {
    BUTTONS_EN_ESPERA.classList.add('d-none');
    BUTTONS_EN_ESPERA_FORM.classList.add('d-none');
  }
  readOne(id_cita);
  document.getElementById('containerExpand').classList.remove('d-none');
}

const readOne = async (id_cita) => {
  const FORM = new FormData();
  FORM.append('id_cita', id_cita);

  const DATA = await fetchData(CITAS_API, 'readOne', FORM);
  if (DATA.status) {
    const ROW = DATA.dataset;
    formSetValues(ROW);
    id_citaW = id_cita;
  } else {
    sweetAlert(4, DATA.error, true);
    location.href = '../../vistas/privado/Citas.html';
  }
}

function formSetValues(row) {
  const [date, time] = row.fecha_hora_cita.split(" ");
  const formattedDate = convertMySQLDateToJSDate(date);
  const formattedTime = convertMySQLTimeToHTMLTime(time);

  INPUT_FECHA_LLEGADA_UPDATE.value = formattedDate;
  INPUT_AUTOMOVIL_UPDATE.value = row.id_automovil;
  INPUT_ZONA_UPDATE.value = row.zona_habilitada;
  INPUT_DIRECCION_REGRESO_UPDATE.value = row.direccion_regreso;
  INPUT_HORA_UPDATE.value = formattedTime;
  INPUT_MOVILIZACION_UPDATE.value = row.movilizacion_vehiculo;
  INPUT_DIRECCION_IDA_UPDATE.value = row.direccion_ida;
}


/* Abre los servicios en proceso
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
});*/


// Método del evento para cuando se envía el formulario de guardar.
ADD_FORM.addEventListener('submit', async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  addSave('createRow', ADD_FORM, INPUT_FECHA_LLEGADA.value, INPUT_HORA.value);
});

// Método del evento para cuando se envía el formulario de guardar.
UPDATE_FORM.addEventListener('submit', async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  addSave('updateRow', UPDATE_FORM, INPUT_FECHA_LLEGADA_UPDATE.value, INPUT_HORA_UPDATE.value);
});


const updateEstado = async (estado_cita) => {
  const FORM = new FormData();
  FORM.append('estado_cita', estado_cita)
  FORM.append('id_cita', id_citaW)

  // Petición para guardar los datos del formulario.
  const DATA = await fetchData(CITAS_API, 'updateEstado', FORM);

  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
      sweetAlert(1, 'Se ha actualizado el estado de la cita con éxito', 300);
      reload();
      document.getElementById('containerExpand').classList.add('d-none');
  } else {
    if (DATA.error == 'Acción no disponible fuera de la sesión, debe ingresar para continuar') {
      await sweetAlert(4, DATA.error, true); location.href = 'index.html'
    }
    else {
      sweetAlert(4, DATA.error, true);
    }
  }

}

const addSave = async (action, form, fecha, hora) => {
  const isValid = await checkFormValidity(form);
  if (isValid) {
    console.log('TodoGud'); // Código a ejecutar después de la validación
    //Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(form);
    FORM.append('fecha_hora_cita', convertToMySQLDatetime(fecha, hora));
    FORM.append('id_cita', id_citaW)

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CITAS_API, action, FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
      if (action == 'createRow') {
        sweetAlert(1, 'Se ha guardado con éxito', 300);
        reload();
        MODAL.hide();
        resetForm(); // Resetea el formulario
        ADD_FORM.classList.remove('was-validated'); // Quita la clase de validación
      }
      else {
        sweetAlert(1, 'Se ha actualizado con éxito', 300);
        reload();
        BUTTONS_EN_ESPERA.classList.add('d-none');
        BUTTONS_EN_ESPERA_FORM.classList.add('d-none');
        document.getElementById('containerExpand').classList.add('d-none');
        UPDATE_FORM.classList.remove('was-validated'); // Quita la clase de validación
      }
    } else {
      if (DATA.error == 'Acción no disponible fuera de la sesión, debe ingresar para continuar') {
        await sweetAlert(4, DATA.error, true); location.href = 'index.html'
      }
      else {
        sweetAlert(4, DATA.error, true);
      }
    }
  } else {
    console.log('Que paso?: Formulario no válido');
  }
};

function reload() {
  resetForm();
  fillData('readAll');
}

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

const search = async (value) => {
  const FORM = new FormData();
  FORM.append('search', value);
  fillData('searchRows', FORM);
}

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
    <div class="card position-relative z-2" onclick="clicCita(${row.id_cita}, '${row.estado_cita}')">
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

function convertToMySQLDatetime(fecha, hora) {
  // Separar la fecha en mes, día y año
  let [mes, dia, anio] = fecha.split('/');

  // Convertir el mes y día a dos dígitos si es necesario
  mes = mes.padStart(2, '0');
  dia = dia.padStart(2, '0');

  // Separar la hora en horas y minutos
  let [horaFormato12, minutosAMPM] = hora.split(' ');
  let [horaNum, minutos] = horaFormato12.split(':');

  // Convertir la hora a formato de 24 horas si es PM
  if (minutosAMPM === 'p.m.') {
    horaNum = parseInt(horaNum, 10) + 12;
  } else if (minutosAMPM === 'a.m.' && horaNum === '12') {
    horaNum = '00';
  }

  // Formatear la hora y minutos como dos dígitos
  horaNum = horaNum.padStart(2, '0');
  minutos = minutos.padStart(2, '0');

  // Combinar todo en formato DATETIME de MySQL
  const datetimeMySQL = `${anio}-${mes}-${dia} ${horaNum}:${minutos}:00`;

  return datetimeMySQL;
}

const openClose = async () => {
  // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
  const RESPONSE = await confirmAction2('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán almacenados');
  if (RESPONSE.isConfirmed) {
    MODAL.hide();
    resetForm();
  }
}

const openCloseUpdate = async () => {
  // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
  const RESPONSE = await confirmAction2('¿Seguro qué quieres cerrar?', 'Los datos ingresados no serán actualizados');
  if (RESPONSE.isConfirmed) {
    resetForm();
    document.getElementById('containerExpand').classList.add('d-none');
  }
}

function resetForm() {
  // Resetea el formulario y los mensajes de validación
  ADD_FORM.reset(); // Resetea el formulario
  UPDATE_FORM.reset();
}

// Desactivar la edición directa del input
document.getElementById('datepicker_llegada').addEventListener('keydown', function (event) {
  event.preventDefault(); // Prevenir la entrada de texto
});



/* Abre el agregar cita closeServiciosA
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

});*/
/*
var closeButton = document.getElementsByClassName("closeServiciosA")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
  // Ocultar el contenedor modalAgregarServicio
  var modalAgregarServicio = document.getElementById("modalAgregarServicio");
  modalAgregarServicio.style.display = "none";
});*/


/* Obtener el primer elemento con la clase closeServiciosA
var closeButton = document.getElementsByClassName("closeServiciosB")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
  // Ocultar el contenedor modalAgregarServicio
  var modalAgregarServicio = document.getElementById("modalAgregarCita");
  modalAgregarServicio.style.display = "none";
});*/

/*
document.getElementById("btnAgregar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var AgregarSer = document.getElementById("modalAgregarServicio");
  AgregarSer.style.display = "block";

});*/


/* Agregar event listener al botón finalizarCita
document.getElementById("finalizarCita").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var detalles = document.getElementById("containerExpand");
  detalles.style.display = "none";

});*/

/*
document.getElementById("Cerrar").addEventListener("click", function () {
  // Ocultar el contenedor containerExpand
  var detalles = document.getElementById("containerExpandAgregar");
  detalles.style.display = "none";


});*/

/* Obtener el primer elemento con la clase closeServiciosA
var closeButton = document.getElementsByClassName("close")[0];

// Agregar el evento de clic al botón de cierre
closeButton.addEventListener("click", function () {
  // Ocultar el contenedor modalAgregarServicio
  var RevisarFac = document.getElementById("myModal");
  RevisarFac.style.display = "none";
});*/



/* Obtener elementos del DOM
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