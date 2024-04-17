
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#staticBackdrop');


// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    DUI = document.getElementById('dui'),
    NIT = document.getElementById('nit'),
    NOMBRES = document.getElementById('nombres'),
    APELLIDOS = document.getElementById('apellidos'),
    TELEFONO = document.getElementById('telefono'),
    CORREO = document.getElementById('correo'),
    DEPARTAMENTO = document.getElementById('departamento'),
    ESPECIALIZACION = document.getElementById('especializacion'),
    FECHA = document.getElementById('fecha'),
    SALARIO = document.getElementById('salario');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});
/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openSave = () => {
    sweetAlert(1, "Guardado exitosamente", false);
    SAVE_MODAL.hide();
}

const openClose = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea cancelar el registro de datos?');
    console.log('Resultado de la confirmación:', RESPONSE);
    if (RESPONSE === true) {
        SAVE_MODAL.hide();
    }
}


/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    
    // Actualizar texto de los botones
    document.getElementById('btnUno').innerText = 'Cancelar';
    document.getElementById('btnDos').innerText = 'Guardar';
}


function gotoDetail() {
    const lista_datos = [
        {
            dui: '12345678-9',
            nit: '657-390',
            nombres: 'Axel Gabriel',
            apellidos: 'García Ramos',
            telefono: '1234-5678',
            correo: 'axel@gmail.com',
            departamento: 'Departamento 1',
            especializacion: 'Jefe',
            fecha: '2022-02-09',
            salario: '$2000.00',
        }
    ];

    SAVE_MODAL.show();
    // Mostrar materiales de respaldo
    lista_datos.forEach(ROW => {
        DUI.value = ROW.dui;
        NIT.value = ROW.nit;
        NOMBRES.value = ROW.nombres;
        APELLIDOS.value = ROW.apellidos;
        TELEFONO.value = ROW.telefono;
        CORREO.value = ROW.correo;
        DEPARTAMENTO.value = ROW.departamento;
        ESPECIALIZACION.value = ROW.especializacion;
        FECHA.value = ROW.fecha;
        SALARIO.value = ROW.salario;
    });
    
    // Actualizar texto de los botones
    document.getElementById('btnUno').innerText = 'Eliminar';
    document.getElementById('btnDos').innerText = 'Actualizar';
}