# Todo List Application

> A full-stack Todo List app with an Astro frontend and Express.js API — built as a demo playground for GitHub Copilot customization features.

[![Built with GitHub Copilot](https://img.shields.io/badge/Built%20with-GitHub%20Copilot-8957e5?logo=githubcopilot)](https://github.com/features/copilot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Astro](https://img.shields.io/badge/Astro-4-bc52ee?logo=astro&logoColor=white)](https://astro.build)
[![Express](https://img.shields.io/badge/Express.js-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)

---

## ✨ Features

- 🆕 **Create** new todos
- 📋 **View** todo list
- ✅ **Mark** todos as completed
- 🗑️ **Delete** todos
- 📱 **Responsive** interface with Bootstrap 5
- 💾 **Persistent** storage with SQLite

---

## 📋 Prerequisites

- [Node.js 18+](https://nodejs.org)
- [npm](https://www.npmjs.com/)

---

## 🚀 Getting started

```bash
# Clone the repository
git clone https://github.com/g-mercuri/gh-copilot-demo.git
cd gh-copilot-demo

# Install dependencies
npm install

# Start both servers
npm run dev

```



This starts:

| Service | URL | Port |
|---|---|---|
| Frontend (Astro) | http://localhost:4321 | `4321` |
| Backend (Express) | http://localhost:3000 | `3000` |

> [!NOTE]
> The SQLite database (`todos.db`) is created automatically on first startup inside the `backend/` folder.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/todos` | Retrieve all todos |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/:id` | Update a todo's status |
| `DELETE` | `/todos/:id` | Delete a todo |

---

## 📁 Project Structure

<details>
<summary>📂 Repository layout</summary>

```
.
├── backend/                # Express server
│   ├── index.js           # Server entry point with all API routes
│   └── package.json       # Backend dependencies
├── frontend/              # Astro frontend
│   ├── src/
│   │   ├── components/    # Reusable Astro components
│   │   ├── layouts/       # Shared layouts
│   │   └── pages/         # Application pages
│   └── package.json       # Frontend dependencies
├── .github/
│   ├── copilot-instructions.md      # Repository-wide Copilot conventions
│   ├── instructions/                # Path-specific instruction files
│   ├── agents/                      # Custom Copilot agents
│   ├── skills/                      # Agent skills
│   └── prompts/                     # Reusable prompt files
└── package.json           # Root project scripts and dependencies
```

</details>

---

## 💻 Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the full application stack |
| `npm run install-all` | Install all dependencies |
| `cd frontend && npm run dev` | Start frontend only |
| `cd backend && npm run dev` | Start backend only |

---

## 🤖 GitHub Copilot Customization

This repository is a showcase for all the ways you can customize GitHub Copilot's behavior. See the [Copilot Configuration Guide](.github/copilot-config-guide.md) for a full explanation of each feature.

### Custom Instructions

Always-on context applied to every Copilot interaction.

| File | Scope | Purpose |
|---|---|---|
| `copilot-instructions.md` | Repository-wide | General coding conventions and project context |
| `astro-frontend.instructions.md` | `frontend/**/*.astro,*.ts,*.js` | Astro + Bootstrap patterns, TypeScript conventions |
| `express-backend.instructions.md` | `backend/**/*.js` | RESTful routes, SQLite queries, error handling |
| `accessibility.instructions.md` | `frontend/**/*.astro,*.html` | WCAG 2.2 AA, keyboard navigation, ARIA |
| `code-review.instructions.md` | `**` | Review priorities and checklists |
| `security.instructions.md` | `**` | OWASP Top 10 for Express + SQLite |
| `code-comments.instructions.md` | `**/*.js,*.ts,*.astro` | Self-documenting code principles |
| `github-actions.instructions.md` | `.github/workflows/*.yml` | CI/CD workflow best practices |

### Custom Agents

Specialist personas you select from the agent dropdown in Copilot Chat.

| Agent | Specialization |
|---|---|
| `todo-backend` | Express.js backend development |
| `todo-frontend` | Astro frontend development |
| `todo-testing` | Jest testing |
| `todo-database` | SQLite database operations |

### Skills

Procedures Copilot loads automatically when it detects a relevant task.

| Skill | Description |
|---|---|
| `create-rest-endpoint` | Step-by-step guide for adding a new Express.js route |
| `create-astro-component` | Guide for building typed Astro components with Bootstrap |
| `add-database-migration` | Guide for writing SQLite migration scripts |
| `generate-jest-tests` | Guide for generating Jest + supertest test suites |
| `frontend-error-handling` | Guide for adding Bootstrap error feedback to fetch calls |

### Prompt Files

Reusable prompt templates you attach in Copilot Chat.

| Prompt | Purpose |
|---|---|
| `add-rest-endpoint.prompt.md` | Add a new API endpoint |
| `create-astro-component.prompt.md` | Create a new UI component |
| `generate-backend-tests.prompt.md` | Generate a Jest test suite |
| `add-todo-filtering.prompt.md` | Add todo filter buttons |
| `add-dark-mode.prompt.md` | Add dark/light mode toggle |
| `refactor-routes.prompt.md` | Separate routes into modules |

### 🎯 Hands-on Workshop Guide

For a complete, step-by-step workshop guide with theory, commands, and demos for both VS Code and CLI, see the **[DEMO-GUIDE.md](DEMO-GUIDE.md)**.

The guide covers:
- All customization features (instructions, prompts, agents, skills, hooks, MCP, plugins)
- Operating modes comparison (Ask, Plan, Agent, Autopilot, Fleet)
- Model selection guidance with official recommendations
- Premium request mechanics for every context (chat, CLI, coding agent, PR review, fleet)
- Code review configuration on pull requests
- Non-coding use cases (Excel, PowerPoint)

---

## 📖 Workshop Demo Agenda

<details>
<summary>1. Introduction to GitHub Copilot</summary>

- What GitHub Copilot is and how it works
- Setup and activation in Visual Studio Code

</details>

<details>
<summary>2. Guidelines and best practices</summary>

- Using Copilot to generate code following best practices
- Example prompts:
  - *"Generate a JavaScript function that validates an email address following security best practices."*
  - *"Write a function that uses the Singleton pattern in TypeScript."*

</details>

<details>
<summary>3. Task automation</summary>

- **Documentation generation:** *"Generate Markdown documentation for the REST API defined in `backend/index.js`."*
- **Unit test creation:** *"Generate Jest unit tests for the Express.js `POST /todos` endpoint."*

</details>

<details>
<summary>4. Database migration</summary>

- *"Generate a Node.js script to migrate data from SQLite to PostgreSQL maintaining the `todos` table structure."*
- *"Write a SQL query to add a new `priority` column to the `todos` table."*

</details>

<details>
<summary>5. Debugging and refactoring</summary>

- *"Refactor the code in `TodoItem.astro` to reduce duplication."*
- *"Find and fix any issues in `TodoItem.astro`."*

</details>

<details>
<summary>6. Integration with external APIs</summary>

- *"Generate a function that syncs todos with a cloud service like Azure Cosmos DB."*

</details>

<details>
<summary>7. Copilot Agents, Skills & Prompt Files</summary>

- **Custom Instructions** — Show how Copilot follows project conventions automatically
- **Path-Specific Instructions** — Edit backend vs. frontend files and observe different guidelines
- **Skills** — Trigger repeatable procedures like `create-rest-endpoint`
- **Prompt Files** — Attach reusable prompts like `add-rest-endpoint.prompt.md`
- **Coding Agent** — Assign a GitHub Issue to Copilot and watch it open a PR

</details>

---

## 💡 Example Prompts

<details>
<summary>Feature prompts</summary>

| # | Prompt |
|---|---|
| 1 | *"Write a function that sorts todos by status (completed first or incomplete first)."* |
| 2 | *"Write a function that filters todos based on a keyword entered by the user."* |
| 3 | *"Write a function that allows assigning a priority (high, medium, low) to each todo."* |
| 4 | *"Write a function that sends a notification if a todo is due within 24 hours."* |
| 5 | *"Add a feature to toggle between dark and light mode in the `TodoItem` component."* |
| 6 | *"Write a function that calculates and displays the total number of todos, completed, and incomplete."* |
| 7 | *"Implement a drag-and-drop feature to reorder todos in the list."* |
| 8 | *"Write a function that generates a shareable link for a specific todo."* |
| 9 | *"Write a function that allows exporting and importing todos in JSON format."* |
| 10 | *"Implement a feature that tracks changes made to a todo (text, status, etc.)."* |

</details>

<details>
<summary>Azure deployment prompts</summary>

| Tool | Prompt |
|---|---|
| Azure CLI | *"Generate an Azure CLI script to create an App Service and a PostgreSQL database to host the backend."* |
| Azure CLI | *"Write Azure CLI commands to deploy the backend to an existing App Service."* |
| Azure CLI | *"Generate a YAML configuration file for deploying the frontend to Azure Static Web Apps."* |
| Azure CLI | *"Write an Azure CLI script to configure the required environment variables for the backend."* |
| Azure CLI | *"Generate an Azure CLI script to enable resource monitoring and configure alerts."* |
| azd | *"Generate an `azd` command to create an App Service and a PostgreSQL database."* |
| azd | *"Write `azd` commands to deploy both the backend and frontend to Azure."* |
| Terraform | *"Generate a `main.tf` file to create an App Service, a PostgreSQL database, and a Static Web App on Azure."* |
| Terraform | *"Write Terraform commands to initialize, plan, and apply the configuration."* |
| Terraform | *"Configure a remote backend for Terraform to save state to Azure Storage."* |

</details>

---

## 🤖 Built with GitHub Copilot

This repository was created and customized with [GitHub Copilot](https://github.com/features/copilot).

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).