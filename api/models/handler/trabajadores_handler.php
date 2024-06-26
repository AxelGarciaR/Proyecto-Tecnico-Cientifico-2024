<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla trabajadores.
 */

class TrabajadoresHandler
{
    protected $id_trabajador = null;
    protected $id_especializacion_trabajador = null;
    protected $dui_trabajador = null;
    protected $telefono_trabajador = null;
    protected $correo_trabajador = null;
    protected $nombres_trabajador = null;
    protected $apellidos_trabajador = null;
    protected $departamento_trabajador = null;
    protected $NIT_trabajador = null;
    protected $fecha_contratacion = null;
    protected $salario_base = null;
    protected $Fto_trabajador = null;


    //Funcion para buscar trabajadores dependiendo de su nombre o dui 
    public function searchRows()
    {
        //Sentencia select general para tabla trabajadores
        $sql = 'SELECT * FROM tb_trabajadores 
        WHERE nombres_trabajador = ? OR dui_trabajador = ?'; 
        //Parametros a enviar a los campos de la tabla
        $params = array($this->nombres_trabajador, $this->dui_trabajador); 
        return Database::getRows($sql, $params);
    }

    //Funcion para actualizar los datos de un trabajador
    public function updateRow()
    {
        //Sentencia update para los datos dependiendo del id del trabajador
        $sql = 'UPDATE tb_trabajadores SET 
        id_especializacion_trabajador = ?,
        dui_trabajador = ?,
        telefono_trabajador = ?,
        correo_trabajador = ?,
        nombres_trabajador = ?,
        apellidos_trabajador = ?,
        departamento_trabajador = ?,
        NIT_trabajador = ?,
        fecha_contratacion = ?,
        salario_base = ?,
        Fto_trabajador = ?
        WHERE id_trabajador = ?';  
        //Parametros a enviar a los campos de tabla
        $params = array( 
            $this->id_especializacion_trabajador,
            $this->dui_trabajador,
            $this->telefono_trabajador,
            $this->correo_trabajador,
            $this->nombres_trabajador,
            $this->apellidos_trabajador,
            $this->departamento_trabajador,
            $this->NIT_trabajador,
            $this->fecha_contratacion,
            $this->salario_base,
            $this->Fto_trabajador,
            $this->id_trabajador
        );
        return Database::executeRow($sql, $params); //Ejecución de la consulta SQL
    }

    public function deleteRow()
    {
        // Consulta SQL para eliminar un cliente basado en su ID
        $sql = 'DELETE FROM tb_trabajadores
            WHERE id_trabajador = ?';
        // Parámetros de la consulta SQL, usando el ID del cliente proporcionado por la clase
        $params = array($this->id_trabajador);
        // Ejecuta la consulta de eliminación y devuelve el resultado
        return Database::executeRow($sql, $params);
    }

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
            tipo_cliente,
            estado_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; // Consulta SQL para insertar un nuevo cliente
        $params = array(
            $this->fecha_registro_cliente,
            $this->dui_cliente,
            $this->telefono_cliente,
            $this->correo_cliente,
            $this->nombres_cliente,
            $this->apellidos_cliente,
            $this->departamento_cliente,
            $this->NIT_cliente,
            $this->NRC_cliente,
            $this->NRF_cliente,
            $this->rubro_comercial,
            $this->tipo_cliente,
            $this->estado_cliente
        ); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    // Método para verificar duplicados por valor (DUI o correo) y excluyendo el ID actual
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente FROM tb_clientes 
        WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_cliente = ? OR NIT_cliente = ? OR NRC_cliente = ? OR NRF_cliente = ?)';
        // Consulta SQL para verificar duplicados por valor (DUI o correo) excluyendo el ID actual
        $params = array(
            $value,
            $value,
            $value,
            $value,
            $value,
            $value,
        ); // Parámetros para la consulta SQL

        if ($this->id_cliente) {
            $sql .= ' AND id_cliente <> ?;';
            $params[] = $this->id_cliente;
        }

        return Database::getRows($sql, $params); // Ejecución de la consulta SQL
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
