---
name: create-astro-component
description: Guide for creating new Astro components with typed Props, Bootstrap styling, and TypeScript. Use this when asked to create a new UI component.
---

# Create Astro Component

This skill teaches you how to create a new Astro component for the Todo List frontend application.

## When to Use This Skill

Use this skill when you need to:
- Create a new reusable UI component in `frontend/src/components/`
- Add a new page in `frontend/src/pages/`
- Build a new section of the interface with Bootstrap 5 and TypeScript

## Prerequisites

- Astro project in `frontend/`
- Bootstrap 5 loaded via CDN in `Layout.astro`
- Bootstrap Icons loaded via CDN in `Layout.astro`

## Steps

1. **Create** a new `.astro` file in `frontend/src/components/` (or `frontend/src/pages/` for pages).
2. **Define** a TypeScript `Props` interface in the frontmatter block.
3. **Write** HTML markup using Bootstrap 5 classes.
4. **Add** a `<script>` block for client-side interactivity using TypeScript.
5. **Build** with `cd frontend && npm run build` to verify the component compiles.
6. **Import** the component in a page or layout where it should appear.

## Component Template

```astro
---
interface Props {
    propName: string;
    optionalProp?: number;
}

const { propName, optionalProp = 0 } = Astro.props;
---

<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">{propName}</h5>
    </div>
</div>

<script>
    // Client-side TypeScript — type-cast DOM elements
    const element = document.getElementById('my-id') as HTMLElement;
    element?.addEventListener('click', () => {
        // Handle interaction
    });
</script>
```

## Conventions

- Use Bootstrap 5 utility classes for layout (`d-flex`, `justify-content-between`, etc.)
- Use Bootstrap component classes for UI (`card`, `btn`, `form-control`, etc.)
- Use Bootstrap Icons with `<i class="bi bi-icon-name"></i>`
- Type-cast DOM elements in scripts (e.g., `as HTMLInputElement`)
- Reload page after API mutations: `window.location.reload()`
- Only add `<style>` for things Bootstrap cannot cover (custom animations, hover transitions)

## Example: TodoStats Component

```astro
---
interface Props {
    total: number;
    completed: number;
}

const { total, completed } = Astro.props;
const pending = total - completed;
---

<div class="card mb-3">
    <div class="card-body d-flex justify-content-around text-center">
        <div>
            <h5 class="card-title">{total}</h5>
            <p class="text-muted">Total</p>
        </div>
        <div>
            <h5 class="card-title text-success">{completed}</h5>
            <p class="text-muted">Completed</p>
        </div>
        <div>
            <h5 class="card-title text-warning">{pending}</h5>
            <p class="text-muted">Pending</p>
        </div>
    </div>
</div>
```
