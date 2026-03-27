---
description: 'Astro and Bootstrap frontend development standards for this Todo List application'
applyTo: 'frontend/**/*.astro,frontend/**/*.ts,frontend/**/*.js'
---

# Astro Frontend Development Instructions

## Project Context

- Astro with server-first rendering and selective client-side hydration
- Bootstrap 5 for all styling (no custom CSS unless absolutely necessary)
- Bootstrap Icons for iconography
- TypeScript for type safety in `<script>` tags and frontmatter
- API calls point to `http://localhost:3000`
- Frontend runs on port `4321`

## Component Design

- Use `.astro` components for static, server-rendered content
- Follow Astro's component script structure: frontmatter (TypeScript) at top between `---` fences, then HTML template below
- Define component props with TypeScript interfaces
- Use meaningful component names in PascalCase (e.g., `TodoItem.astro`, `TodoFilter.astro`)
- Keep components focused and composable — one responsibility per component
- Place reusable components in `src/components/`, pages in `src/pages/`, layouts in `src/layouts/`

### Component Structure Example

```astro
---
interface Props {
    title: string;
    isActive?: boolean;
}

const { title, isActive = false } = Astro.props;
---

<div class={`card ${isActive ? 'border-primary' : ''}`}>
    <div class="card-body">
        <h3 class="card-title">{title}</h3>
        <slot />
    </div>
</div>
```

## Styling Rules

- Use Bootstrap 5 utility classes exclusively (e.g., `mt-3`, `text-center`, `d-flex`)
- Use Bootstrap component classes (e.g., `card`, `btn`, `form-control`, `input-group`)
- Use Bootstrap Icons via `<i class="bi bi-icon-name"></i>`
- Avoid inline styles and custom CSS — if truly needed, use scoped `<style>` in the `.astro` component
- Follow mobile-first responsive design with Bootstrap's grid system (`container`, `row`, `col-md-*`)
- Use Bootstrap color utilities (`text-primary`, `bg-danger`, `border-success`) instead of custom colors

## Client-Side Interactivity

- Use TypeScript inside `<script>` tags for client-side logic
- Prefer `document.querySelector` and `document.getElementById` for DOM manipulation
- Use `fetch` API for all HTTP requests to the backend
- Always handle errors in fetch calls with try/catch and display user feedback using Bootstrap alerts
- Use `async/await` over `.then()` chains

### Fetch Pattern

```typescript
async function createTodo(text: string): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Update the UI
    } catch (error) {
        console.error('Failed to create todo:', error);
        // Show Bootstrap alert to user
    }
}
```

## Data Fetching

- Fetch data at build/render time in component frontmatter using `await fetch()`
- Define TypeScript interfaces for all API response types
- Handle fetch errors gracefully — show fallback content if API is unreachable

## Performance

- Default to zero client-side JavaScript — add interactivity only where needed
- Use `<script>` tags only for interactive features (form submissions, checkbox toggles, delete buttons)
- Do not import heavy JavaScript frameworks — rely on vanilla TypeScript for DOM manipulation

## Testing with Playwright

- **Always use Playwright** for frontend testing — never use Jest, Vitest, or other frameworks for UI/E2E tests
- Place test files in `frontend/e2e/` with the naming convention `*.spec.ts`
- Configure Playwright in `frontend/playwright.config.ts` with a `webServer` that starts both backend and frontend
- Use semantic locators: `page.getByRole()`, `page.getByText()`, `page.getByLabel()` — avoid raw CSS selectors
- Assert visible state: `expect(locator).toBeVisible()`, `.toHaveText()`, `.toHaveCount()`
- Run tests with `cd frontend && npx playwright test`
- Debug failures with `cd frontend && npx playwright test --ui`

### Playwright Test Pattern

```typescript
import { test, expect } from '@playwright/test';

test.describe('Todo creation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should create a new todo', async ({ page }) => {
        await page.getByLabel('Add a new todo').fill('Buy groceries');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByText('Buy groceries')).toBeVisible();
    });
});
```
