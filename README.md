# Entrega Final: Ecommerce Backend

## Descripción
Backend para un ecommerce con autenticación JWT, patrón Repository, DTO, recuperación de contraseña, roles y autorización, y lógica de compra con tickets.

## Tecnologías
- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- Passport (estrategia JWT)
- JSON Web Token
- Nodemailer
- Tailwind CSS (interfaz web)

## Instalación
1. Clona el repositorio:
   git clone https://github.com/Ddavid8576/Ecommerce.git
   cd Ecommerce

Instala las dependencias:

npm install

Crea un archivo .env con las variables de .env.example.
Asegúrate de que MongoDB esté corriendo:

mongod

Inicia el servidor:
node server.js

EndpointsUsuarios:POST /api/sessions/register
POST /api/sessions/login
GET /api/sessions/current
GET /api/sessions/users
GET /api/sessions/users/:id
PUT /api/sessions/users/:id
DELETE /api/sessions/users/:id
POST /api/sessions/request-password-reset
POST /api/sessions/reset-password

Productos (solo admin):POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

Carrito (solo user):POST /api/carts/add
POST /api/carts/purchase

NotasMongoDB debe estar corriendo.
Los datos se guardan en la base de datos ecommerce.
Las contraseñas se encriptan con bcrypt.
Las rutas protegidas usan JWT y autorización por roles.

