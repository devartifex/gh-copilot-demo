---
description: 'Guidelines for writing self-explanatory code with minimal but meaningful comments'
applyTo: '**/*.js,**/*.ts,**/*.astro'
---

# Self-Explanatory Code Commenting Instructions

## Core Principle

Write code that speaks for itself. Comment only when necessary to explain **WHY**, not **WHAT**. All comments must be in English.

## Avoid These Comment Types

```javascript
// BAD: States the obvious
let counter = 0; // Initialize counter to zero

// BAD: Repeats the code
function getTodoText() {
    return todo.text; // Return the todo's text
}

// BAD: Outdated comment
// Fetch todos from port 5000
const response = await fetch('http://localhost:3000/todos');
```

## Write These Comment Types

```javascript
// GOOD: Explains WHY
// SQLite returns 0/1 for booleans; convert to true/false for the API response
const completed = Boolean(row.completed);

// GOOD: Documents an API constraint
// Express body-parser has a default 100kb limit; increase for large payloads
app.use(bodyParser.json({ limit: '1mb' }));

// GOOD: Explains a non-obvious business rule
// New todos default to incomplete — the completed field is set by PUT /todos/:id
db.run('INSERT INTO todos (text) VALUES (?)', [text], callback);
```

## Decision Framework

Before writing a comment, ask:

1. **Is the code self-explanatory?** → No comment needed
2. **Would a better variable/function name eliminate the need?** → Refactor instead
3. **Does this explain WHY, not WHAT?** → Good comment
4. **Will this help future maintainers?** → Good comment

## JSDoc for Public APIs

Document API route handlers with brief JSDoc describing purpose, parameters, and responses:

```javascript
/**
 * Create a new todo item.
 * @param {string} req.body.text - The todo text (required)
 * @returns {object} 201 - The created todo { id, text, completed }
 * @returns {object} 400 - Error if text is missing
 */
app.post('/todos', (req, res) => { /* ... */ });
```

## Annotations

Use these prefixes for actionable comments:

```javascript
// TODO: Add pagination for large todo lists
// FIXME: Error handling missing for network timeout
// HACK: Workaround for SQLite concurrent write limitation
// NOTE: This assumes UTC timezone for all date comparisons
// SECURITY: Validate input to prevent SQL injection
```

## Anti-Patterns

- Do not comment out code — delete it (use version control to recover)
- Do not maintain changelogs in comments — use Git commit history
- Do not use decorative divider comments (`//=====`)
- Do not use `@author` tags — Git blame provides this information
