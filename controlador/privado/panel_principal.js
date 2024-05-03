// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    graficoBarrasAnalisis();
    cargarGraficaLineal();
});

/*
*   Función asíncrona para mostrar un gráfico de barras.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoBarrasAnalisis = async () => {
    /*
    *   Lista de datos de ejemplo en caso de error al obtener los datos reales.
    */
    const datosEjemplo = [
        {
            marca: 'Toyota',
            reparado: 27
        },
        {
            marca: 'Nissan',
            reparado: 25
        },
        {
            marca: 'Honda',
            reparado: 17
        },
        {
            marca: 'Kia',
            reparado: 20
        }
    ];

    let marcas = [];
    let reparados = [];
    datosEjemplo.forEach(filter => {
        marcas.push(filter.marca);
        reparados.push(filter.reparado);
    });
    // Si ocurre un error, se utilizan los datos de ejemplo definidos arriba.
    barGraph('grafica', marcas, reparados, 'Autos reparados');

}


async function cargarGraficaLineal() {
    const datos = [
        { fecha: '2024-01-26', reparados: 6 },
        { fecha: '2024-01-27', reparados: 8 },
        { fecha: '2024-01-28', reparados: 8 },
        { fecha: '2024-01-29', reparados: 7 },
        { fecha: '2024-02-01', reparados: 9 },
        { fecha: '2024-02-02', reparados: 7 },
        { fecha: '2024-02-03', reparados: 6 }
    ];
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PRODUCTO_API, 'reparadosPorFecha');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a gráficar.
            let fecha = [];
            let reparados = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                fecha.push(row.fecha);
                reparados.push(row.reparados);
            });
            // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
            lineGraph('graficaLineal', fecha, ganancias, 'Reparados por fecha', 'Gráfica de autos reparados por fecha');
        } else {
            document.getElementById('graficaLineal').remove();
            console.log(DATA.error);
        }
    } catch {
        let fecha = [];
        let reparados = [];
        datos.forEach(filter => {
            fecha.push(filter.fecha);
            reparados.push(filter.reparados);
        });
        // Si ocurre un error, se utilizan los datos de ejemplo definidos arriba.
        lineGraph('graficaLineal', fecha, reparados, 'Reparados por fecha', 'Gráfica de autos reparados por fecha');

    }
}