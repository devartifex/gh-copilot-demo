# Project Architecture

## Overview

The Todo List application is a full-stack project with a client-server architecture. The frontend and backend communicate via REST API over HTTP.

```
┌─────────────────────┐         HTTP (REST)         ┌─────────────────────┐
│                     │  ◄─────────────────────────► │                     │
│   Frontend (Astro)  │    GET/POST/PUT/DELETE        │  Backend (Express)  │
│   Port: 4321        │         /todos                │  Port: 3000         │
│                     │                               │                     │
└─────────────────────┘                               └──────────┬──────────┘
                                                                 │
                                                                 │ SQLite
                                                                 ▼
                                                      ┌─────────────────────┐
                                                      │    todos.db         │
                                                      │  (SQLite Database)  │
                                                      └─────────────────────┘
```

## Project Structure

```
gh-copilot-demo/
├── backend/                  # API Server
│   ├── index.js              # Entry point: Express server, API routes, DB connection
│   └── package.json          # Dependencies: express, cors, body-parser, sqlite3
├── frontend/                 # Web Application
│   ├── src/
│   │   ├── pages/
│   │   │   └── index.astro   # Main page with form and todo list
│   │   ├── components/
│   │   │   ├── TodoItem.astro # Single todo component (checkbox, edit, delete)
│   │   │   └── Welcome.astro  # Astro default welcome component
│   │   ├── layouts/
│   │   │   └── Layout.astro   # Base layout with navbar, Bootstrap, and footer
│   │   └── assets/            # Static assets (logo, background)
│   ├── public/                # Public static files
│   ├── astro.config.mjs       # Astro configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Dependencies: astro
├── package.json               # Root: monorepo scripts, concurrently
└── README.md                  # Project documentation
```

## Backend

### Technologies
- **Express.js** — HTTP framework for Node.js
- **SQLite3** — Lightweight embedded database
- **CORS** — Middleware for cross-origin requests
- **body-parser** — Middleware for JSON body parsing

### API Endpoints

| Method   | Endpoint       | Description                       | Request Body                  | Response                          |
|----------|----------------|-----------------------------------|-------------------------------|-----------------------------------|
| `GET`    | `/todos`       | Retrieve all todos                | —                             | `[{ id, text, completed }]`       |
| `POST`   | `/todos`       | Create a new todo                 | `{ text: string }`            | `{ id, text, completed: false }`  |
| `PUT`    | `/todos/:id`   | Update text or status of a todo   | `{ text }` or `{ completed }` | `{ id, text }` or `{ id, completed }` |
| `DELETE` | `/todos/:id`   | Delete a todo                     | —                             | `{ message: "Todo deleted" }`     |

### Database Schema

```sql
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0
);
```

## Frontend

### Technologies
- **Astro** — Web framework with static rendering and islands of interactivity
- **Bootstrap 5** — CSS framework for responsive layouts
- **Bootstrap Icons** — Icon set
- **TypeScript** — Typed language for client-side logic

### Components

#### `Layout.astro`
Base application layout. Includes:
- HTML tags with meta tags and links to Bootstrap CDN
- Navbar with the title "Todo List"
- Slot for page content
- Fixed footer at the bottom

#### `index.astro` (Main page)
- Fetches todos from the backend during server-side rendering
- Form to add new todos
- Renders the todo list via the `TodoItem` component
- Handles form submission with the `fetch` API

#### `TodoItem.astro`
Component for displaying and interacting with a single todo:
- **Checkbox** — Mark as completed/not completed
- **Text** — Displays the todo text (strikethrough if completed)
- **Inline editing** — Click the edit button to modify the text
- **Delete** — Button to delete the todo
- Support for `Enter` (confirm) and `Escape` (cancel) keys during editing

## Data Flow

1. User opens the page → Astro executes `fetch('http://localhost:3000/todos')` during rendering
2. Todos are displayed via `TodoItem` components
3. User interactions (add, edit, complete, delete) send API requests to the backend
4. The backend processes the request and updates the SQLite database
5. The page reloads (`window.location.reload()`) to show the updated state

## Running the Application

```bash
# Install dependencies and start everything
npm run dev

# Start only the backend
cd backend && npm run dev

# Start only the frontend
cd frontend && npm run dev
```

The `npm run dev` command uses `concurrently` to start both the backend and frontend simultaneously.
