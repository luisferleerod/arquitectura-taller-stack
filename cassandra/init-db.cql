-- Crear keyspace para la aplicación
CREATE KEYSPACE IF NOT EXISTS sensores_app 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Usar el keyspace
USE sensores_app;

-- Tabla para dispositivos
CREATE TABLE IF NOT EXISTS dispositivos (
    id UUID PRIMARY KEY,
    nombre TEXT,
    tipo TEXT,
    estado TEXT
);

-- Tabla para lecturas
CREATE TABLE IF NOT EXISTS lecturas (
    id UUID,
    dispositivo_id UUID,
    valor FLOAT,
    timestamp TIMESTAMP,
    PRIMARY KEY (dispositivo_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

-- Indexar para búsquedas por timestamp
CREATE INDEX IF NOT EXISTS ON lecturas (timestamp);

-- Insertar algunos dispositivos de ejemplo
INSERT INTO dispositivos (id, nombre, tipo, ubicacion, estado) 
VALUES (uuid(), 'Sensor Temperatura 1', 'sensor', 'Sala principal', 'activo');

INSERT INTO dispositivos (id, nombre, tipo, ubicacion, estado) 
VALUES (uuid(), 'Sensor Humedad 1', 'sensor', 'Exterior', 'activo');

INSERT INTO dispositivos (id, nombre, tipo, ubicacion, estado) 
VALUES (uuid(), 'Sensor Oxigeno 1', 'sensor', 'Laboratorio', 'activo');