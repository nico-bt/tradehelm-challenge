# Tradehelm / Kopius Challenge

Enunciado sacado del github de Goncy:  
https://github.com/goncy/tradehelm-challenge/blob/main/README.md

### Live: https://supermarket-list-nico-bt.vercel.app/

### Backend:
- REST API hecha con Node + Express  
- Base de datos: MongoDB
### Frontend:
- React + Next

# API Endpoints

## Items
Todos los endpoints para items requieren incluir en el header del request un "Bearer [token]".  
Sólo se da acceso a los items creados por el user al que corresponde el token.

| Método | Ruta                    | Descripción                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | /api/items              | Obtener todos los items            |
| POST   | /api/items              | Crear un nuevo item                |
| GET    | /api/items/:id          | Obtener un item por su ID          |
| PATCH  | /api/items/:id          | Actualizar un item por su ID       |
| DELETE | /api/items/:id          | Eliminar un item por su ID         |

## Users
| Método | Ruta                    | Descripción                        | 
| ------ | ----------------------- | ---------------------------------- |
| POST   | /api/users/signup       | Crear un nuevo usuario             |
| POST   | /api/users/login        | Login user existente               |

