DELIMITER //
CREATE PROCEDURE sp_insertar_cliente (
    IN p_dui_cliente VARCHAR(10),
    IN p_telefono_cliente VARCHAR(9),
    IN p_correo_cliente VARCHAR(50),
    IN p_nombres_cliente VARCHAR(50),
    IN p_apellidos_cliente VARCHAR(50),
    IN p_tipo_cliente ENUM('persona natural','persona juridica'),
    IN p_departamento_cliente ENUM('Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador', 'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'),
    IN p_NIT_cliente VARCHAR(18),
    IN p_NRC_cliente VARCHAR(11),
    IN p_NRF_cliente VARCHAR(25),
    IN p_giro_cliente VARCHAR(25)
)
BEGIN
    INSERT INTO tb_clientes (dui_cliente, telefono_cliente, correo_cliente, nombres_cliente, apellidos_cliente, tipo_cliente, departamento_cliente, NIT_cliente, NRC_cliente, NRF_cliente, giro_cliente) 
    VALUES (p_dui_cliente, p_telefono_cliente, p_correo_cliente, p_nombres_cliente, p_apellidos_cliente, p_tipo_cliente, p_departamento_cliente, p_NIT_cliente, p_NRC_cliente, p_NRF_cliente, p_giro_cliente);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_marca_automovil (
    IN p_nombre_marca_automovil VARCHAR(50)
)
BEGIN
    INSERT INTO tb_marcas_automoviles (nombre_marca_automovil) VALUES (p_nombre_marca_automovil);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_modelo_automovil (
    IN p_id_marca_automovil INT,
    IN p_nombre_modelo_automovil VARCHAR(50)
)
BEGIN
    INSERT INTO tb_modelos_automoviles (id_marca_automovil,nombre_modelo_automovil) VALUES (p_id_marca_automovil, p_nombre_modelo_automovil);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_tipo_automovil (
    IN p_nombre_tipo_automovil VARCHAR(80)
)
BEGIN
    INSERT INTO tb_tipos_automoviles (nombre_tipo_automovil) VALUES (p_nombre_tipo_automovil);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_color (
    IN p_nombre_color VARCHAR(50)
)
BEGIN
    INSERT INTO tb_colores (nombre_color) VALUES (p_nombre_color);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_automovil (
    IN p_id_modelo_automovil INT,
    IN p_id_tipo_automovil INT,
    IN p_id_color INT,
    IN p_fecha_fabricacion_automovil YEAR,
    IN p_placa_automovil VARCHAR(8),
    IN p_imagen_automovil VARCHAR(25),
    IN p_id_cliente INT,
    IN p_fecha_registro DATE
)
BEGIN
    INSERT INTO tb_automoviles (id_modelo_automovil, id_tipo_automovil, id_color, fecha_fabricacion_automovil, placa_automovil, imagen_automovil, id_cliente, fecha_registro) 
    VALUES (p_id_modelo_automovil, p_id_tipo_automovil, p_id_color, p_fecha_fabricacion_automovil, p_placa_automovil, p_imagen_automovil, p_id_cliente, p_fecha_registro);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_tipo_servicio (
    IN p_nombre_tipo_servicio VARCHAR(50),
    IN p_imagen_servicio VARCHAR(25)
)
BEGIN
    INSERT INTO tb_tipos_servicios (nombre_tipo_servicio, imagen_servicio) VALUES (p_nombre_tipo_servicio, p_imagen_servicio);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_servicio (
    IN p_id_tipo_servicio INT,
    IN p_nombre_servicio VARCHAR(50),
    IN p_descripcion_servicio VARCHAR(50)
)
BEGIN
    INSERT INTO tb_servicios (id_tipo_servicio,nombre_servicio, descripcion_servicio) 
    VALUES (p_id_tipo_servicio, p_nombre_servicio, p_descripcion_servicio);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_forma_pago (
    IN p_nombre_forma_pago VARCHAR(100)
)
BEGIN
    INSERT INTO tb_formas_pagos (nombre_forma_pago) VALUES (p_nombre_forma_pago);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_consumidor_final (
    IN p_fecha_registro_factura DATE,
    IN p_venta_a_cuenta_de ENUM('CONTADO','TARJETA'),
    IN p_duracion_garantia INT,
    IN p_nota VARCHAR(100),
    IN p_id_cita INT,
    IN p_estado_consumidor_final ENUM('En espera', 'Cancelado', 'Completado') 
)
BEGIN
    INSERT INTO tb_consumidores_finales (fecha_registro_factura, venta_a_cuenta_de, duracion_garantia, nota, id_cita, estado_consumidor_final) 
    VALUES (p_fecha_registro_factura, p_venta_a_cuenta_de, p_duracion_garantia, p_nota, p_id_cita, p_estado_consumidor_final);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_detalle_consumidor_final (
    IN p_id_consumidor_final INT,
    IN p_id_servicio INT,
    IN p_cantidad_servicio INT,
    IN p_precio_servicio DECIMAL
)
BEGIN
    INSERT INTO tb_detalles_consumidores_finales (id_consumidor_final, id_servicio, cantidad_servicio, precio_servicio) 
    VALUES (p_id_consumidor_final, p_id_servicio, p_cantidad_servicio, p_precio_servicio);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_credito_fiscal (
    IN p_numero_factura VARCHAR(5),
    IN p_fecha_registro_factura DATE,
    IN p_venta_a_cuenta_de ENUM('CONTADO','TARJETA'),
    IN p_duracion_garantia INT,
    IN p_nota VARCHAR(100),
    IN p_id_cita INT,
    IN p_nombre_emisor VARCHAR(25),
    IN p_dui_emisor VARCHAR(10),
    IN p_estado_credito_fiscal ENUM('En espera', 'Cancelado', 'Completado') 
)
BEGIN
    INSERT INTO tb_creditos_fiscales (numero_factura, fecha_registro_factura, venta_a_cuenta_de, duracion_garantia, nota, id_cita, nombre_emisor, dui_emisor, estado_credito_fiscal) 
    VALUES (p_numero_factura, p_fecha_registro_factura, p_venta_a_cuenta_de, p_duracion_garantia, p_nota, p_id_cita, p_nombre_emisor, p_dui_emisor, p_estado_credito_fiscal);
