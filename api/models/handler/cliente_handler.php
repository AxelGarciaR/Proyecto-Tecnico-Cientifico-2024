<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class ClienteHandler
{
    protected $id_cliente = null;

    public function readAll()
    {
        $sql = 'SELECT * FROM tb_clientes;';
        return Database::getRows($sql);
    }
}
