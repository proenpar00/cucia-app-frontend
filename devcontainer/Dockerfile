FROM node:21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Solución al problema de permisos
RUN chmod +x ./node_modules/.bin/react-scripts

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]