END //
DELIMITER ;


DELIMITER // 
CREATE PROCEDURE sp_insertar_detalle_credito_fiscal (
	IN p_id_credito_fiscal INT,
    IN p_id_servicio INT,
    IN p_cantidad_servicio INT,
    IN p_precio_servicio DECIMAL
)
BEGIN
    INSERT INTO tb_detalles_creditos_fiscales (id_credito_fiscal,id_servicio, cantidad_servicio, precio_servicio) 
    VALUES (p_id_credito_fiscal, p_id_servicio, p_cantidad_servicio, p_precio_servicio);
END //
DELIMITER;


DELIMITER //
CREATE PROCEDURE sp_insertar_cita (
    IN p_fecha_hora_cita DATETIME,
    IN p_id_automovil INT,
    IN p_movilizacion_vehiculo ENUM('Yo llevo el auto y lo traigo de regreso', 'Yo solo regreso el auto', 'Yo solo llevo el auto'),
    IN p_zona_habilitada ENUM('Ayutuxtepeque',  'Aguilares'),
    IN p_direccion_ida VARCHAR(250),
    IN p_direccion_regreso VARCHAR(250),
    IN p_estado_cita ENUM('En espera', 'Aceptado', 'Cancelado')
)
BEGIN
    INSERT INTO tb_citas (fecha_registro, fecha_hora_cita, id_automovil, movilizacion_vehiculo, zona_habilitada, direccion_ida, direccion_regreso, estado_cita) 
    VALUES (CURRENT_DATE(), p_fecha_hora_cita, p_id_automovil, p_movilizacion_vehiculo, p_zona_habilitada, p_direccion_ida, p_direccion_regreso, p_estado_cita);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_servicio_en_proceso (
    IN p_fecha_registro DATETIME,
    IN p_fecha_aproximada_finalizacion DATETIME,
    IN p_fecha_finalizacion DATETIME,
    IN p_id_cita INT,
    IN p_id_servicio INT
)
BEGIN
    INSERT INTO tb_servicios_en_proceso (fecha_registro, fecha_aproximada_finalizacion, fecha_finalizacion, id_cita, id_servicio) 
    VALUES (p_fecha_registro, p_fecha_aproximada_finalizacion, p_fecha_finalizacion, p_id_cita, p_id_servicio);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_seguimiento_consumidor_final (
    IN p_id_consumidor_final INT,
    IN p_fecha_seguimiento DATE,
    IN p_descripcion_seguimiento VARCHAR(500)
)
BEGIN
    INSERT INTO tb_seguimientos_consumidores_finales (id_consumidor_final, fecha_seguimiento, descripcion_seguimiento) 
    VALUES (p_id_consumidor_final, p_fecha_seguimiento, p_descripcion_seguimiento);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_seguimiento_credito_fiscal (
    IN p_fecha_seguimiento DATE,
    IN p_descripcion_seguimiento VARCHAR(500),
    IN p_id_consumidor_final INT
)
BEGIN
    INSERT INTO tb_seguimientos_creditos_fiscales (fecha_seguimiento, descripcion_seguimiento, id_consumidor_final) 
    VALUES (p_fecha_seguimiento, p_descripcion_seguimiento, p_id_consumidor_final);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_usuario_cliente (
    IN p_clave_usuario_cliente VARCHAR(50),
    IN p_estado_usuario BOOLEAN,
    IN p_id_cliente INT
)
BEGIN
    INSERT INTO tb_usuarios_clientes (clave_usuario_cliente, estado_usuario, id_cliente) 
    VALUES (p_clave_usuario_cliente, p_estado_usuario, p_id_cliente);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_especializacion_trabajador (
    IN p_nombre_especializacion_trabajador VARCHAR(100),
    IN p_pago_por_especializacion DECIMAL
)
BEGIN
    INSERT INTO tb_especializaciones_trabajadores (nombre_especializacion_trabajador, pago_por_especializacion) 
    VALUES (p_nombre_especializacion_trabajador, p_pago_por_especializacion);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_trabajador (
    IN p_id_especializacion_trabajador INT,
    IN p_dui_trabajador VARCHAR(9),
    IN p_telefono_trabajador VARCHAR(9),
    IN p_correo_trabajador VARCHAR(50),
    IN p_nombres_trabajador VARCHAR(50),
    IN p_apellidos_trabajador VARCHAR(50),
    IN p_id_departamento INT,
    IN p_NIT_trabajador VARCHAR(18),
    IN p_fecha_contratacion DATE,
    IN p_salario_base DECIMAL(5, 2)
)
BEGIN
    INSERT INTO tb_trabajadores (id_especializacion_trabajador, dui_trabajador, telefono_trabajador, correo_trabajador, nombres_trabajador, apellidos_trabajador, id_departamento, NIT_trabajador, fecha_contratacion, salario_base) 
    VALUES (p_id_especializacion_trabajador, p_dui_trabajador, p_telefono_trabajador, p_correo_trabajador, p_nombres_trabajador, p_apellidos_trabajador, p_id_departamento, p_NIT_trabajador, p_fecha_contratacion, p_salario_base);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_forma_pago_consumidor_final (
    IN p_id_forma_pago INT,
    IN p_id_consumidor_final INT
)
BEGIN
    INSERT INTO tb_formas_pagos_consumidores_finales (id_forma_pago, id_consumidor_final) 
    VALUES (p_id_forma_pago, p_id_consumidor_final);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertar_usuario (
    IN p_correo_usuario VARCHAR(500),
    IN p_clave_usuario VARCHAR(60),
    IN p_telefono_usuario VARCHAR(9)
)
BEGIN
    INSERT INTO tb_usuarios (correo_usuario, clave_usuario, telefono_usuario) 
    VALUES (p_correo_usuario, p_clave_usuario, p_telefono_usuario);
