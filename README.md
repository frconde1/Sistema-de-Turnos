# SweetMedical 🏥

A full-stack medical appointment management system — patients search for appointments, book them, and track them through their lifecycle, while doctors manage their schedule, availability, and appointment states.

Built as a team project applying clean architecture, domain-driven design, automated testing, and CI/CD from day one.

<img width="1491" height="560" alt="image" src="https://github.com/user-attachments/assets/318fa3a2-29d1-4078-b2e0-0fa015cc6914" />


## ✨ Features

**Authentication & Roles**
- JWT-based authentication with role-protected routes (Patient / Doctor)
- Secure password-based login and registration

**Patient experience**
- Search available appointments with combined filters (doctor, specialty, practice, location, date range, price ordering)
- See the final price after **health-insurance coverage** is applied (total / partial / uncovered)
- Pre-select and request appointments, view own appointment history and state timeline
<img width="1360" height="699" alt="image" src="https://github.com/user-attachments/assets/5a7e237f-b07d-4da3-9caf-41f16e936cd7" />


**Doctor experience**
- Dashboard of own appointments with full state management
- CRUD of weekly availability slots (day + time range) per doctor
- Assign practices, specialties, and locations to a doctor profile
<img width="1391" height="602" alt="image" src="https://github.com/user-attachments/assets/3c5c90e9-5b44-44e1-a152-06be70b56dde" />


**Platform**
- Appointment lifecycle with a full **state-change audit trail**
- Pagination + filtering on all list endpoints
- Interactive Swagger documentation
- Notifications for users
- MongoDB persistence with Dockerized database

## 🧱 Tech Stack

| Layer      | Technology |
|------------|------------|
| Backend    | Node.js, Express 5 |
| Database   | MongoDB (Mongoose) |
| Validation | Zod |
| Auth       | JSON Web Tokens (jsonwebtoken) |
| Frontend   | React 19, React Router 7, Axios |
| UI         | React Bootstrap + Bootstrap Icons |
| Docs       | Swagger (swagger-jsdoc + swagger-ui-express) |
| Testing    | Jest |
| Infra      | Docker, Docker Compose, GitHub Actions (CI/CD) |

## 🏛️ Architecture

The backend follows a **layered architecture** with domain-driven design — business rules live in rich domain models decoupled from persistence, while controllers, services, and repositories keep responsibilities separated:

```
client (React)
   │  REST / JSON (JWT Bearer)
   ▼
routes → controller → service ──► domain (business rules)
                              └──► repository (MongoDB / Mongoose)
```

- **Domain** — rich models (`Medico`, `Paciente`, `Turno`, `Sede`, `Practica`, `ObraSocial`, ...) encapsulating behavior like `validarDisponibilidad()`, `CambiarEstado()`, and coverage pricing.
- **Service** — orchestration and business workflows, validated with **Zod** schemas.
- **Repository** — MongoDB persistence via Mongoose.
- **Middleware** — JWT verification on protected routes.

### Appointment state machine

Each appointment transitions through a fixed lifecycle, recording who changed it, when, and why:

```
DISPONIBLE → RESERVADO → CONFIRMADO → REALIZADO
                    ↘ CANCELADO
```

## 📁 Project Structure

```
├── server/                 # Express API
│   ├── app.js              # App setup (CORS, JSON, Swagger, routes)
│   ├── server.js           # Bootstrap (env, MongoDB, listen)
│   ├── swagger.js          # OpenAPI/Swagger config
│   ├── routes/             # REST routers (per resource)
│   ├── controller/         # HTTP layer
│   ├── service/            # Business workflows + Zod validation
│   ├── domain/             # Domain models & DTOs
│   ├── repository/         # Mongoose persistence
│   ├── middleware/         # JWT auth
│   ├── errors/             # Centralized error handling
│   └── tests/              # Jest unit tests
├── client/                 # React SPA
│   └── src/
│       ├── pages/          # Login, patient & doctor dashboards, search…
│       ├── features/       # Layouts, panels, notifications
│       ├── context/        # Auth & notification state
│       └── components/     # Shared UI
├── docker-compose.yml      # MongoDB for local dev
├── docker-compose.prod.yml # Backend + MongoDB (prod)
└── Operaciones_Postman.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker + Docker Compose (for MongoDB)
- npm

### 1. Clone & install dependencies

```bash
git clone <repo-url>
cd <repo>
npm install            # backend deps (run inside /server)
cd client && npm install
```

### 2. Start MongoDB

```bash
docker compose up -d
```

### 3. Configure environment

Copy `server/.env.example` to `server/.env` (or the repo root `.env.example`) and adjust:

```env
MONGO_USER=admin
MONGO_PASS=admin123
MONGO_DB=sweetmedical
MONGO_URI=mongodb://admin:admin123@localhost:27017/sweetmedical?authSource=admin
PORT=3001
JWT_SECRET=your-secret
```

> For local development, use `localhost` in `MONGO_URI` instead of the Docker service name.

### 4. Run the API

```bash
cd server && npm start
```

Server runs at `http://localhost:3001` — Swagger docs at `http://localhost:3001/docs`.

### 5. Run the client

```bash
cd client && npm start
```

Client runs at `http://localhost:3000` (development mode with hot reload).

## 📡 API Overview

All routes are prefixed with `/api` and (except `/health`) require a `Bearer` JWT token.

| Resource | Methods | Notes |
|----------|---------|-------|
| `/health` | GET | Health check |
| `/usuarios` | POST, GET | Registration & login |
| `/medicos` | POST, GET | Paginated, filterable; manages availability, specialties, practices, locations |
| `/pacientes` | GET, POST | Patient management |
| `/turnos` | GET, POST, PUT, PATCH, DELETE | Appointment lifecycle + state changes |
| `/sedes` | GET, POST | Locations |
| `/practicas` | GET, POST | Medical practices |
| `/especialidades` | GET, POST | Specialties |
| `/planes` / `/obrasSociales` | GET, POST | Health-insurance plans & coverages |
| `/notificaciones` | GET, POST | User notifications |

### Example: search appointments with filters

```
GET /api/turnos?medico=1&estado=1&ordenFecha=0&numeroPagina=1&limitePorPagina=10
```

Appointment states: `0` DISPONIBLE · `1` RESERVADO · `2` CONFIRMADO · `3` CANCELADO · `4` REALIZADO

## 🧪 Testing

Backend unit tests cover domain models and services:

```bash
cd server && npm test
```

> Jest runs with Node's experimental ES modules support, so tests use `node --experimental-vm-modules`.

## 🐳 Production Deployment

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Spins up the backend (behind port `80`) and MongoDB. CI/CD is wired through **GitHub Actions** to deploy the frontend and backend on pushes to `develop`.

## 🛠️ Key Engineering Highlights

- **Rich domain models** over anemic CRUD — business rules are testable in isolation
- **State machine** for appointments with a full audit history
- **Layered architecture** that keeps HTTP, business logic, and persistence decoupled
- **Zod** schemas for runtime validation of all inputs
- **Swagger** auto-generated from the codebase
- **40+ unit tests** across domain and service layers
- **Git Flow** workflow with feature branches off `develop`
