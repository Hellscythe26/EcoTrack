CREATE DATABASE ecotrackdb;
USE ecotrackdb;

CREATE TABLE producto(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    categoria varchar(100) NOT NULL,
    activo TINYINT NOT NULL
);

CREATE TABLE lote(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    fecha_vencimiento DATETIME NOT NULL,
    cantidad INT NOT NULL,
    estado TINYINT NOT NUll,
    activo TINYINT NOT NULL,
    CONSTRAINT fk_lote_producto FOREIGN KEY(producto_id) REFERENCES producto(id)
);