END //
DELIMITER ;

-- insercion de datos --
CALL sp_insertar_departamento('San Salvador');
CALL sp_insertar_departamento('Santa Ana');
CALL sp_insertar_departamento('La Libertad');
CALL sp_insertar_departamento('San Miguel');
CALL sp_insertar_departamento('La Paz');
CALL sp_insertar_departamento('Sonsonate');
CALL sp_insertar_departamento('Usulután');
CALL sp_insertar_departamento('Chalatenango');
CALL sp_insertar_departamento('La Unión');
CALL sp_insertar_departamento('Cuscatlán');

CALL sp_insertar_cliente('0011223344', '78561234', 'cliente1@example.com', 'Juan', 'Pérez', 'persona natural', 1, '123456-7', '01234567890', 'NRF-001', 'Reparación de vehículos');
CALL sp_insertar_cliente('1122334455', '79562345', 'cliente2@example.com', 'María', 'González', 'persona natural', 2, '223344-5', '23456789012', 'NRF-002', 'Lavado de autos');
CALL sp_insertar_cliente('2233445566', '78563456', 'cliente3@example.com', 'Pedro', 'Hernández', 'persona natural', 3, '334455-6', '34567890123', 'NRF-003', 'Venta de repuestos');
CALL sp_insertar_cliente('3344556677', '79564567', 'cliente4@example.com', 'Laura', 'López', 'persona natural', 4, '445566-7', '45678901234', 'NRF-004', 'Venta de autos nuevos');
CALL sp_insertar_cliente('4455667788', '78565678', 'cliente5@example.com', 'Carlos', 'Martínez', 'persona natural', 5, '556677-8', '56789012345', 'NRF-005', 'Mecánica general');
CALL sp_insertar_cliente('5566778899', '79566789', 'cliente6@example.com', 'Ana', 'Rodríguez', 'persona juridica', 6, '667788-9', '67890123456', 'NRF-006', 'Mantenimiento de flotas');
CALL sp_insertar_cliente('6677889900', '78567890', 'cliente7@example.com', 'Miguel', 'Gómez', 'persona juridica', 7, '778899-0', '78901234567', 'NRF-007', 'Alquiler de autos');
CALL sp_insertar_cliente('7788990011', '79568901', 'cliente8@example.com', 'Elena', 'Sánchez', 'persona juridica', 8, '889900-1', '89012345678', 'NRF-008', 'Taller de pintura');
CALL sp_insertar_cliente('8899001122', '78569012', 'cliente9@example.com', 'David', 'Fernández', 'persona juridica', 9, '990011-2', '90123456789', 'NRF-009', 'Venta de seguros');
CALL sp_insertar_cliente('9900112233', '79560123', 'cliente10@example.com', 'Sofía', 'Paz', 'persona juridica', 10, '001122-3', '01234567890', 'NRF-010', 'Accesorios para autos');

