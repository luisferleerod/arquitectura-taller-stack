# Usa una imagen base de Python
FROM python:3.9

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo requirements.txt al contenedor
COPY requirements.txt /app/

# Instalar las dependencias del backend
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del proyecto al contenedor
COPY . /app/

# Exponer el puerto en el que Django corre (por defecto el 8000)
EXPOSE 8000

# Comando para ejecutar el backend con Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
