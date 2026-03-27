````skill
---
name: generate-playwright-tests
description: Guide for generating Playwright E2E test suites for the Astro frontend. Use this when asked to write tests for the frontend or UI.
---

# Generate Playwright Tests

This skill teaches you how to create Playwright end-to-end tests for the frontend of this Todo List application.

## When to Use This Skill

Use this skill when you need to:
- Write E2E tests for existing or new frontend features
- Set up Playwright test infrastructure for the frontend
- Verify that the UI handles user interactions correctly
- Test the full user flow from the browser to the API and back

## Prerequisites

- Node.js installed
- `frontend/` with Astro project
- `backend/index.js` with Express routes (API must be running for E2E tests)
- Playwright installed: `cd frontend && npm install --save-dev @playwright/test && npx playwright install`

## Steps

1. **Check** dependencies — ensure `@playwright/test` is in `frontend/package.json` devDependencies. If missing, install it.
2. **Create** `frontend/playwright.config.ts` if it doesn't exist.
3. **Create** `frontend/e2e/` directory if it doesn't exist.
4. **Write** test files in `frontend/e2e/` following the naming convention `*.spec.ts`.
5. **Run** with `cd frontend && npx playwright test`.
6. **Debug** with `cd frontend && npx playwright test --ui` for the interactive UI mode.

## Playwright Config Template

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'cd ../backend && node index.js',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      port: 4321,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
```

## Test File Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Todo CRUD operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the todo list page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /todo/i })).toBeVisible();
  });

  test('should create a new todo', async ({ page }) => {
    const todoText = 'Buy groceries';
    await page.getByLabel('Add a new todo').fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText(todoText)).toBeVisible();
  });

  test('should mark a todo as completed', async ({ page }) => {
    // First create a todo
    await page.getByLabel('Add a new todo').fill('Test todo');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Test todo')).toBeVisible();

    // Toggle completion
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('should delete a todo', async ({ page }) => {
    // First create a todo
    await page.getByLabel('Add a new todo').fill('Delete me');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Delete me')).toBeVisible();

    // Delete it
    await page.getByRole('button', { name: /delete/i }).first().click();
    await expect(page.getByText('Delete me')).not.toBeVisible();
  });
});
```

## Locator Best Practices

| Preferred | Avoid |
|-----------|-------|
| `page.getByRole('button', { name: 'Add' })` | `page.locator('.btn-primary')` |
| `page.getByText('Buy groceries')` | `page.locator('#todo-1 .text')` |
| `page.getByLabel('Add a new todo')` | `page.locator('input[type="text"]')` |
| `page.getByRole('checkbox')` | `page.locator('.form-check-input')` |

## Assertion Best Practices

| Assertion | Use For |
|-----------|---------|
| `expect(locator).toBeVisible()` | Element is in the DOM and visible |
| `expect(locator).toHaveText('text')` | Element contains specific text |
| `expect(locator).toHaveCount(3)` | Expected number of matching elements |
| `expect(locator).toBeChecked()` | Checkbox is checked |
| `expect(locator).not.toBeVisible()` | Element was removed or hidden |

## Guidelines

- Always use Playwright for frontend tests — never use Jest, Vitest, or other frameworks for UI testing
- Use semantic locators (`getByRole`, `getByText`, `getByLabel`) over CSS selectors
- Each test should be independent — do not rely on state from previous tests
- Use descriptive test names that explain the user behavior being tested
- Test the full user flow, not internal implementation details
- Add `await` before every Playwright action and assertion

````
