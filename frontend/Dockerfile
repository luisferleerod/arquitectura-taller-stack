# Usamos una imagen oficial de Node.js como base
FROM node:16

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el contenido de la aplicación al contenedor
COPY . .

# Exponemos el puerto en el que Next.js se ejecutará (default es 3000)
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "dev"]