CALL sp_insertar_marca_automovil('Toyota');
CALL sp_insertar_marca_automovil('Honda');
CALL sp_insertar_marca_automovil('Ford');
CALL sp_insertar_marca_automovil('Chevrolet');
CALL sp_insertar_marca_automovil('Nissan');
CALL sp_insertar_marca_automovil('Volkswagen');
CALL sp_insertar_marca_automovil('Hyundai');
CALL sp_insertar_marca_automovil('Kia');
CALL sp_insertar_marca_automovil('Mazda');
CALL sp_insertar_marca_automovil('BMW');

CALL sp_insertar_modelo_automovil(1, 'Corolla');
CALL sp_insertar_modelo_automovil(2, 'Civic');
CALL sp_insertar_modelo_automovil(3, 'Focus');
CALL sp_insertar_modelo_automovil(4, 'Cruze');
CALL sp_insertar_modelo_automovil(5, 'Sentra');
CALL sp_insertar_modelo_automovil(6, 'Jetta');
CALL sp_insertar_modelo_automovil(7, 'Elantra');
CALL sp_insertar_modelo_automovil(8, 'Rio');
CALL sp_insertar_modelo_automovil(9, '3');
CALL sp_insertar_modelo_automovil(10, 'X3');

CALL sp_insertar_tipo_automovil('Sedán');
CALL sp_insertar_tipo_automovil('Hatchback');
CALL sp_insertar_tipo_automovil('SUV');
CALL sp_insertar_tipo_automovil('Coupé');
CALL sp_insertar_tipo_automovil('Furgoneta');
CALL sp_insertar_tipo_automovil('Camioneta');
CALL sp_insertar_tipo_automovil('Convertible');
CALL sp_insertar_tipo_automovil('Pickup');
CALL sp_insertar_tipo_automovil('Deportivo');
CALL sp_insertar_tipo_automovil('Todo Terreno');

CALL sp_insertar_color('Negro');
CALL sp_insertar_color('Blanco');
CALL sp_insertar_color('Gris');
CALL sp_insertar_color('Azul');
CALL sp_insertar_color('Rojo');
CALL sp_insertar_color('Plata');
CALL sp_insertar_color('Verde');
CALL sp_insertar_color('Amarillo');
CALL sp_insertar_color('Naranja');
CALL sp_insertar_color('Morado');

CALL sp_insertar_automovil(2, 3, 2, '2019', '12345678', 'civic.jpg', 2, '2022-01-15');
CALL sp_insertar_automovil(2, 3, 2, '2019', 'ABC456', 'civic.jpg', 2, '2022-01-15');
CALL sp_insertar_automovil(3, 2, 3, '2020', 'XYZ789', 'focus.jpg', 3, '2022-02-20');
CALL sp_insertar_automovil(4, 4, 4, '2021', 'DEF012', 'cruze.jpg', 4, '2022-03-25');
CALL sp_insertar_automovil(5, 5, 5, '2020', 'GHI345', 'sentra.jpg', 5, '2022-04-30');
CALL sp_insertar_automovil(6, 6, 6, '2019', 'JKL678', 'jetta.jpg', 6, '2022-05-10');
CALL sp_insertar_automovil(7, 7, 7, '2018', 'MNO901', 'elantra.jpg', 7, '2022-06-15');
CALL sp_insertar_automovil(8, 8, 8, '2020', 'PQS234', 'rio.jpg', 8, '2022-07-20');
CALL sp_insertar_automovil(9, 9, 9, '2021', 'TUV567', 'mazda3.jpg', 9, '2022-08-25');
CALL sp_insertar_automovil(10, 10, 10, '2022', 'WXY890', 'x3.jpg', 10, '2022-09-30');

