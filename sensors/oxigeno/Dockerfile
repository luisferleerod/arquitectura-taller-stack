# Dockerfile común para todos los sensores

# Usamos la imagen base de Python
FROM python:3.9-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos locales dentro del contenedor
COPY . /app

# Instalamos las dependencias necesarias (en este caso, paho-mqtt)
RUN pip install --no-cache-dir paho-mqtt

# Exponemos el puerto (aunque para sensores no es necesario)
EXPOSE 1883

# Comando para ejecutar el script del sensor cuando inicie el contenedor
CMD ["python", "sensor.py"]
