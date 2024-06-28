<?php
// Se incluye la clase para validar los datos de entrada.
require_once ('../../helpers/validator.php');
// Se incluye la clase padre.
require_once ('../../models/handler/citas_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class CitasData extends CitasHandler
{
    private $data_error = null;
    private $filename = null;

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
