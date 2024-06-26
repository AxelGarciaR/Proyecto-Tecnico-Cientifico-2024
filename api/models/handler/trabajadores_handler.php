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

    // Método para crear un nuevo trabajador
    public function createRow()
    {
        //Consulta SQL para agregar a trabajadores con los datos 
        $sql = 'INSERT INTO tb_trabajadores(
            dui_trabajador, 
            NIT_trabajador, 
            nombres_trabajador,
            apellidos_trabajador,
            telefono_trabajador, 
            correo_trabajador,
            departamento_trabajador,
            id_especializacion_trabajador,
            fecha_contratacion,
            salario_base,
            Fto_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
         // Parámetros para la consulta SQL
        $params = array(
            $this->dui_trabajador,
            $this->NIT_trabajador,
            $this->nombres_trabajador,
            $this->apellidos_trabajador,
            $this->telefono_trabajador,
            $this->correo_trabajador,
            $this->departamento_trabajador,
            $this->id_especializacion_trabajador,
            $this->fecha_contratacion,
            $this->salario_base,
            $this->Fto_trabajador
        );
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    // Método para verificar duplicados por valor (DUI o correo) y excluyendo el ID actual
    public function checkDuplicate($value)
    {
        // Consulta SQL para verificar duplicados por valor (DUI o correo) excluyendo el ID actual
        $sql = 'SELECT id_trabajador FROM tb_trabajadores 
        WHERE (dui_trabajador = ? OR correo_trabajador = ? OR telefono_trabajador = ? OR NIT_trabajador = ?)';        
        // Parámetros para la consulta SQL
        $params = array(
            $value,
            $value,
            $value,
            $value,
        ); 

        //Parametro a agregar si id trabajador es correcto
        if ($this->id_trabajador) {
            $sql .= ' AND id_trabajador <> ?;';
            $params[] = $this->id_trabajador;
        }

        return Database::getRows($sql, $params); //Ejecución de la consulta SQL
    }

    // Método para campos de todos los trabajadores
    public function readAll()
    {
        $sql = 'SELECT * FROM tb_trabajadores';
        return Database::getRows($sql);
    }

    // Método para leer 
    public function readOne()
    {
        // Consulta SQL para seleccionar a un trabajador en especifico 
        $sql = 'SELECT * FROM tb_trabajadores WHERE id_trabajador = ?';
        //Parametro para seleccionar el trabajador por su id
        $params = array(
            $this->id_trabajador
        );
        return Database::getRow($sql, $params); //Ejecución de la consulta SQL
    }
}