CALL sp_insertar_tipo_servicio('Reparación', 'reparacion.jpg');
CALL sp_insertar_tipo_servicio('Mantenimiento', 'mantenimiento.jpg');
CALL sp_insertar_tipo_servicio('Lavado', 'lavado.jpg');
CALL sp_insertar_tipo_servicio('Venta de repuestos', 'repuestos.jpg');
CALL sp_insertar_tipo_servicio('Venta de autos nuevos', 'autos_nuevos.jpg');
CALL sp_insertar_tipo_servicio('Mecánica general', 'mecanica.jpg');
CALL sp_insertar_tipo_servicio('Alquiler de autos', 'alquiler.jpg');
CALL sp_insertar_tipo_servicio('Taller de pintura', 'pintura.jpg');
CALL sp_insertar_tipo_servicio('Venta de seguros', 'seguros.jpg');
CALL sp_insertar_tipo_servicio('Accesorios para autos', 'accesorios.jpg');

CALL sp_insertar_servicio(1, 'Cambio de aceite', 'Incluye cambio de aceite y filtro.');
CALL sp_insertar_servicio(2, 'Reparación de frenos', 'Revisión y reparación del sistema de frenos.');
CALL sp_insertar_servicio(3, 'Alineación y balanceo', 'Alineación y balanceo de las llantas.');
CALL sp_insertar_servicio(4, 'Cambio de bujías', 'Cambio de bujías y revisión del sistema de encendido.');
CALL sp_insertar_servicio(5, 'Revisión de suspensión', 'Revisión y ajuste del sistema de suspensión.');
CALL sp_insertar_servicio(6, 'Lavado de motor', 'Lavado y desengrase del motor.');
CALL sp_insertar_servicio(7, 'Cambio de filtro de aire', 'Cambio del filtro de aire del motor.');
CALL sp_insertar_servicio(8, 'Reparación de sistema eléctrico', 'Reparación de fallas eléctricas.');
CALL sp_insertar_servicio(9, 'Cambio de llantas', 'Cambio de llantas por nuevas.');
CALL sp_insertar_servicio(10, 'Diagnóstico de fallas', 'Diagnóstico computarizado de fallas.');

CALL sp_insertar_cita('2024-04-13 09:00:00', 1, 'Yo llevo el auto y lo traigo de regreso', 'Ayutuxtepeque', 'Dirección de ida 1', 'Dirección de regreso 1', 'En espera');
CALL sp_insertar_cita('2024-04-14 10:30:00', 2, 'Yo solo regreso el auto', 'Aguilares', 'Dirección de ida 2', 'Dirección de regreso 2', 'Aceptado');
CALL sp_insertar_cita('2024-04-15 08:45:00', 3, 'Yo llevo el auto y lo traigo de regreso', 'Ayutuxtepeque', 'Dirección de ida 3', 'Dirección de regreso 3', 'Cancelado');
CALL sp_insertar_cita('2024-04-16 11:00:00', 1, 'Yo llevo el auto y lo traigo de regreso', 'Ayutuxtepeque', 'Dirección de ida 4', 'Dirección de regreso 4', 'En espera');
CALL sp_insertar_cita('2024-04-17 14:30:00', 2, 'Yo llevo el auto y lo traigo de regreso', 'Aguilares', 'Dirección de ida 5', 'Dirección de regreso 5', 'Aceptado');
CALL sp_insertar_cita('2024-04-18 10:15:00', 3, 'Yo solo llevo el auto', 'Ayutuxtepeque', 'Dirección de ida 6', 'Dirección de regreso 6', 'En espera');
CALL sp_insertar_cita('2024-04-19 13:45:00', 1, 'Yo solo regreso el auto', 'Aguilares', 'Dirección de ida 7', 'Dirección de regreso 7', 'Cancelado');
CALL sp_insertar_cita('2024-04-20 09:30:00', 2, 'Yo llevo el auto y lo traigo de regreso', 'Ayutuxtepeque', 'Dirección de ida 8', 'Dirección de regreso 8', 'Aceptado');
CALL sp_insertar_cita('2024-04-21 12:00:00', 3, 'Yo solo llevo el auto', 'Aguilares', 'Dirección de ida 9', 'Dirección de regreso 9', 'En espera');
CALL sp_insertar_cita('2024-04-22 15:20:00', 1, 'Yo llevo el auto y lo traigo de regreso', 'Ayutuxtepeque', 'Dirección de ida 10', 'Dirección de regreso 10', 'Aceptado');

