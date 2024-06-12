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
    protected $estado_cliente = null;
    protected $fecha_desde = null;
    protected $fecha_hasta = null;
    protected $search_value = null;
    protected $autos_cantidad = null;

    public function searchRows()
    {
        $sql = 'SELECT * FROM tb_clientes 
        WHERE tipo_cliente = ?';
        $params = array($this->tipo_cliente);

        if ($this->search_value) {
            $sql .= ' AND (
                CONCAT(nombres_cliente, " ", apellidos_cliente) LIKE ? OR 
                dui_cliente LIKE ? OR 
                telefono_cliente LIKE ? OR 
                correo_cliente LIKE ? OR 
                NIT_cliente LIKE ? OR 
                NRC_cliente LIKE ? OR
                NRF_cliente LIKE ?
            )';
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
            $params[] = "%{$this->search_value}%";
        }
        if ($this->departamento_cliente) {
            $sql .= ' AND departamento_cliente = ?';
            $params[] = $this->departamento_cliente;
        }
        if ($this->fecha_desde && $this->fecha_hasta) {
            $sql .= ' AND fecha_registro_cliente BETWEEN ? AND ?';
            $params[] = $this->fecha_desde;
            $params[] = $this->fecha_hasta;
        } else {
            if ($this->fecha_desde) {
                $sql .= ' AND fecha_registro_cliente >= ?';
                $params[] = $this->fecha_desde;
            }
            if ($this->fecha_hasta) {
                $sql .= ' AND fecha_registro_cliente <= ?';
                $params[] = $this->fecha_hasta;
            }
        }
        if($this->autos_cantidad){
            $sql .= ' AND (SELECT COUNT(id_automovil) FROM tb_automoviles WHERE id_cliente = tb_clientes.id_cliente) = ?';
            $params[] = $this->autos_cantidad;
        }
       /* if(1 == 1){
            $sql.= '
                AND id_cliente IN (
                    SELECT id_cliente FROM tb_automoviles
                    WHERE id_modelo_automovil IN (
                        SELECT id_modelo_automovil FROM tb_modelos_automoviles
                        WHERE id_marca_automovil = (
                            SELECT id_marca_automovil FROM tb_marcas_automoviles
                            WHERE nombre_marca_automovil = ?
                        )
                    )
                )
            '
            $params[] = $this->autos_cantidad;
        }*/
        return Database::getRows($sql, $params);
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
            $this->dui_cliente,
            $this->telefono_cliente,
            $this->correo_cliente,
            $this->nombres_cliente,
            $this->apellidos_cliente,
            $this->tipo_cliente,
            $this->departamento_cliente,
            $this->NIT_cliente,
            $this->NRC_cliente,
            $this->NRF_cliente,
            $this->rubro_comercial,
            $this->id_cliente
        ); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    public function deleteRow()
    {
        // Consulta SQL para eliminar un cliente basado en su ID
        $sql = 'DELETE FROM tb_clientes
            WHERE id_cliente = ?';
        // Parámetros de la consulta SQL, usando el ID del cliente proporcionado por la clase
        $params = array($this->id_cliente);
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
        $sql = 'SELECT id_cliente 
        FROM tb_clientes 
        WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_cliente = ?)';
        //AND id_cliente <> ?;';
        // Consulta SQL para verificar duplicados por valor (DUI o correo) excluyendo el ID actual
        $params = array(
            $value,
            $value,
            $value,
            //$this->id_cliente
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

    // Método para leer los clientes
    public function readMarcas()
    {
        $sql = 'SELECT DISTINCT nombre_marca_automovil FROM tb_marcas_automoviles ORDER BY nombre_marca_automovil ASC;';
        return Database::getRows($sql);
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
