---
description: "Add client-side todo filtering (All, Active, Completed) to the main page"
agent: "agent"
tools: ["read", "edit", "search"]
---

# Add Todo Filtering

Add todo filtering buttons to the main page at [frontend/src/pages/index.astro](../../frontend/src/pages/index.astro).

## Requirements

1. Add three Bootstrap buttons above the todo list: **All**, **Active**, **Completed**.
2. Use the Bootstrap `btn-group` pattern for the filter buttons.
3. Highlight the active filter button using Bootstrap's `active` class.
4. Implement client-side TypeScript logic in a `<script>` block to show/hide todo items:
   - **All** shows every todo
   - **Active** shows only unchecked todos
   - **Completed** shows only checked todos
5. The filter should work without reloading the page — toggle `d-none` class on todo items.

## Context

- Existing todo rendering: see [index.astro](../../frontend/src/pages/index.astro)
- Todo item structure: see [TodoItem.astro](../../frontend/src/components/TodoItem.astro) — each item has a `.todo-item` wrapper and a `.form-check-input` checkbox with `checked` attribute
