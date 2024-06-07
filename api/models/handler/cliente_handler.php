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
            NRF_cliente,
            rubro_comercial,
            tipo_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; // Consulta SQL para insertar un nuevo cliente
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
            $this-> NRF_cliente,
            $this-> rubro_comercial,
            $this-> tipo_cliente
        ); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes SET 
        dui_cliente = ?,
        telefono_cliente = ?,
        correo_cliente = ?,
        nombres_cliente = ?,
        apellidos_cliente = ?,
        tipo_cliente = ?,
        departamento_cliente = ?,
        NIT_cliente = ?,
        NRC_cliente = ?,
        NRF_cliente = ?,
        rubro_comercial = ?
        
        WHERE id_Cliente = ?'; // Consulta SQL para insertar un nuevo cliente
        $params = array(
            $this-> dui_cliente,
            $this-> telefono_cliente,
            $this-> correo_cliente,
            $this-> nombres_cliente,
            $this-> apellidos_cliente,
            $this-> tipo_cliente,
            $this-> departamento_cliente,
            $this-> NIT_cliente,
            $this-> NRC_cliente,
            $this-> NRF_cliente,
            $this-> rubro_comercial
        ); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    // Método para verificar duplicados por valor (DUI o correo) y excluyendo el ID actual
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente 
        FROM tb_clientes 
        WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_cliente = ?)';
        // Consulta SQL para verificar duplicados por valor (DUI o correo) excluyendo el ID actual
        $params = array(
            $value,
            $value,
            $value
        ); // Parámetros para la consulta SQL
        return Database::getRow($sql, $params); // Ejecución de la consulta SQL
    }

     // Método para leer los clientes
    public function readAll($TipoPersona)
    {
        $sql = 'SELECT * FROM tb_clientes WHERE tipo_cliente = ?;';
        $params = array(
            $TipoPersona
        );
        return Database::getRows($sql, $params);
    }

     // Método para leer a un cliente
     public function readOne()
     {
         $sql = 'SELECT * FROM tb_clientes WHERE id_cliente = ?';
         $params = array(
             $this->id_cliente
         );
         return Database::getRow($sql, $params);
     }
}
