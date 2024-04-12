##________________________ TRIGGERS ____________
##Trigger que genera un nùmero de factura unico antes de insertar la factura
##De manera que no sea necesario ir poniendolo de manera manual
DELIMITER //
CREATE TRIGGER before_insert_consumidor_final
BEFORE INSERT ON tb_consumidores_finales
FOR EACH ROW
BEGIN
    DECLARE nuevo_numero_factura VARCHAR(5);
    DECLARE contador INT;

    -- Obtiene el último número de factura insertado
    SELECT IFNULL(MAX(CAST(SUBSTRING(numero_factura, 2) AS UNSIGNED)), 0) INTO contador
    FROM tb_consumidores_finales;

    -- Incrementa el contador
    SET contador = contador + 1;

    -- Formatea el nuevo número de factura
    SET nuevo_numero_factura = LPAD(contador, 5, '0');

    -- Asigna el nuevo número de factura al nuevo registro
    SET NEW.numero_factura = nuevo_numero_factura;
END;
//
DELIMITER ;


##________________________ FUNCIONES ____________
##Funciòn que devuelve el id unico de una factura a partir del nùmero de factura
##(Se hace para que en un futuro si necesitamos hacer alguna inserciòn, actualizacion, busqueda, etc que haga referencia a la factura
## en vez de una subconsulta cada vez, simplemente llamar a la funciòn, ademas, en la bùsqueda de factura se utiliza el nùmero de la factura)
DELIMITER //
CREATE FUNCTION obtener_id_consumidor_final(
    p_numero_factura VARCHAR(5)
)
RETURNS INT
BEGIN
    DECLARE id_consumidor_final_encontrado INT;
    -- Busca el ID del consumidor final basado en el número de factura
    SELECT id_consumidor_final INTO id_consumidor_final_encontrado
    FROM tb_consumidores_finales
    WHERE numero_factura = p_numero_factura;
    -- Devuelve el ID del consumidor final encontrado
    RETURN id_consumidor_final_encontrado;
END //
DELIMITER ;
SELECT obtener_id_consumidor_final('00002'); 


-- 1. SELECT para tb_departamentos
SELECT * FROM tb_departamentos;
-- 2. SELECT para tb_clientes
SELECT * FROM tb_clientes; 
-- 3. SELECT para tb_marcas_automoviles
SELECT * FROM tb_marcas_automoviles;
-- 4. SELECT para tb_modelos_automoviles
SELECT * FROM tb_modelos_automoviles;
-- 5. SELECT para tb_tipos_automoviles
SELECT * FROM tb_tipos_automoviles;
-- 6. SELECT para tb_colores
SELECT * FROM tb_colores;
-- 7. SELECT para tb_automoviles
SELECT * FROM tb_automoviles;
-- 8. SELECT para tb_tipos_servicios
SELECT * FROM tb_tipos_servicios;
-- 9. SELECT para tb_servicios
SELECT * FROM tb_servicios;
-- 10. SELECT para tb_citas
SELECT * FROM tb_citas;
-- 11. SELECT para tb_servicios_en_proceso
SELECT * FROM tb_servicios_en_proceso;
-- 12. SELECT para tb_consumidores_finales
SELECT * FROM tb_consumidores_finales;
-- 13. SELECT para tb_detalles_consumidores_finales
SELECT * FROM tb_detalles_consumidores_finales;
-- 14. SELECT para tb_creditos_fiscales
SELECT * FROM tb_creditos_fiscales;
-- 15. SELECT para tb_detalles_creditos_fiscales
SELECT * FROM tb_detalles_creditos_fiscales;
-- 16. SELECT para tb_seguimientos_consumidores_finales
SELECT * FROM tb_seguimientos_consumidores_finales;
-- 17. SELECT para tb_seguimientos_creditos_fiscales
SELECT * FROM tb_seguimientos_creditos_fiscales;
-- 18. SELECT para tb_usuarios_clientes
SELECT * FROM tb_usuarios_clientes;
-- 19. SELECT para tb_especializaciones_trabajadores
SELECT * FROM tb_especializaciones_trabajadores;
-- 20. SELECT para tb_trabajadores
SELECT * FROM tb_trabajadores;
-- 21. SELECT para tb_usuarios
SELECT * FROM tb_usuarios;
-- 22. SELECT para tb_formas_pagos
SELECT * FROM tb_formas_pagos;
-- 23. SELECT para tb_formas_pagos_consumidores_finales
SELECT * FROM tb_formas_pagos_consumidores_finales;


