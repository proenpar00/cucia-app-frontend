# Imagen base con Node y Python en entorno compatible
FROM node:21-bullseye

# Instalar Python, pip y git
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv git && \
    apt-get clean

WORKDIR /app

# Crear entorno virtual
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Copiar e instalar dependencias Node.js
COPY package*.json ./
RUN npm ci

# Copiar e instalar dependencias Python
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copiar el resto del proyecto
COPY . .

# Crear carpeta uploads
RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "app.js"]
