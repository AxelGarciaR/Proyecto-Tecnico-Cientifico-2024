// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    graficoBarrasAnalisis();
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