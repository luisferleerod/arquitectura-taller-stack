# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo requirements.txt al contenedor
COPY requirements.txt /app/

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos del servicio
COPY . /app/

# Expon el puerto del servicio
EXPOSE 4000

# Comando para iniciar el servicio de sensores
CMD ["python", "-u", "sensor.py"]