CALL sp_insertar_servicio_en_proceso('2024-04-13 10:00:00', '2024-04-13 14:00:00', '2024-04-13 13:30:00', 1, 1);
CALL sp_insertar_servicio_en_proceso('2024-04-14 11:30:00', '2024-04-14 16:30:00', NULL, 2, 2);
CALL sp_insertar_servicio_en_proceso('2024-04-15 09:15:00', '2024-04-15 12:30:00', '2024-04-15 12:00:00', 3, 3);
CALL sp_insertar_servicio_en_proceso('2024-04-16 13:00:00', '2024-04-16 17:00:00', '2024-04-16 16:30:00', 1, 4);
CALL sp_insertar_servicio_en_proceso('2024-04-17 15:45:00', '2024-04-17 18:30:00', NULL, 2, 5);
CALL sp_insertar_servicio_en_proceso('2024-04-18 10:30:00', '2024-04-18 15:00:00', '2024-04-18 14:45:00', 3, 6);
CALL sp_insertar_servicio_en_proceso('2024-04-19 14:15:00', '2024-04-19 17:30:00', '2024-04-19 17:00:00', 1, 7);
CALL sp_insertar_servicio_en_proceso('2024-04-20 11:20:00', '2024-04-20 16:45:00', NULL, 2, 8);
CALL sp_insertar_servicio_en_proceso('2024-04-21 10:00:00', '2024-04-21 12:30:00', '2024-04-21 12:15:00', 3, 9);
CALL sp_insertar_servicio_en_proceso('2024-04-22 16:30:00', '2024-04-22 20:00:00', '2024-04-22 19:45:00', 1, 10);

CALL sp_insertar_consumidor_final('2024-04-12', 'CONTADO', 12, 'Servicio de reparación de motor', 1, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-13', 'TARJETA', 6, 'Cambio de llantas', 2, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-14', 'CONTADO', 18, 'Mantenimiento preventivo', 3, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-15', 'TARJETA', 12, 'Reparación de sistema eléctrico', 4, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-16', 'CONTADO', 24, 'Venta de repuestos', 5, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-17', 'TARJETA', 9, 'Cambio de filtro de aire', 6, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-18', 'CONTADO', 15, 'Revisión de suspensión', 7, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-19', 'TARJETA', 18, 'Alineación y balanceo', 8, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-20', 'CONTADO', 12, 'Lavado de motor', 9, 'En espera');
CALL sp_insertar_consumidor_final('2024-04-21', 'TARJETA', 6, 'Cambio de bujías', 10, 'En espera');

CALL sp_insertar_detalle_consumidor_final(1, 1, 2, 50.00);
CALL sp_insertar_detalle_consumidor_final(2, 3, 1, 80.00);
CALL sp_insertar_detalle_consumidor_final(3, 2, 3, 120.00);
CALL sp_insertar_detalle_consumidor_final(4, 4, 1, 60.00);
CALL sp_insertar_detalle_consumidor_final(5, 5, 2, 150.00);
CALL sp_insertar_detalle_consumidor_final(6, 6, 1, 90.00);
CALL sp_insertar_detalle_consumidor_final(7, 7, 3, 110.00);
CALL sp_insertar_detalle_consumidor_final(8, 8, 1, 70.00);
CALL sp_insertar_detalle_consumidor_final(9, 9, 2, 180.00);
CALL sp_insertar_detalle_consumidor_final(10, 10, 1, 100.00);

CALL sp_insertar_credito_fiscal('00001', '2024-04-01', 'CONTADO', 12, 'Compra de equipo de oficina', 1, 'Oficina Central', '123456789-0', 'En espera');
CALL sp_insertar_credito_fiscal('00002', '2024-04-02', 'TARJETA', 6, 'Compra de mobiliario', 2, 'Mueblería El Hogar', '987654321-0', 'Completado');
CALL sp_insertar_credito_fiscal('00003', '2024-04-03', 'CONTADO', 18, 'Compra de suministros de limpieza', 3, 'Limpiezas S.A.', '456789123-0', 'Cancelado');
CALL sp_insertar_credito_fiscal('00004', '2024-04-04', 'TARJETA', 24, 'Compra de equipo de cómputo', 4, 'Tecnología Avanzada', '321654987-0', 'En espera');
CALL sp_insertar_credito_fiscal('00005', '2024-04-05', 'CONTADO', 12, 'Compra de materiales de construcción', 5, 'Ferretería La Construcción', '654987321-0', 'En espera');
CALL sp_insertar_credito_fiscal('00006', '2024-04-06', 'TARJETA', 6, 'Compra de herramientas', 6, 'Ferretería El Martillo', '147258369-0', 'Completado');
CALL sp_insertar_credito_fiscal('00007', '2024-04-07', 'CONTADO', 18, 'Pago de servicios de limpieza', 7, 'Servicios de Limpieza Rápida', '369258147-0', 'Cancelado');
CALL sp_insertar_credito_fiscal('00008', '2024-04-08', 'TARJETA', 24, 'Compra de productos de papelería', 8, 'Papelitos S.A.', '852369741-0', 'En espera');
CALL sp_insertar_credito_fiscal('00009', '2024-04-09', 'CONTADO', 12, 'Pago de factura de energía eléctrica', 9, 'Distribuidora de Energía', '741852963-0', 'En espera');
CALL sp_insertar_credito_fiscal('00010', '2024-04-10', 'TARJETA', 6, 'Compra de equipos de seguridad', 10, 'Seguridad Total', '963852741-0', 'Completado');

