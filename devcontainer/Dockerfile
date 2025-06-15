# Etapa 1: Build de React
FROM node:21-bullseye AS builder

WORKDIR /app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Etapa 2: Imagen final para servir archivos estáticos
FROM node:21-bullseye

WORKDIR /app

# Instalar solo `serve` para producción
RUN npm install -g serve

# Copiar build generado
COPY --from=builder /app/build ./build

# Exponer el puerto usado por `serve`
EXPOSE 3001

# Comando para servir la app
CMD ["serve", "-s", "build", "-l", "3001"]
