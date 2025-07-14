# Entrega N° 1: Ecommerce Backend con Autenticación JWT

## Descripción
Backend para un ecommerce con sistema de usuarios, incluyendo registro, login y CRUD completo, protegido con autenticación JWT. Incluye una interfaz web para probar los endpoints.

## Tecnologías
- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- Passport (estrategia JWT)
- JSON Web Token
- Tailwind CSS (interfaz web)

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ddavid8576/Ecommerce.git
   cd Ecommerce

   Instala las dependencias

npm install

Crea un archivo .env en la raíz del proyecto con:env

MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_secreto_unico_y_seguro_2025
PORT=3000

Asegúrate de que MongoDB esté corriendo

mongod

Inicia el servidor

node server.js

