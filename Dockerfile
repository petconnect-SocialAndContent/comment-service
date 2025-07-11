# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --only=production

# Copiar el resto del código fuente
COPY . .

# Etapa 2: Imagen final
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3007

CMD ["node", "server.js"]
