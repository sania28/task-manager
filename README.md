<div align="center">

# 📝 TaskFlow

### 🚀 Full-Stack Task Management Web Application

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&pause=1000&color=36BCF7&center=true&vCenter=true&width=800&lines=Smart+Task+Management+Platform;React+%7C+Spring+Boot+%7C+MongoDB;Secure+JWT+Authentication;Real-Time+Updates+with+WebSockets;Create+%7C+Track+%7C+Update+%7C+Complete;Built+with+%E2%9D%A4%EF%B8%8F+by+Sania+Mujtaba" alt="Typing SVG" />

<br/>

<img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
<img src="https://img.shields.io/badge/Spring_Boot-3.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />

<br/><br/>

<img src="https://img.shields.io/badge/Spring_Security-Authentication-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=jsonwebtokens" />
<img src="https://img.shields.io/badge/WebSocket-STOMP%2FSockJS-010101?style=for-the-badge" />
<img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<br/><br/>

<a href="https://taskflow-frontend-5qhi.onrender.com">
<img src="https://img.shields.io/badge/🌐_Live_Website-TaskFlow-00C853?style=for-the-badge&logo=googlechrome&logoColor=white" />
</a>

</div>

---

# 🌐 Live Demo

<div align="center">

## 🚀 Explore TaskFlow Live

<a href="https://taskflow-frontend-5qhi.onrender.com">

<img src="https://img.shields.io/badge/OPEN_TASKFLOW-LIVE_DEMO-00C853?style=for-the-badge&logo=googlechrome&logoColor=white" />

</a>

<br/><br/>

**https://taskflow-frontend-5qhi.onrender.com**

</div>

---

# ✨ About The Project

**TaskFlow** is a full-stack task management web application designed to help users organize, track, update, and complete their daily tasks efficiently.

The application is built using **React 18** on the frontend and **Java 17 + Spring Boot** on the backend, with **MongoDB** used for persistent data storage.

TaskFlow includes secure **JWT authentication**, task CRUD operations, task status and priority management, protected routes, and **real-time updates using WebSockets with STOMP/SockJS**.

The real-time functionality allows changes made in one browser tab or device to instantly appear in another active session without requiring a page refresh.

---

# 🎯 Project Highlights

* 🔐 JWT Authentication
* 👤 User Registration & Login
* 🔒 BCrypt Password Hashing
* 🛡️ Protected Routes
* 📝 Complete Task CRUD
* 📊 Task Status Management
* 🚦 Task Priority Management
* 📅 Due Date Support
* ⚡ Real-Time WebSocket Updates
* 🔄 STOMP/SockJS Integration
* 👤 User-Specific Tasks
* 🔎 Task Filtering
* 📱 Responsive UI
* 🌐 REST API Integration
* 🗄️ MongoDB Database
* 🚀 Live Deployment

---

# 🧰 Tech Stack

## 🎨 Frontend

| Technology            | Purpose                |
| --------------------- | ---------------------- |
| ⚛️ **React 18**       | User Interface         |
| ⚡ **Vite**            | Frontend Build Tool    |
| 🧭 **React Router**   | Client-Side Routing    |
| 🌐 **Axios**          | REST API Communication |
| 🔌 **@stomp/stompjs** | WebSocket Client       |
| 🔄 **SockJS**         | WebSocket Fallback     |
| 🟨 **JavaScript**     | Application Logic      |
| 🎨 **CSS**            | Responsive Styling     |

---

## ⚙️ Backend

| Technology                 | Purpose                        |
| -------------------------- | ------------------------------ |
| ☕ **Java 17**              | Backend Programming Language   |
| 🌱 **Spring Boot 3.3**     | Backend Framework              |
| 🔐 **Spring Security**     | Authentication & Authorization |
| 🍃 **Spring Data MongoDB** | Database Integration           |
| 🔌 **Spring WebSocket**    | Real-Time Communication        |
| 📡 **STOMP**               | WebSocket Messaging            |
| 🔄 **SockJS**              | WebSocket Support              |
| 🔑 **JWT / jjwt**          | Token-Based Authentication     |
| 🔒 **BCrypt**              | Password Hashing               |
| 📦 **Maven**               | Dependency Management          |

---

## 🗄️ Database

**MongoDB**

MongoDB is used to store:

* 👤 User accounts
* 📝 Tasks
* 📊 Task status
* 🚦 Task priority
* 📅 Due dates
* 🕒 Timestamps

---

# ✨ Features

## 🔐 Authentication

