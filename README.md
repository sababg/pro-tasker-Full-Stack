# Pro Tasker — Full Stack Task Management App

A full-stack collaborative task management application built with **React**, **Node.js/Express**, **TypeScript**, and **MongoDB**. Pro Tasker allows users to register, create projects, invite collaborators, and manage tasks — all behind JWT-based authentication.

# backend-live: https://pro-tasker-backend-bv18.onrender.com

# frontend-live: https://grand-pie-1cd4ae.netlify.app

---

## Tech Stack

| Layer    | Technology                                                                           |
| -------- | ------------------------------------------------------------------------------------ |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4, React Router v7, React Hook Form, Axios |
| Backend  | Node.js, Express 5, TypeScript, Mongoose (MongoDB), JWT, bcrypt                      |
| Database | MongoDB (via Mongoose)                                                               |
| Auth     | JSON Web Tokens (JWT) via `Authorization` header                                     |

---

## Project Structure

```
pro-tasker-Full-Stack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── projectController.ts
│   │   │   ├── taskController.ts
│   │   │   └── userController.ts
│   │   ├── db/
│   │   │   └── connection.ts
│   │   ├── models/
│   │   │   ├── Project.ts
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── projectRoutes.ts
│   │   │   ├── taskRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── front-end/
    ├── src/
    │   ├── assets/
    │   ├── clients/
    │   ├── components/
    │   ├── context/
    │   ├── App.tsx
    │   ├── ProtectedRoute.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

---

## API Reference

> **Base URL:** `http://localhost:8080/api`
>
> **Authentication:** Protected routes require a `Bearer <token>` in the `Authorization` header.

---

### User Routes

| Method | Endpoint    | Auth Required | Description                    |
| ------ | ----------- | ------------- | ------------------------------ |
| POST   | `/register` | NO            | Register a new user            |
| POST   | `/login`    | No            | Log in and receive a JWT token |
| GET    | `/me`       | Yes           | Get the current logged-in user |
| GET    | `/emails`   | Yes           | Get a list of all user emails  |

#### `POST /api/register`

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response `201`:**

```json
{
  "message": "User registered successfully"
}
```

#### `POST /api/login`

**Request Body:**

```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response `200`:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

#### `GET /api/me`

**Response `200`:**

```json
{
  "_id": "...",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

---

### Project Routes

> All project routes require authentication (`Authorization: Bearer <token>`).

| Method | Endpoint                      | Description                           |
| ------ | ----------------------------- | ------------------------------------- |
| POST   | `/projects`                   | Create a new project                  |
| GET    | `/projects`                   | Get all projects for the current user |
| GET    | `/projects/:id`               | Get a single project by ID            |
| PUT    | `/projects/:id`               | Update a project                      |
| DELETE | `/projects/:id`               | Delete a project                      |
| POST   | `/projects/:id/collaborators` | Add a collaborator to a project       |
| DELETE | `/projects/:id/collaborators` | Remove a collaborator from a project  |

#### `POST /api/projects`

**Request Body:**

```json
{
  "name": "My New Project",
  "description": "A project to track tasks"
}
```

**Response `201`:**

```json
{
  "_id": "...",
  "name": "My New Project",
  "description": "A project to track tasks",
  "owner": "...",
  "collaborators": [],
  "tasks": []
}
```

#### `POST /api/projects/:id/collaborators`

**Request Body:**

```json
{
  "email": "collaborator@example.com"
}
```

**Response `200`:**

```json
{
  "message": "Collaborator added successfully"
}
```

---

### Task Routes

> All task routes require authentication. Tasks are scoped to a project via `/:id`.

| Method | Endpoint                      | Description                             |
| ------ | ----------------------------- | --------------------------------------- |
| POST   | `/projects/:id/task`          | Create a new task in a project          |
| GET    | `/projects/:id/task`          | Get all tasks for a project             |
| GET    | `/projects/:id/tasks/:taskId` | Get a specific task by ID               |
| DELETE | `/projects/:id/tasks/:taskId` | Delete a task                           |
| GET    | `/projects/:id/users`         | Get all users associated with a project |

#### `POST /api/projects/:id/task`

**Request Body:**

```json
{
  "title": "Design landing page",
  "description": "Create wireframes and mockups",
  "assignedTo": "<userId>",
  "status": "todo"
}
```

**Response `201`:**

```json
{
  "_id": "...",
  "title": "Design landing page",
  "description": "Create wireframes and mockups",
  "assignedTo": "...",
  "status": "todo",
  "project": "..."
}
```

#### `GET /api/projects/:id/task`

**Response `200`:**

```json
[
  {
    "_id": "...",
    "title": "Design landing page",
    "status": "todo",
    "assignedTo": { "_id": "...", "name": "Jane Doe" }
  }
]
```

---

## Getting Started (Local Setup)

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- `npm` (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/sababg/pro-tasker-Full-Stack.git
cd pro-tasker-Full-Stack
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/pro-tasker
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

The API will be running at **`http://localhost:8080`**.

---

### 3. Set Up the Frontend

Open a new terminal tab/window:

```bash
cd front-end
npm install
```

Optionally, create a `.env` file in `front-end/` if you need to override the API URL:

```env
VITE_API_URL=http://localhost:8080
```

Start the frontend development server:

```bash
npm run dev
```

The app will be running at **`http://localhost:5173`**.

---

### 4. Running Both Servers

You need **two terminals** running simultaneously:

| Terminal | Directory    | Command       | URL                   |
| -------- | ------------ | ------------- | --------------------- |
| 1        | `backend/`   | `npm run dev` | http://localhost:8080 |
| 2        | `front-end/` | `npm run dev` | http://localhost:5173 |

---

## Environment Variables

### `backend/.env`

| Variable       | Description                        | Default                 |
| -------------- | ---------------------------------- | ----------------------- |
| `PORT`         | Port the Express server listens on | `8080`                  |
| `MONGO_URI`    | MongoDB connection string          | —                       |
| `JWT_SECRET`   | Secret key used to sign JWT tokens | —                       |
| `FRONTEND_URL` | Allowed CORS origin (frontend URL) | `http://localhost:5173` |

### `front-end/.env` _(optional)_

| Variable       | Description               | Default                 |
| -------------- | ------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL for API requests | `http://localhost:8080` |

---

## Available Scripts

### Backend (`/backend`)

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start`     | Run compiled production server   |

### Frontend (`/front-end`)

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## Authentication Flow

1. User registers via `POST /api/register`
2. User logs in via `POST /api/login` → receives a **JWT token**
3. Token is stored client-side and sent with every protected request as:
   ```
   Authorization: Bearer <token>
   ```
4. The `authMiddleware` on the backend validates the token on every protected route

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

##

👤 Author
Saba Beigi
🌎 Charlotte, NC
💼 GitHub @sababg
📧 beigisaba@gmail.com

Feel free to reach out with questions, feedback, or ideas!
