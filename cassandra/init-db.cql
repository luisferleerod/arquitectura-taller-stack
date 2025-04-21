-- Eliminar el keyspace si ya existe (esto borra todas las tablas y datos)
DROP KEYSPACE IF EXISTS sensores_app;

-- Crear keyspace para la aplicación
CREATE KEYSPACE IF NOT EXISTS sensores_app 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Usar el keyspace
USE sensores_app;

-- Tabla para iot_dispositivo
CREATE TABLE IF NOT EXISTS iot_dispositivo (
    id UUID PRIMARY KEY,
    nombre TEXT,
    tipo TEXT,
    estado TEXT
);

-- Tabla para lecturas
CREATE TABLE IF NOT EXISTS iot_lectura (
    id UUID,
    tipo TEXT,
    dispositivo_id UUID,
    valor FLOAT,
    timestamp TIMESTAMP,
    PRIMARY KEY (dispositivo_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

-- Indexar para búsquedas por timestamp
CREATE INDEX IF NOT EXISTS ON iot_lectura (timestamp);
CREATE INDEX iot_dispositivo_tipo_idx ON sensores_app.iot_dispositivo (tipo);

-- Insertar algunos dispositivos de ejemplo
INSERT INTO iot_dispositivo (id, nombre, tipo, estado) 
VALUES (uuid(), 'Sensor Temperatura 1', 'Temperatura', 'activo');

INSERT INTO iot_dispositivo (id, nombre, tipo, estado) 
VALUES (uuid(), 'Sensor Humedad 1', 'Humedad', 'activo');

INSERT INTO iot_dispositivo (id, nombre, tipo, estado) 
VALUES (uuid(), 'Sensor Oxigeno 1', 'Oxigeno', 'activo');