TaskFlow provides secure authentication using JWT.

* User registration
* User login
* Email + password authentication
* BCrypt password hashing
* JWT bearer tokens
* Protected API endpoints
* Protected frontend routes

---

## 📝 Task Management

Users can manage their own tasks through complete CRUD operations.

### Create

Create tasks with:

* Title
* Description
* Status
* Priority
* Due date

### Read

View all tasks belonging to the authenticated user.

### Update

Edit task information and update its status or priority.

### Delete

Delete tasks belonging to the authenticated user.

---

# 📊 Task Status

Every task can have one of three statuses:

```text
📝 TODO
   │
   ▼
🔄 IN_PROGRESS
   │
   ▼
✅ DONE
```

---

# 🚦 Task Priority

Tasks can be organized according to priority:

```text
🟢 LOW
🟡 MEDIUM
🔴 HIGH
```

---

# ⚡ Real-Time WebSocket Updates

One of the key features of TaskFlow is **real-time task synchronization**.

When a task is:

* 🟢 Created
* 🔵 Updated
* 🔴 Deleted

the server broadcasts an event to the user's WebSocket topic.

Any active browser tab or device subscribed to that user's topic can receive the update instantly.

### 🔄 Real-Time Flow

```text
                 👤 USER
                    │
                    ▼
              📝 Task Action
                    │
                    ▼
            React Frontend
                    │
                    ▼
             REST API
                    │
                    ▼
          Spring Boot Backend
                    │
                    ▼
               MongoDB
                    │
                    ▼
          WebSocket Broadcast
                    │
                    ▼
            STOMP / SockJS
                    │
              ┌─────┴─────┐
              ▼           ▼
          Browser 1    Browser 2
              │           │
              └─────┬─────┘
                    ▼
             🔄 Instant Update
```

---

# 🟢 Live Connection Indicator

The application provides a connection indicator in the navigation bar.

```text
🟢 Connected
```

indicates that the WebSocket connection is active.

This allows users to know when real-time synchronization is available.

---

# 📱 Responsive Design

TaskFlow is designed to work across different screen sizes.

### Desktop

```text
┌───────────────────────────────────────────┐
│                 Navbar                    │
├───────────────────────────────────────────┤
│                                           │
│  ┌────────┐  ┌────────┐  ┌────────┐      │
│  │ Task 1 │  │ Task 2 │  │ Task 3 │      │
│  └────────┘  └────────┘  └────────┘      │
│                                           │
└───────────────────────────────────────────┘
```

### Mobile

```text
┌─────────────────────┐
│      Navbar         │
├─────────────────────┤
│                     │
│     ┌───────────┐   │
│     │   Task 1  │   │
│     └───────────┘   │
│                     │
│     ┌───────────┐   │
│     │   Task 2  │   │
│     └───────────┘   │
│                     │
└─────────────────────┘
```

The task grid collapses to a single column on smaller screens.

---

# 🏗️ Application Architecture

```text
                    ┌───────────────────────┐
                    │      React 18         │
                    │    Vite Frontend      │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                 REST API              WebSocket
                    │                  STOMP/SockJS
                    │                       │
                    ▼                       ▼
              ┌─────────────────────────────────┐
              │       Spring Boot Backend       │
              │                                 │
              │  Spring Security + JWT         │
              │  Controllers                   │
              │  Services                      │
              │  Repositories                  │
              └───────────────┬─────────────────┘
                              │
                              │ Spring Data MongoDB
                              ▼
                    ┌───────────────────────┐
                    │       MongoDB         │
                    └───────────────────────┘
```

---

# 🔐 Authentication Flow

```text
                 👤 USER
                    │
                    ▼
             Register / Login
                    │
                    ▼
          Spring Security
                    │
                    ▼
          Verify Credentials
                    │
                    ▼
              BCrypt Check
                    │
                    ▼
               JWT Token
                    │
                    ▼
          React Frontend
                    │
                    ▼
       Authorization: Bearer Token
                    │
                    ▼
             JWT Filter
                    │
                    ▼
          Protected Endpoint
```

---

# 🛡️ User Data Isolation

Each user's tasks are scoped to their authenticated account.

```text
             👤 User A
                 │
                 ▼
        ┌─────────────────┐
        │   User A Tasks  │
        └─────────────────┘


             👤 User B
                 │
                 ▼
        ┌─────────────────┐
        │   User B Tasks  │
        └─────────────────┘
```

A user can only access and manage their own tasks.

---

