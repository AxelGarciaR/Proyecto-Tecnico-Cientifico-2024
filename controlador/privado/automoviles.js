const MODELOS_CONTAINER = document.getElementById('contenedor-modelos');
const MARCAS_CONTAINER = document.getElementById('contenedor-marcas');

const BUSCAR_MODELOS = document.getElementById('btnBuscarModelos');
const REGRESAR_MARCAS = document.getElementById('btnReturn');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
});

function rotarImagen(idImagen) {
    var imagen = document.getElementById(idImagen);
    if (!imagen.classList.contains('rotacion-90')) {
        imagen.classList.add('rotacion-90');
    } else {
        imagen.classList.remove('rotacion-90');
    }
}

function showModelos() {
    MODELOS_CONTAINER.classList.remove('d-none');
    MARCAS_CONTAINER.classList.add('d-none');

    BUSCAR_MODELOS.classList.add('d-none');
    REGRESAR_MARCAS.classList.remove('d-none');
}

function showMarcas() {
    MODELOS_CONTAINER.classList.add('d-none');
    MARCAS_CONTAINER.classList.remove('d-none');

    BUSCAR_MODELOS.classList.remove('d-none');
    REGRESAR_MARCAS.classList.add('d-none');
}

$('#datepicker-desde').datepicker({
    uiLibrary: 'bootstrap5'
});
$('#datepicker-hasta').datepicker({
    uiLibrary: 'bootstrap5'
});

$('#datepicker-desdeRE').datepicker({
    uiLibrary: 'bootstrap5'
});
$('#datepicker-hastaRE').datepicker({
    uiLibrary: 'bootstrap5'
});
