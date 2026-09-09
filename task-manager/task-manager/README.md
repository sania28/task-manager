# TaskFlow — Task Management Web App

A full-stack task management application with JWT authentication, task CRUD, and
real-time updates over WebSockets. Built as a learning project covering
full-stack structure, REST API integration, and dynamic data handling.

## Stack

| Layer     | Tech |
|-----------|------|
| Backend   | Java 17, Spring Boot 3.3, Spring Security, Spring Data MongoDB, Spring WebSocket (STOMP/SockJS), JWT (jjwt) |
| Frontend  | React 18, Vite, React Router, Axios, @stomp/stompjs, SockJS |
| Database  | MongoDB |

## Features

- **Auth**: register/login with email + password, BCrypt-hashed passwords, JWT bearer tokens, protected routes on both client and server
- **Tasks**: create, read, update, delete — each task scoped to its owner, with title, description, status (`TODO` / `IN_PROGRESS` / `DONE`), priority (`LOW`/`MEDIUM`/`HIGH`), and due date
- **Real-time**: server pushes `CREATED` / `UPDATED` / `DELETED` events over a per-user WebSocket topic, so any open tab/device for that user updates instantly without a page refresh
- **Responsive UI**: card grid collapses to a single column, header/filters stack, on screens under 640px

## Project structure

```
task-manager/
├── backend/                 Spring Boot API
│   └── src/main/java/com/taskmanager/
│       ├── config/          Security + WebSocket configuration
│       ├── controller/      REST controllers (auth, tasks)
│       ├── dto/             Request/response payloads
│       ├── exception/       Custom exceptions + global handler
│       ├── model/           MongoDB documents (User, Task)
│       ├── repository/      Spring Data Mongo repositories
│       ├── security/        JWT filter/service, UserDetailsService
│       └── service/         Business logic + WebSocket broadcasting
└── frontend/                React (Vite) SPA
    └── src/
        ├── components/      Navbar, TaskCard, TaskForm, ProtectedRoute
        ├── context/          AuthContext (login state)
        ├── pages/            Login, Register, Dashboard
        └── services/         api.js (REST), socket.js (WebSocket)
```

## Running locally

### Prerequisites
- Java 17+ and Maven
- Node.js 18+ and npm
- MongoDB running locally on `mongodb://localhost:27017` (or update the URI below)

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`. Config lives in
`src/main/resources/application.properties`:

- `spring.data.mongodb.uri` — MongoDB connection string
- `app.jwt.secret` — **change this** to a long random string before any real deployment
- `app.jwt.expiration-ms` — token lifetime (default 24h)
- `app.cors.allowed-origins` — must match the frontend's origin (default `http://localhost:5173`)

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173` and talks to the backend at
`http://localhost:8080` (see `API_BASE_URL` in `src/services/api.js`).

### 3. Try it out

1. Open `http://localhost:5173`, register a new account.
2. Create a few tasks, filter by status, edit/delete/advance status.
3. Open the same account in a second browser tab — changes in one tab appear
   in the other instantly via the WebSocket connection (the green dot in the
   navbar indicates the live connection is up).

## API reference

| Method | Endpoint            | Auth required | Description               |
|--------|----------------------|:---:|----------------------------|
| POST   | `/api/auth/register`| No  | Create account, returns JWT |
| POST   | `/api/auth/login`   | No  | Log in, returns JWT |
| GET    | `/api/tasks`         | Yes | List current user's tasks (optional `?status=` filter) |
| GET    | `/api/tasks/{id}`    | Yes | Get one task |
| POST   | `/api/tasks`         | Yes | Create a task |
| PUT    | `/api/tasks/{id}`    | Yes | Update a task |
| DELETE | `/api/tasks/{id}`    | Yes | Delete a task |

Authenticated requests need `Authorization: Bearer <token>`.

WebSocket endpoint: `ws://localhost:8080/ws` (SockJS). Clients subscribe to
`/topic/tasks/{userId}` to receive live task events.

## Notes / possible next steps

- Passwords are BCrypt-hashed; JWT secret and Mongo URI should move to
  environment variables for anything beyond local learning use.
- No pagination on the task list yet — fine for personal use, worth adding
  for larger datasets.
- No automated tests included; `spring-boot-starter-test` and
  `spring-security-test` are already on the classpath if you want to add some.
