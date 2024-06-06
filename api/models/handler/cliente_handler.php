<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class ClienteHandler
{
    protected $id_cliente = null;
    protected $fecha_registro_cliente = null;
    protected $dui_cliente = null;
    protected $telefono_cliente = null;
    protected $correo_cliente = null;
    protected $nombres_cliente = null;
    protected $apellidos_cliente = null;
    protected $tipo_cliente = null;
    protected $departamento_cliente = null;
    protected $NIT_cliente = null;
    protected $NRC_cliente = null;
    protected $NRF_cliente = null;
    protected $rubro_comercial = null;

    // Método para crear un nuevo cliente
    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(
            fecha_registro_cliente, 
            dui_cliente, 
            telefono_cliente,
            correo_cliente,
            nombres_cliente, 
            apellidos_cliente,
            departamento_cliente,
            NIT_cliente,
            NRC_cliente,
            rubro_comercial,
            tipo_cliente) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; // Consulta SQL para insertar un nuevo cliente
        $params = array(
            $this-> fecha_registro_cliente,
            $this-> dui_cliente,
            $this-> telefono_cliente,
            $this-> correo_cliente,
            $this-> nombres_cliente,
            $this-> apellidos_cliente,
            $this-> departamento_cliente,
            $this-> NIT_cliente,
            $this-> NRC_cliente,
            $this-> rubro_comercial,
            $this-> tipo_cliente
        ); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    // Método para verificar duplicados por valor (DUI o correo) y excluyendo el ID actual
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente 
        FROM tb_clientes 
        WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_cliente = ?)
        AND id_trabajador <> ?;'; // Consulta SQL para verificar duplicados por valor (DUI o correo) excluyendo el ID actual
        $params = array(
            $value,
            $value,
            $value,
            $this->id_cliente
        ); // Parámetros para la consulta SQL
        return Database::getRow($sql, $params); // Ejecución de la consulta SQL
    }

     // Método para leer los clientes
    public function readAll()
    {
        $sql = 'SELECT * FROM tb_clientes;';
        return Database::getRows($sql);
    }
}
