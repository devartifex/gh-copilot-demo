---
description: 'Accessibility guidelines for HTML and Astro components using Bootstrap'
applyTo: 'frontend/**/*.astro,frontend/**/*.html'
---

# Accessibility Instructions

Accessibility is a core requirement. All UI components must be usable by everyone, including users with assistive technologies.

## Non-negotiables

- Conform to WCAG 2.2 Level AA
- Use Bootstrap's built-in accessible components and patterns — do not recreate them with `div`/`span` + ARIA
- Prefer native HTML elements over ARIA roles when possible
- Use ARIA attributes only when native semantics are insufficient

## Structure and Semantics

- Use landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- Use headings to introduce sections; do not skip heading levels
- Use exactly one `<h1>` per page for the main topic
- Set a descriptive `<title>` on each page

## Keyboard and Focus

- All interactive elements (buttons, links, checkboxes, inputs) must be keyboard operable
- Tab order must follow the visual reading order
- Focus must always be visible — use Bootstrap's default focus styles
- Never trap focus — users must be able to tab away from any element
- Hidden content must not be focusable

## Forms

- Every form control must have a visible, programmatic label (`<label for="...">`)
- Indicate required fields visually and with `aria-required="true"`
- Provide error messages that explain how to fix the issue
- Use `aria-invalid="true"` on invalid fields
- Associate help text and errors with `aria-describedby`
- On form submission with invalid input, focus the first invalid field

### Form Example

```html
<div class="mb-3">
    <label for="todo-text" class="form-label">Task description</label>
    <input
        type="text"
        id="todo-text"
        class="form-control"
        aria-required="true"
        aria-describedby="todo-help"
        placeholder="What needs to be done?"
    />
    <div id="todo-help" class="form-text">Enter a description for your todo item.</div>
</div>
```

## Controls and Labels

- Every interactive element must have a visible label
- If multiple controls share the same visible label (e.g., multiple "Delete" buttons), add `aria-label` with context (e.g., `aria-label="Delete: Buy groceries"`)
- Buttons must have descriptive text or `aria-label` — never use icon-only buttons without accessible names

## Color and Contrast

- Text contrast must be at least 4.5:1 (large text: 3:1)
- Do not rely on color alone to convey meaning (e.g., completed vs. pending todos)
- Use text, icons, or patterns alongside color indicators
- For strikethrough text on completed todos, ensure the text is still readable

## Dynamic Content

- When adding or removing todos dynamically, use `aria-live="polite"` on the container to announce changes to screen readers
- After creating a todo, provide feedback (e.g., "Todo added successfully")
- After deleting a todo, move focus to a logical next element

## Images and Icons

- Informative images must have meaningful `alt` text
- Decorative images/icons must have `alt=""` or `aria-hidden="true"`
- Bootstrap Icons used purely for decoration should have `aria-hidden="true"`
- Icons that convey meaning must have a visible text label or `aria-label`
