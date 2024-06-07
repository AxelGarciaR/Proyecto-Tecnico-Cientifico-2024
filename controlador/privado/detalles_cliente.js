// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/privado/cliente.php';

const CLIENTE_DATA_CONTAINER = document.getElementById('clienteDataContainer');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    fillData();
});

/*
*   Función asíncrona para llenar el contenedor de los clientes con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillData = async () => {
    CLIENTE_DATA_CONTAINER.innerHTML = '';

    let id_cliente = Number(getQueryParam('id_cliente'));
    const FORM = new FormData();
    FORM.append('id_cliente', id_cliente);

    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM);
    if (DATA.status) {
        const ROW = DATA.dataset;
        if (ROW.tipo_cliente == 'Persona natural') {
            CLIENTE_DATA_CONTAINER.innerHTML += `
            <div
                class="contenedor-izq d-flex flex-column col-lg-4 col-md-8 col-12 flex-wrap justify-content-center align-items-center">
                <img src="../../recursos/imagenes/user_exmpl.png">
                <div class="col-12 d-flex justify-content-end align-items-end"> 
                    <button type="button" id="btnEditCliente" onclick="" data-bs-toggle=""
                        data-bs-target=""
                        class="btn btn-outline-primary col-10 btnEdit m-0 p-0">
                        <img src="../../recursos/imagenes/icons/btn-edit.svg" class="svg1">
                    </button>
                </div>
                <!-- Contenedor del info del cliente -->
                <div
                    class="contenedor-info d-flex flex-column col-lg-12 col-md-11 col-10 justify-content-center align-items-center">
                    <!--Contenedor Info header-->
                    <div class="info-header d-flex flex-column text-center pt-4 pt-md-0 pt-lg-0">
                        <h1 class="p-0 m-0 open-sans-bold">
                            ${ROW.nombres_cliente} ${ROW.apellidos_cliente}
                        </h1>
                        <p class="p-0 m-0 open-sans-regular">
                            Cliente #${ROW.id_cliente}
                        </p>
                    </div>
                    <!--Contenedor Info body-->
                    <div
                        class="info-body d-flex flex-lg-row flex-column flex-md-row justify-content-around align-items-center col-12 flex-wrap pb-4 pb-md-0 pb-lg-0 gap-3">
                        <!--Contenedor del correo-->
                        <div class="correo d-flex flex-column text-center text-md-start text-lg-start">
                            <h5 class="p-0 m-0 open-sans-semibold">
                                Correo
                            </h5>
                            <p class="p-0 m-0 open-sans-regular">
                                ${ROW.correo_cliente}
                            </p>
                        </div>
                        <!--Contenedor del DUI-->
                        <div class="dui d-flex flex-column text-center px-3">
                            <h5 class="p-0 m-0 open-sans-semibold">
                                DUI
                            </h5>
                            <p class="p-0 m-0 open-sans-regular">
                                ${ROW.dui_cliente}
                            </p>
                        </div>
                        <!--Contenedor del Telefono-->
                        <div class="telefono d-flex flex-column">
                            <h5 class="p-0 m-0 open-sans-semibold">
                                Telèfono
                            </h5>
                            <p class="p-0 m-0 open-sans-regular">
                                ${ROW.telefono_cliente}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--Contenedor de la columna derecha -->
            <div class="contenedor-drch d-flex flex-column col-lg-5 col-md-6 col-12 align-items-center">
                <!--Contenedor de màs informacion -->
                <div
                    class="contenedor-masinfo d-flex flex-column align-items-center justify-content-start col-12 mt-5 mt-md-0 mt-lg-0">
                    <!--Contenedor mas info header -->
                    <div class="masinfo-header">
                        <h2 class="m-0 p-0 open-sans-bold">
                            Màs Informaciòn
                        </h2>
                    </div>
                    <!--Contenedor mas info body -->
                    <div class="masinfo-body col-12">
                        <!--Elemento de departamento -->
                        <div class="depa d-flex flex-column">
                            <h5 class="m-0 p-0 open-sans-semibold">Departamento de residencia</h5>
                            <p class="m-0 p-0 open-sans-regular">
                                ${ROW.departamento_cliente}
                            </p>
                        </div>
                        <!--Elemento de registro -->
                        <div class="fecharegistro d-flex flex-column">
                            <h5 class="m-0 p-0 open-sans-semibold">Fecha de registro en el taller</h5>
                            <p class="m-0 p-0 open-sans-regular">
                                ${ROW.fecha_registro_cliente}
                            </p>
                        </div>
                        <div class="nit2">
                            <h5 class="m-0 p-0 open-sans-semibold">Nùmero de NIT</h5>
                            <p class="m-0 p-0 open-sans-regular">
                            ${ROW.NIT_cliente}
                            </p>
                        </div>
                    </div>
                </div>
                <!--Contenedor frecuencia-->
                <div
                    class="contenedor-frecuencia d-flex flex-column col-lg-6 col-md-7 col-9 justify-content-center align-items-center">
                    <!--Contenedor frecuencia header-->
                    <div class="frecuencia-header text-center">
                        <h6 class="m-0 p-0 open-sans-semibold">Frecuencia con la que el cliente
                            <br> vista nuestro taller
                        </h6>
                    </div>
                    <!--Contenedor frecuencia body-->
                    <div class="frecuencia-body d-flex flex-column">
                        <h6 class="m-0 p-0 open-sans-regular">
                            Mes de abril
                        </h6>
                        <h3 class="m-0 p-0 open-sans-bold-italic">
                            XXXX Veces
                        </h3>
                    </div>
                </div>
            </div>
            `;
        }
        else {
            CLIENTE_DATA_CONTAINER.innerHTML += `
            <div class="fila1 col-12 d-flex flex-wrap">
                <!--Contenedor de la columna izquierda-->
                <div
                    class="contenedor-izq d-flex flex-column col-lg-7 col-md-6 col-12 flex-wrap justify-content-center align-items-center">
                    <img src="../../recursos/imagenes/user_exmpl2.png">
                    <!--Contenedor de la info-->
                    <div
                        class="contenedor-info d-flex flex-column col-lg-8 col-md-11 col-10 justify-content-center align-items-center">
                        <!--Contenedor del header de la info-->
                        <div class="info-header d-flex flex-column text-center my-4">
                            <h1 class="p-0 m-0 open-sans-bold">
                                ${ROW.nombres_cliente}
                            </h1>
                            <p class="p-0 m-0 open-sans-regular">
                                Cliente #${ROW.id_cliente}
                            </p>
                        </div>
                        <!--Contenedor del body de la info-->
                        <div
                            class="info-body d-flex flex-lg-row flex-column flex-md-row justify-content-around align-items-center col-12 flex-wrap">
                            <!--Contenedor del correo-->
                            <div class="correo d-flex flex-column text-center text-md-start text-lg-start">
                                <h5 class="p-0 m-0 open-sans-semibold">
                                    Correo
                                </h5>
                                <p class="p-0 m-0 open-sans-regular">
                                    ${ROW.correo_cliente}
                                </p>
                            </div>
                            <!--Contenedor del dui-->
                            <div class="dui d-flex flex-column text-center px-3">
                                <h5 class="p-0 m-0 open-sans-semibold">
                                    DUI
                                </h5>
                                <p class="p-0 m-0 open-sans-regular">
                                    ${ROW.dui_cliente}
                                </p>
                            </div>
                            <!--Contenedor del telefono-->
                            <div class="telefono d-flex flex-column">
                                <h5 class="p-0 m-0 open-sans-semibold">
                                    Telèfono
                                </h5>
                                <p class="p-0 m-0 open-sans-regular">
                                    ${ROW.telefono_cliente}
                                </p>
                            </div>
                        </div>
                        <!--Contenedor del footer de la info-->
                        <div
                            class="info-footer d-flex flex-column mt-lg-5 mt-md-3 mt-4 mb-4 text-center text-md-start text-lg-start">
                            <h5 class="p-0 m-0 open-sans-semibold">
                                Rubro comercial al que pertenece
                            </h5>
                            <p class="p-0 m-0 open-sans-regular">
                                ${ROW.rubro_comercial}
                            </p>
                        </div>
                    </div>
                </div>
                <!--Contenedor de la columna derecha-->
                <div class="contenedor-drch d-flex flex-column col-lg-5 col-md-6 col-12 align-items-center">
                    <!--Contenedor de mas informacion-->
                    <div
                        class="contenedor-masinfo d-flex flex-column align-items-center justify-content-start col-12 mt-5 mt-md-0 mt-lg-0">
                        <!--Contenedor del titulo, header de mas informacion-->
                        <div class="masinfo-header">
                            <h2 class="m-0 p-0 open-sans-bold">
                                Màs Informaciòn
                            </h2>
                        </div>
                        <!--Contenedor del body de màs informacion-->
                        <div class="masinfo-body col-12">
                            <!--Contenedor de departamento-->
                            <div class="depa d-flex flex-column">
                                <h5 class="m-0 p-0 open-sans-semibold">Departamento de residencia</h5>
                                <p class="m-0 p-0 open-sans-regular">
                                    ${ROW.departamento_cliente}
                                </p>
                            </div>
                            <!--Contenedor de fecha de registro-->
                            <div class="fecharegistro d-flex flex-column">
                                <h5 class="m-0 p-0 open-sans-semibold">Fecha de registro en el taller</h5>
                                <p class="m-0 p-0 open-sans-regular">
                                    ${ROW.fecha_registro_cliente}
                                </p>
                            </div>
                            <!--Contenedor del nit-->
                            <div class="nit">
                                <h5 class="m-0 p-0 open-sans-semibold">Nùmero de NIT</h5>
                                <p class="m-0 p-0 open-sans-regular">
                                    ${ROW.NIT_cliente}
                                </p>
                            </div>
                            <!--Contenedor del nrc-->
                            <div class="nrc">
                                <h5 class="m-0 p-0 open-sans-semibold">Nùmero de NRC</h5>
                                <p class="m-0 p-0 open-sans-regular">
                                    ${ROW.NRC_cliente}
                                </p>
                            </div>
                            <div class="nrf">
                                <h5 class="m-0 p-0 open-sans-semibold">Nùmero de NRF</h5>
                                <p class="m-0 p-0 open-sans-regular">
                                    ${ROW.NRF_cliente}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--Contenedor de la frecuencia del cliente-->
                    <div
                        class="contenedor-frecuencia d-flex flex-column col-lg-6 col-md-7 col-9 justify-content-center align-items-center">
                        <!--Contenedor header de frecuencia-->
                        <div class="frecuencia-header text-center">
                            <h6 class="m-0 p-0 open-sans-semibold">Frecuencia con la que el cliente
                                <br> vista nuestro taller
                            </h6>
                        </div>
                        <!--Contenedor body de frecuencia-->
                        <div class="frecuencia-body d-flex flex-column">
                            <h6 class="m-0 p-0 open-sans-regular">
                                Mes de abril
                            </h6>
                            <h3 class="m-0 p-0 open-sans-bold-italic">
                                XX Veces
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Función para obtener un parámetro específico de la URL
function getQueryParam(Param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(Param);
}

// *Funcion para ir a los detalles del automovil
function gotoDetailsCar() {
    location.href = "../../vistas/privado/detalles_automovil.html";
}
// *Funcion para ir a la pagina anterior
function goBack() {
    window.history.back();
}