# 📁 Project Structure

```text
task-manager/
│
├── backend/
│   │
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/taskmanager/
│           │       │
│           │       ├── config/
│           │       │   └── Security + WebSocket configuration
│           │       │
│           │       ├── controller/
│           │       │   └── REST controllers
│           │       │
│           │       ├── dto/
│           │       │   └── Request / Response DTOs
│           │       │
│           │       ├── exception/
│           │       │   └── Custom exceptions
│           │       │
│           │       ├── model/
│           │       │   └── User + Task documents
│           │       │
│           │       ├── repository/
│           │       │   └── Spring Data repositories
│           │       │
│           │       ├── security/
│           │       │   └── JWT filter / service
│           │       │
│           │       └── service/
│           │           └── Business logic + WebSocket
│           │
│           └── resources/
│               └── application.properties
│
├── frontend/
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar
│       │   ├── TaskCard
│       │   ├── TaskForm
│       │   └── ProtectedRoute
│       │
│       ├── context/
│       │   └── AuthContext
│       │
│       ├── pages/
│       │   ├── Login
│       │   ├── Register
│       │   └── Dashboard
│       │
│       └── services/
│           ├── api.js
│           └── socket.js
│
└── README.md
```

---

# 🔌 REST API Reference

| Method   | Endpoint             | Auth | Description               |
| -------- | -------------------- | :--: | ------------------------- |
| `POST`   | `/api/auth/register` |   ❌  | Create account            |
| `POST`   | `/api/auth/login`    |   ❌  | Login and receive JWT     |
| `GET`    | `/api/tasks`         |   ✅  | List current user's tasks |
| `GET`    | `/api/tasks/{id}`    |   ✅  | Get one task              |
| `POST`   | `/api/tasks`         |   ✅  | Create task               |
| `PUT`    | `/api/tasks/{id}`    |   ✅  | Update task               |
| `DELETE` | `/api/tasks/{id}`    |   ✅  | Delete task               |

### Optional Task Filter

```http
GET /api/tasks?status=TODO
```

Supported status values:

```text
TODO
IN_PROGRESS
DONE
```

---

# 🔌 WebSocket API

### WebSocket Endpoint

```text
ws://localhost:8080/ws
```

### User Topic

```text
/topic/tasks/{userId}
```

### Events

```text
CREATED
UPDATED
DELETED
```

Example event flow:

```text
Task Created
     │
     ▼
Spring Boot Service
     │
     ▼
WebSocket Publisher
     │
     ▼
/topic/tasks/{userId}
     │
     ▼
Connected Clients
     │
     ▼
UI Updates Instantly
```

---

# ⚙️ Running Locally

## 📌 Prerequisites

Make sure the following are installed:

* Java 17+
* Maven
* Node.js 18+
* npm
* MongoDB

MongoDB should be available at:

```text
mongodb://localhost:27017
```

or you can configure another MongoDB connection string.

---

# 1️⃣ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The API will start at:

```text
http://localhost:8080
```

---

# 🔑 Backend Configuration

Configuration is available in:

```text
backend/src/main/resources/application.properties
```

Important properties include:

```properties
spring.data.mongodb.uri=your_mongodb_uri

app.jwt.secret=your_long_random_secret

app.jwt.expiration-ms=86400000

app.cors.allowed-origins=http://localhost:5173
```

### ⚠️ Security Note

For any real deployment:

* Use a strong random JWT secret
* Do not commit secrets to GitHub
* Store credentials in environment variables or secure deployment settings

---

# 2️⃣ Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will start at:

```text
http://localhost:5173
```

---

# 🔧 Frontend API Configuration

The backend URL is configured through:

```text
frontend/src/services/api.js
```

For local development:

```text
http://localhost:8080
```

The frontend communicates with the backend through REST APIs and WebSockets.

---

# 🧪 How To Test

### 👤 Create Account

```text
Open TaskFlow
      ↓
Register
      ↓
Enter Email + Password
      ↓
Create Account
```

### 🔐 Login

```text
Login
  ↓
JWT Token
  ↓
Dashboard
```

### 📝 Create Task

```text
Dashboard
    ↓
Create Task
    ↓
Title
Description
Status
Priority
Due Date
    ↓
Save
```

### ⚡ Test Real-Time Updates

Open the same account in two browser tabs:

```text
        Browser Tab 1
              │
              │
          Task Update
              │
              ▼
        Spring Boot API
              │
              ▼
        WebSocket Server
              │
              ├──────────────► Browser Tab 1
              │
              └──────────────► Browser Tab 2
                                      │
                                      ▼
                              Instant UI Update
```

