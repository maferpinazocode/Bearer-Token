# OAuth Server con Tokens Bearer

Este proyecto implementa un servidor OAuth para la generación de tokens Bearer y un backend que los recibe en cada request, verificando la autenticación del usuario.

## Características

- **Servidor OAuth**: Genera y expira tokens de autenticación.
- **Servidor Backend**: Recibe peticiones con tokens y valida la autenticación.
- **Uso de JWT**: Para la autenticación y gestión de sesiones.
- **Protección de rutas**: Solo permite acceso con un token válido.

## Estructura del Proyecto

```
oauth-server    
│── backend-server
│   ├── node_modules
│   ├── server.js
│   ├── .env
│   ├── package.json
│── auth-server
│   ├── node_modules
│   ├── server.js
│   ├── .env
│   ├── package.json
```

## Instalación y Configuración

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tuusuario/tu-repositorio.git
   ```
2. Instalar dependencias en ambos servidores:
   ```sh
   cd oauth-server/auth-server
   npm install
   cd ../backend-server
   npm install
   ```
3. Crear archivos `.env` en `auth-server` y `backend-server` con las siguientes variables:
   ```env
   # En auth-server/.env
   SECRET_KEY=tu_secreto
   PORT=4000
   ```
   ```env
   # En backend-server/.env
   SECRET_KEY=tu_secreto
   PORT=5000
   ```

## Uso

### 1. Iniciar los servidores

En `auth-server`:

```sh
node server.js
```

En `backend-server`:

```sh
node server.js
```

### 2. Generar un token

Hacer una petición POST a `http://localhost:4000/login` con el siguiente JSON en el cuerpo:

```json
{
  "username": "admin",
  "password": "popo"
}
```

Recibirás un token en la respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. Acceder al backend con el token

Hacer una petición GET a `http://localhost:5000/data` con el token en los headers:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Respuesta esperada:

```json
{
  "message": "Acceso permitido",
  "user": {
    "username": "admin",
    "iat": 1743254352,
    "exp": 1743257952
  }
}
```

### 4. Otras rutas disponibles en el backend

- `GET /profile` → Devuelve los datos del usuario autenticado.
- `GET /settings` → Simula configuraciones del usuario.
- `POST /logout` → Mensaje indicando que el usuario debe borrar el token en el cliente.

## Tecnologías Utilizadas

- **Node.js** con **Express**
- **jsonwebtoken (JWT)** para autenticación
- **dotenv** para manejo de variables de entorno
- **cors** para permitir conexiones externas

## Notas

- Asegúrate de que los servidores corren en los puertos correctos.
- Si hay errores con las variables de entorno, revisa la codificación del archivo `.env` y que esté correctamente cargado.


