# Copilot Instructions

These are the general instructions for GitHub Copilot in this repository.

## Project Context

This is a full-stack Todo List application composed of:
- **Backend**: RESTful API with Express.js and SQLite database (port `3000`)
- **Frontend**: Web application with Astro, Bootstrap, and TypeScript (port `4321`)

## Architecture

See [architecture.md](//.github/architecture.md) for system diagrams, project structure, API endpoints, database schema, and data flow.

## File Structure

```
backend/index.js         → Express server with all API routes
frontend/src/pages/      → Astro pages
frontend/src/components/ → Reusable Astro components
frontend/src/layouts/    → Shared layouts
```

## Detailed Guidelines

Specific conventions, standards, and best practices are defined in dedicated instruction files under `.github/instructions/`:

- **Backend**: `express-backend.instructions.md` — API design, database usage, error handling
- **Frontend**: `astro-frontend.instructions.md` — component design, styling, client-side interactivity
- **Security**: `security.instructions.md` — OWASP guidelines, input validation, parameterized queries
- **Code Comments**: `code-comments.instructions.md` — self-explanatory code, commenting style
- **Code Review**: `code-review.instructions.md` — review priorities, checklists, testing expectations
- **Accessibility**: `accessibility.instructions.md` — WCAG 2.2 AA, keyboard, forms, dynamic content
- **CI/CD**: `github-actions.instructions.md` — workflow structure, caching, security

## Testing Strategy

- **Backend**: Jest + supertest for API unit/integration tests (`backend/__tests__/`)
- **Frontend**: Playwright for E2E tests (`frontend/e2e/`) — **always use Playwright for frontend testing, never Jest or Vitest**

## Security Policy

See [SECURITY.md](/SECURITY.md) for the vulnerability reporting process and contributor security guidelines.
