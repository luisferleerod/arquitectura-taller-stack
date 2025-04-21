# Usando una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias forzando la resolución de dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente
COPY . .
RUN npm run build
# Expone el puerto
EXPOSE 3000

# Ejecuta la aplicación Next.js
CMD ["npm", "run", "start"]