No manual page refresh is required.

---

# 📊 Task Lifecycle

```text
┌──────────┐
│   TODO   │
└────┬─────┘
     │
     │ Start Task
     ▼
┌──────────────┐
│ IN_PROGRESS  │
└──────┬───────┘
       │
       │ Complete
       ▼
┌──────────┐
│   DONE   │
└──────────┘
```

---

# 🧠 Key Learning Outcomes

This project provided practical experience with:

* Full-stack application development
* Java 17
* Spring Boot
* Spring Security
* JWT authentication
* BCrypt password hashing
* REST API development
* MongoDB
* Spring Data MongoDB
* React 18
* Vite
* React Router
* Axios
* WebSockets
* STOMP
* SockJS
* Real-time application architecture
* Protected frontend routes
* User-specific data handling
* CRUD operations
* Responsive UI development
* Frontend-backend integration

---

# 📌 Project Highlights

```text
☕ Java 17
🌱 Spring Boot 3.3
⚛️ React 18
🍃 MongoDB
🔐 JWT Authentication
🔒 Spring Security
📝 Task CRUD
⚡ WebSocket Real-Time Updates
🔌 STOMP / SockJS
📡 REST API
📱 Responsive UI
🚀 Live Deployment
```

---

# 🔮 Future Improvements

Possible future enhancements include:

* 🔎 Advanced task search
* 🏷️ Task categories and tags
* 📊 Productivity analytics
* 📈 Task completion charts
* 🔔 Notifications
* ⏰ Task reminders
* 📅 Calendar integration
* 👥 Team collaboration
* 📌 Drag-and-drop task boards
* 🌙 Dark mode
* 🧪 Automated unit and integration tests
* 📄 Pagination for larger task lists

---

# 🛡️ Security Notes

TaskFlow uses:

* 🔐 JWT bearer authentication
* 🔒 BCrypt password hashing
* 🛡️ Spring Security
* 🚧 Protected API routes
* 👤 User-specific task authorization
* 🔑 Configurable JWT secret
* 🌐 CORS configuration

For production deployment, secrets and database credentials should be stored securely using environment variables or the hosting provider's secret-management system.

---

# ☁️ Deployment

TaskFlow can be deployed using platforms such as:

### Frontend

```text
Render
Vercel
Netlify
```

### Backend

```text
Render
Railway
```

### Database

```text
MongoDB Atlas
```

The live frontend is currently available at:

**https://taskflow-frontend-5qhi.onrender.com**

---

# 🌐 Live Project

<div align="center">

## 🚀 Try TaskFlow

<a href="https://taskflow-frontend-5qhi.onrender.com">

<img src="https://img.shields.io/badge/OPEN_TASKFLOW-LIVE_WEBSITE-00C853?style=for-the-badge&logo=googlechrome&logoColor=white" />

</a>

<br/><br/>

**https://taskflow-frontend-5qhi.onrender.com**

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&center=true&vCenter=true&width=650&lines=Plan+Your+Work;Track+Your+Progress;Stay+Organized;Get+Things+Done+%F0%9F%9A%80" alt="TaskFlow Typing Animation"/>

</div>

---

# 👩‍💻 Developer

<div align="center">

## Sania Mujtaba

**Computer Science & Engineering Graduate**

**Frontend & Full-Stack Developer**

<br/>

<a href="https://github.com/sania28">
<img src="https://img.shields.io/badge/GitHub-sania28-181717?style=for-the-badge&logo=github" />
</a>

<a href="https://www.linkedin.com/in/sania-mujtaba-20806a394/">
<img src="https://img.shields.io/badge/LinkedIn-Sania_Mujtaba-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

</div>

---

# ⭐ Show Your Support

If you like this project, consider giving the repository a ⭐ on GitHub.

Your feedback and support are always appreciated!

---

<div align="center">

### 🚀 TaskFlow

**Plan • Track • Manage • Complete**

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1000&center=true&vCenter=true&width=600&lines=Stay+Organized+%E2%9C%A8;Manage+Tasks+Efficiently+%F0%9F%93%8B;Build+Better+Habits+%F0%9F%9A%80;Get+Things+Done+%E2%9C%85" alt="Typing Animation"/>

<br/><br/>

**React • Spring Boot • Java • MongoDB • JWT • WebSockets**

</div>

---

# 📄 License

This project is created for learning, development, and portfolio purposes.
