```prompt
---
description: "Generate Playwright E2E tests for the Astro frontend"
agent: "agent"
tools: ["read", "edit", "execute", "search", "playwright/*"]
---

# Generate Frontend E2E Tests

Generate a Playwright E2E test suite for the frontend in `frontend/`.

## Instructions

1. Ensure `@playwright/test` is in `frontend/package.json` devDependencies. If not, run: `cd frontend && npm install --save-dev @playwright/test && npx playwright install`
2. Create `frontend/playwright.config.ts` if it doesn't exist — configure `testDir: './e2e'`, `baseURL: 'http://localhost:4321'`, and `webServer` entries for both backend (port 3000) and frontend dev server (port 4321).
3. Create `frontend/e2e/todos.spec.ts`.
4. Write E2E tests for each user flow:
   - **Page load** — heading is visible, form is present
   - **Create todo** — type text, click Add, verify todo appears
   - **Complete todo** — check the checkbox, verify it's checked
   - **Edit todo** — click edit, change text, save, verify updated text
   - **Delete todo** — click delete, verify todo is removed
5. Use Playwright semantic locators: `getByRole`, `getByText`, `getByLabel` — avoid CSS selectors.
6. Use meaningful assertions: `toBeVisible()`, `toHaveText()`, `toHaveCount()`, `toBeChecked()`.
7. Each test must be independent — do not rely on state from other tests.
8. Run tests: `cd frontend && npx playwright test`

**Important**: Always use Playwright for frontend tests — never use Jest, Vitest, or other testing frameworks for UI testing.

```
