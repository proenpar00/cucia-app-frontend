FROM node:21

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Construimos la app React (crea la carpeta build)
RUN npm run build

# Instalamos 'serve' para servir la app estática
RUN npm install -g serve

EXPOSE 3001

# Usamos serve para lanzar el build estático
CMD ["serve", "-s", "build", "-l", "3001"]
