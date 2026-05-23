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

# Query Params — GET /turnos

## Parámetros disponibles

| Parámetro        | Tipo   | Descripción                                              |
|------------------|--------|----------------------------------------------------------|
| `numeroPagina`   | Number | Número de página (default: 1)                            |
| `limitePorPagina`| Number | Cantidad de resultados por página (default: 10)          |
| `medico`         | String | Filtra por id de médico                                  |
| `paciente`       | String | Filtra por id de paciente                                |
| `sede`           | String | Filtra por id de sede                                    |
| `practica`       | String | Filtra por id de práctica                                |
| `estado`         | Number | Filtra por estado del turno (ver tabla de estados)       |
| `ordenCosto`     | Number | Ordena por costo: `0` ascendente, `1` descendente        |
| `ordenFecha`     | Number | Ordena por fecha: `0` ascendente, `1` descendente        |
| `fechaInicio`    | String | Fecha de inicio del rango (ISO 8601)                     |
| `fechaFin`       | String | Fecha de fin del rango (ISO 8601)                        |

---

## Estados de turno

| Valor | Estado       |
|-------|--------------|
| `0`   | DISPONIBLE   |
| `1`   | RESERVADO    |
| `2`   | CONFIRMADO   |
| `3`   | CANCELADO    |
| `4`   | REALIZADO    |

---

## Ejemplos

### Obtener todos los turnos paginados
```
GET /turnos?numeroPagina=1&limitePorPagina=10
```

### Filtrar por médico
```
GET /turnos?medico=1&numeroPagina=1&limitePorPagina=10
```

### Filtrar por estado
```
GET /turnos?estado=1&numeroPagina=1&limitePorPagina=10
```

### Ordenar por costo ascendente
```
GET /turnos?ordenCosto=0&numeroPagina=1&limitePorPagina=10
```

### Ordenar por fecha descendente
```
GET /turnos?ordenFecha=1&numeroPagina=1&limitePorPagina=10
```

### Filtrar por rango de fechas
```
GET /turnos?fechaInicio=2026-06-01T00:00:00-03:00&fechaFin=2026-06-30T23:59:59-03:00&numeroPagina=1&limitePorPagina=10
```

### Combinar filtros
```
GET /turnos?medico=1&estado=1&ordenFecha=0&numeroPagina=1&limitePorPagina=10
```
