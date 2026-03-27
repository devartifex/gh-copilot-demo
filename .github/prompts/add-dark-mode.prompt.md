---
description: "Add a dark/light mode toggle to the application navbar"
agent: "agent"
tools: ["read", "edit", "search"]
---

# Add Dark Mode

Add a dark/light mode toggle to the application layout at [frontend/src/layouts/Layout.astro](../../frontend/src/layouts/Layout.astro).

## Requirements

1. Add a toggle button in the navbar, next to the "Todo List" brand.
2. Use Bootstrap 5's `data-bs-theme` attribute on the `<html>` element to switch themes.
3. Show `bi-moon-fill` icon in light mode and `bi-sun-fill` icon in dark mode.
4. Save the user's preference in `localStorage` under the key `theme`.
5. Load the saved preference on page load **before rendering** to prevent a flash of wrong theme.
6. Use Bootstrap classes for the button: `btn btn-outline-light btn-sm`.
