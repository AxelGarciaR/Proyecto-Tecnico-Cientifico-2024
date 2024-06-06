<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start(); // Inicia la sesión.
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    // Verifica si el usuario ha iniciado sesión.
    if (isset($_SESSION['id_cliente'])) {
        $result['session'] = 1; // Indica que hay una sesión activa.
        switch ($_GET['action']) {
            
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAllJuridico':
                if ($result['dataset'] = $cliente->readAllJuridico()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen clientes juridicos para mostrar';
                }
                break;
                case 'readAllNatural':
                    if ($result['dataset'] = $cliente->readAllNatural()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'No existen clientes naturales para mostrar';
                    }
                    break;
                case 'createRow':
                    $_POST = Validator::validateForm($_POST);
                    if($_POST['tipo_cliente'] == 'Persona natural'){
                        if (
                            !$cliente->setDUI($_POST['input_dui']) or
                            !$cliente->setNIT($_POST['input_nit']) or
                            !$cliente->setTelefono($_POST['input_telefono']) or
                            !$cliente->setDepartamento($_POST['input_departamento']) or
                            !$cliente->setNombre($_POST['input_nombre']) or
                            !$cliente->setApellido($_POST['input_apellido']) or
                            !$cliente->setCorreo($_POST['input_correo']) or
                            !$cliente->setFechaRegistro($_POST['fecha_registro']) or
                            !$cliente->setTipoCliente($_POST['tipo_cliente']) 
                        ) {
                            $result['error'] = $cliente->getDataError();
                        } elseif ($cliente->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Cliente natural creado correctamente';
                        } else {
                            $result['error'] = 'Ocurrió un problema al crear el Cliente';
                        }
                    }
                    else{
                        if (
                            !$cliente->setDUI($_POST['input_dui']) or
                            !$cliente->setNIT($_POST['input_nit']) or
                            !$cliente->setTelefono($_POST['input_telefono']) or
                            !$cliente->setNRF($_POST['input_nrf']) or
                            !$cliente->setNRC($_POST['input_nrc']) or
                            !$cliente->setDepartamento($_POST['input_departamento']) or
                            !$cliente->setNombre($_POST['input_nombre']) or
                            !$cliente->setApellido($_POST['input_apellido']) or
                            !$cliente->setCorreo($_POST['input_correo']) or
                            !$cliente->setRubro($_POST['input_rubro_comercial']) or
                            !$cliente->setFechaRegistro($_POST['fecha_registro']) or
                            !$cliente->setTipoCliente($_POST['tipo_cliente']) 
                        ) {
                            $result['error'] = $cliente->getDataError();
                        } elseif ($cliente->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Cliente juridico creado correctamente';
                        } else {
                            $result['error'] = 'Ocurrió un problema al crear el Cliente';
                        }
                    }
                   
                    break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    // Si no se envió una acción válida, se devuelve un mensaje de recurso no disponible.
    print(json_encode('Recurso no disponible'));
}
