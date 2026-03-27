---
name: frontend-error-handling
description: Guide for adding error handling to frontend fetch calls with Bootstrap visual feedback. Use this when asked to handle API errors in the Astro frontend.
---

# Frontend Error Handling

This skill teaches you how to add proper error handling to `fetch()` calls in the Astro frontend with visual feedback using Bootstrap alerts.

## When to Use This Skill

Use this skill when you need to:
- Add error handling to a new or existing API call in the frontend
- Show error messages to the user when an API call fails
- Show success confirmations after create, update, or delete operations
- Debug issues with frontend-backend communication

## Prerequisites

- Astro frontend in `frontend/`
- Bootstrap 5 loaded via CDN (already in `Layout.astro`)
- Backend API running at `http://localhost:3000`

## Steps

1. **Find** the `fetch()` call that needs error handling.
2. **Wrap** it in a `try/catch` block.
3. **Check** `response.ok` before parsing the JSON body.
4. **Show** a Bootstrap alert on error by creating a DOM element dynamically.
5. **Test** by temporarily stopping the backend server and triggering the action.

## Error Handling Template

```typescript
try {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Server error');
  }

  const result = await response.json();
  window.location.reload();
} catch (error) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show';
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${error instanceof Error ? error.message : 'An error occurred'}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.querySelector('.container')?.prepend(alertDiv);
}
```

## Bootstrap Alert Classes

| Class | Use For |
|-------|---------|
| `alert-danger` | Errors and failures |
| `alert-success` | Successful operations |
| `alert-warning` | Warnings and cautions |
| `alert-dismissible` | Adds a close button |
| `fade show` | Animate the alert in |

## Guidelines

- Always check `response.ok` before calling `response.json()`
- Display the server error message when available, fall back to a generic message
- Include a dismiss button with `btn-close` and `data-bs-dismiss="alert"`
- Prepend alerts to `.container` so they appear at the top of the page
- For success alerts, auto-dismiss after a few seconds: `setTimeout(() => alertDiv.remove(), 3000)`
