# TP Desarrollo de software 1c - 2026

### Integrantes
- Conde, Franco: frconde@frba.utn.edu.ar
- Etcheto, Ricardo: retchetosoma@frba.utn.edu.ar
- García Araya, Francisco: fgarciaaraya@frba.utn.edu.ar
- Fernandez, Gonzalo Jose: gfernndez@frba.utn.edu.ar

### Sistema de branches
En el grupo decidimos utilizar `git flow` para el desarrollo, contamos con la branch `develop` la cual tiene las ultimas implementaciones estables del proyecto y varias ramas auxiliares trabajando en sus propias features
 

### Comandos en el repo
- `npm install` para instalar las dependencias utilizadas:
    - `express`
    - `zod`
    - `jest`
- `npm test` para correr las pruebas en `/test`
- `npm start` para iniciar el servidor

### Servidor
El servidor se encuentra corriendo en `localhost` sobre el puerto `3000` y el repo cuenta con un `JSON` de postman con algunas peticiones ya hechas

#### Endpoints implementados
- /healthcheck
    - con este checkpoint podemos verificar el estado de salud del sistema
- /medicos
    - `POST` para crear medicos 
    - `GET` para tener todos los medicos de manera paginada y mediante filtros
    - /:id/disponibilidades
        - `POST` para la creación de estos 
        - `DELETE` para la eliminación de las disponibilidades
    - /:id/sedes
        - `POST` para la asignación de sedes a los medicos
- /turnos
    - `POST` para crear turnos 
    - `GET` para obtener todos mediante paginas y filtros
    - /:id
        - `GET` para obtener un turno por id
        - `PUT` para actualizar un turno
        - `DELETE` para eliminar un turno
    - /:id/estado
        - `POST` para actualizar el estado de un turno
- /sedes
    - `POST` para crear sedes 
    - `GET` para obtener todas las sedes
- /practicas
    - `POST` para crear practicas 
    - `GET` para obtener todas las practicas
