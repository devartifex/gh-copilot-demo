---
description: "Create a new Astro component with Bootstrap styling and TypeScript"
agent: "agent"
tools: ["read", "edit", "search"]
---

# Create Astro Component

Create a new Astro component in `frontend/src/components/`.

## Component Name

{{name}}

## What It Should Do

{{description}}

## Instructions

1. Look at [TodoItem.astro](../../frontend/src/components/TodoItem.astro) and [Layout.astro](../../frontend/src/layouts/Layout.astro) for the existing component patterns.
2. Define a TypeScript `Props` interface in the frontmatter block.
3. Use Bootstrap 5 classes for all styling — avoid custom CSS.
4. Use Bootstrap Icons (`bi bi-*`) for any icons.
5. Add a `<script>` block with TypeScript for client-side interactivity if needed.
6. API calls should point to `http://localhost:3000`.
7. Build with `cd frontend && npm run build` to verify the component compiles.
