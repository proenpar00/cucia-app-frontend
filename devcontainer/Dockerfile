FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Copiar el archivo .env para que las variables estén disponibles durante el build
COPY .env ./

COPY . .

# Fix de permisos y build en un solo paso
RUN chmod +x ./node_modules/.bin/react-scripts && npm run build

RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]
