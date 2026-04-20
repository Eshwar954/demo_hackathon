# Carbon Credit Tracking and Trading System

This repository contains a full-stack application for managing carbon credit projects, verification, listing, purchase, and ledger tracking.

## Repository Structure

- `demo/` Spring Boot backend (Java 17, Maven, JPA)
- `frontend/` React + Vite frontend

## Tech Stack

### Backend

- Spring Boot 4.0.5
- Spring Web MVC
- Spring Data JPA
- Lombok
- MySQL (configured in `demo/src/main/resources/application.properties`)

### Frontend

- React 19
- Vite 8
- ESLint

## Backend Setup

1. Go to the backend folder:

```bash
cd demo
```

2. Update database settings if needed in:

- `demo/src/main/resources/application.properties`

Current config points to:

- URL: `jdbc:mysql://localhost:3306/he`
- Username: `root`
- Password: `Sudheesh@123`

3. Start the backend:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8080`

## Frontend Setup

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Frontend Build and Lint

From `frontend/`:

```bash
npm run build
npm run lint
```

## API Proxy

Vite proxy is configured in `frontend/vite.config.js`:

- `/api` requests are proxied to `http://localhost:8080`

## Main Backend APIs

### Users

- `POST /api/users` create user
- `POST /api/users/login` login by email and password
- `GET /api/users` list users
- `GET /api/users/role/{role}` list users by role

### Projects

- `POST /api/projects` create project
- `GET /api/projects` list projects

### Credits

- `GET /api/credits` list credits
- `GET /api/credits/{projectId}` get credits by project

### Listings

- `POST /api/listings` create listing
- `GET /api/listings` list all listings
- `GET /api/listings/active` list active listings

### Transactions

- `POST /api/transactions` purchase credits
- `GET /api/transactions` list transactions

### Ledger

- `GET /api/ledger` list all ledger entries
- `GET /api/ledger/credit/{creditId}` list ledger entries for one credit

### Verifications

- `POST /api/verifications` verify project (returns plain text response)

## Roles in UI

- `ADMIN`: create users, review and verify projects, monitor system summary
- `PROJECT_OWNER`: create projects, manage own project workflow, create listings
- `BUYER`: view active listings, purchase credits, review transaction and ledger pages

## Authentication Behavior

- Admin login is fixed in frontend logic:
  - Email: `admin@gmail.com`
  - Password: `admin123`
- Non-admin login uses backend endpoint `POST /api/users/login`
- Frontend stores successful demo login accounts in local storage for convenience

## Important Notes

- Ensure MySQL is running before starting backend.
- Backend and frontend should run simultaneously for full functionality.
- If API changes are made in backend controllers/DTOs, update `frontend/src/services/api.js` accordingly.