CALL sp_insertar_detalle_credito_fiscal(1,1, 2, 100.50);
CALL sp_insertar_detalle_credito_fiscal(2,2, 1, 75.25);
CALL sp_insertar_detalle_credito_fiscal(3,3, 3, 150.75);
CALL sp_insertar_detalle_credito_fiscal(4,4, 2, 90.00);
CALL sp_insertar_detalle_credito_fiscal(5,5, 4, 200.25);
CALL sp_insertar_detalle_credito_fiscal(6, 6, 1, 55.75);
CALL sp_insertar_detalle_credito_fiscal(7, 7, 3, 120.50);
CALL sp_insertar_detalle_credito_fiscal(8, 8, 2, 85.00);
CALL sp_insertar_detalle_credito_fiscal(9, 9, 1, 60.25);
CALL sp_insertar_detalle_credito_fiscal(10, 10, 4, 220.75);

CALL sp_insertar_seguimiento_consumidor_final(1, '2024-04-01', 'Seguimiento 1');
CALL sp_insertar_seguimiento_consumidor_final(2, '2024-04-02', 'Seguimiento 2');
CALL sp_insertar_seguimiento_consumidor_final(3, '2024-04-03', 'Seguimiento 3');
CALL sp_insertar_seguimiento_consumidor_final(4, '2024-04-04', 'Seguimiento 4');
CALL sp_insertar_seguimiento_consumidor_final(5, '2024-04-05', 'Seguimiento 5');
CALL sp_insertar_seguimiento_consumidor_final(6, '2024-04-06', 'Seguimiento 6');
CALL sp_insertar_seguimiento_consumidor_final(7, '2024-04-07', 'Seguimiento 7');
CALL sp_insertar_seguimiento_consumidor_final(8, '2024-04-08', 'Seguimiento 8');
CALL sp_insertar_seguimiento_consumidor_final(9, '2024-04-09', 'Seguimiento 9');
CALL sp_insertar_seguimiento_consumidor_final(10, '2024-04-10', 'Seguimiento 10');

CALL sp_insertar_seguimiento_credito_fiscal('2024-04-01', 'Seguimiento 1', 1);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-02', 'Seguimiento 2', 2);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-03', 'Seguimiento 3', 3);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-04', 'Seguimiento 4', 4);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-05', 'Seguimiento 5', 5);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-06', 'Seguimiento 6', 6);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-07', 'Seguimiento 7', 7);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-08', 'Seguimiento 8', 8);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-09', 'Seguimiento 9', 9);
CALL sp_insertar_seguimiento_credito_fiscal('2024-04-10', 'Seguimiento 10', 10);

CALL sp_insertar_usuario_cliente('clave1', TRUE, 1);
CALL sp_insertar_usuario_cliente('clave2', FALSE, 2);
CALL sp_insertar_usuario_cliente('clave3', TRUE, 3);
CALL sp_insertar_usuario_cliente('clave4', FALSE, 4);
CALL sp_insertar_usuario_cliente('clave5', TRUE, 5);
CALL sp_insertar_usuario_cliente('clave6', FALSE, 6);
CALL sp_insertar_usuario_cliente('clave7', TRUE, 7);
CALL sp_insertar_usuario_cliente('clave8', FALSE, 8);
CALL sp_insertar_usuario_cliente('clave9', TRUE, 9);
CALL sp_insertar_usuario_cliente('clave10', FALSE, 10);

