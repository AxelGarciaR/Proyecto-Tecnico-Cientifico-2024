<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class CitasHandler
{
    protected $id_cita = null;
    protected $fecha_registro = null;
    protected $fecha_hora_cita = null;
    protected $id_automovil = null;
    protected $movilizacion_vehiculo = null;
    protected $zona_habilitada = null;
    protected $direccion_ida = null;
    protected $direccion_regreso = null;
    protected $estado_cita = null;

    public function readAll()
    {
        $sql = '
        SELECT c.*, a.*, cl.* FROM tb_citas c
        INNER JOIN tb_automoviles a ON c.id_automovil = a.id_automovil
        INNER JOIN tb_clientes cl ON a.id_cliente = cl.id_cliente;';
        return Database::getRows($sql);
    }
}