CALL sp_insertar_especializacion_trabajador('Especialización 1', 1000.50);
CALL sp_insertar_especializacion_trabajador('Especialización 2', 1500.75);
CALL sp_insertar_especializacion_trabajador('Especialización 3', 2000.25);
CALL sp_insertar_especializacion_trabajador('Especialización 4', 1750.00);
CALL sp_insertar_especializacion_trabajador('Especialización 5', 1200.80);
CALL sp_insertar_especializacion_trabajador('Especialización 6', 1800.60);
CALL sp_insertar_especializacion_trabajador('Especialización 7', 1350.90);
CALL sp_insertar_especializacion_trabajador('Especialización 8', 1900.45);
CALL sp_insertar_especializacion_trabajador('Especialización 9', 2200.30);
CALL sp_insertar_especializacion_trabajador('Especialización 10', 2500.20);

CALL sp_insertar_trabajador(1, '123456789', '22334455', 'correo1@example.com', 'Juan', 'Pérez', 1, '123456789123456789', '2024-04-01', 1500.00);
CALL sp_insertar_trabajador(2, '987654321', '55443322', 'correo2@example.com', 'María', 'López', 2, '987654321987654321', '2024-04-02', 1600.00);
CALL sp_insertar_trabajador(3, '111222333', '33445566', 'correo3@example.com', 'Carlos', 'González', 3, '111222333111222333', '2024-04-03', 1700.00);
CALL sp_insertar_trabajador(4, '444555666', '66554433', 'correo4@example.com', 'Ana', 'Martínez', 4, '444555666444555666', '2024-04-04', 1800.00);
CALL sp_insertar_trabajador(5, '777888999', '99887766', 'correo5@example.com', 'Pedro', 'Sánchez', 5, '777888999777888999', '2024-04-05', 1900.00);
CALL sp_insertar_trabajador(6, '222333444', '44332211', 'correo6@example.com', 'Laura', 'Ramírez', 6, '222333444222333444', '2024-04-06', 2000.00);
CALL sp_insertar_trabajador(7, '555666777', '77665544', 'correo7@example.com', 'José', 'Hernández', 7, '555666777555666777', '2024-04-07', 2100.00);
CALL sp_insertar_trabajador(8, '888999000', '00998877', 'correo8@example.com', 'Sofía', 'Díaz', 8, '888999000888999000', '2024-04-08', 2200.00);
CALL sp_insertar_trabajador(9, '333444555', '12121121', 'correo9@example.com', 'Alejandro', 'Torres', 9, '333444555333444555', '2024-04-09', 2300.00);
CALL sp_insertar_trabajador(10, '666777888', '88776655', 'correo10@example.com', 'Marta', 'García', 10, '666777888666777888', '2024-04-10', 2400.00);

CALL sp_insertar_usuario('ejemplo1@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '123456789');
CALL sp_insertar_usuario('usuario2@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '987654321');
CALL sp_insertar_usuario('correo3@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '654321987');
CALL sp_insertar_usuario('usuario4@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '111222333');
CALL sp_insertar_usuario('ejemplo5@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '444555666');
CALL sp_insertar_usuario('correo6@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '777888999');
CALL sp_insertar_usuario('usuario7@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '222333444');
CALL sp_insertar_usuario('correo8@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '555666777');
CALL sp_insertar_usuario('usuario9@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '888999000');
CALL sp_insertar_usuario('ejemplo10@example.com', '$2y$10$CIR6.zqwAhhLBJ559K280.QrMzosro3PVuPQROd9S9UKIqbEBbgi6', '123123123');

CALL sp_insertar_forma_pago('Efectivo');
CALL sp_insertar_forma_pago('Tarjeta de crédito');
CALL sp_insertar_forma_pago('Transferencia bancaria');
CALL sp_insertar_forma_pago('Cheque');
CALL sp_insertar_forma_pago('PayPal');
CALL sp_insertar_forma_pago('Bitcoin');
CALL sp_insertar_forma_pago('Apple Pay');
CALL sp_insertar_forma_pago('Google Pay');
CALL sp_insertar_forma_pago('Samsung Pay');
CALL sp_insertar_forma_pago('Dinero en efectivo');

CALL sp_insertar_forma_pago_consumidor_final(1, 1);
CALL sp_insertar_forma_pago_consumidor_final(2, 2);
CALL sp_insertar_forma_pago_consumidor_final(3, 3);
CALL sp_insertar_forma_pago_consumidor_final(4, 4);
CALL sp_insertar_forma_pago_consumidor_final(5, 5);
CALL sp_insertar_forma_pago_consumidor_final(6, 6);
CALL sp_insertar_forma_pago_consumidor_final(7, 7);
CALL sp_insertar_forma_pago_consumidor_final(8, 8);
CALL sp_insertar_forma_pago_consumidor_final(9, 9);
CALL sp_insertar_forma_pago_consumidor_final(10, 10);
