---
description: 'Express.js and SQLite backend development standards for this Todo List API'
applyTo: 'backend/**/*.js'
---

# Express.js Backend Development Instructions

## Project Context

- Express.js REST API server running on port `3000`
- SQLite3 database stored in `backend/todos.db`
- CommonJS modules (`require`/`module.exports`)
- Middleware: `cors`, `body-parser` (JSON)
- Single entry point: `backend/index.js`

## API Design

- Follow RESTful conventions strictly: `GET` (read), `POST` (create), `PUT` (update), `DELETE` (remove)
- All responses must be JSON (`res.json(...)`)
- Use appropriate HTTP status codes:
  - `200` — Success
  - `201` — Created (for POST)
  - `400` — Bad request (missing/invalid input)
  - `404` — Resource not found
  - `500` — Server error (database failures)
- Validate all request body fields before database operations
- Return meaningful error messages in `{ error: "message" }` format

### Route Pattern

```javascript
app.post('/resource', (req, res) => {
    const { field } = req.body;

    // 1. Validate input
    if (!field) {
        return res.status(400).json({ error: 'Field is required' });
    }

    // 2. Database operation with parameterized query
    db.run('INSERT INTO resource (field) VALUES (?)', [field], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // 3. Return created resource
        res.status(201).json({ id: this.lastID, field });
    });
});
```

## Database Guidelines

- Always use parameterized queries (`?` placeholders) — never concatenate user input into SQL strings
- Handle all SQLite callback errors with appropriate HTTP status codes
- Use `db.all()` for SELECT queries returning multiple rows
- Use `db.get()` for SELECT queries returning a single row
- Use `db.run()` for INSERT, UPDATE, DELETE operations
- Access `this.lastID` after INSERT and `this.changes` after UPDATE/DELETE inside `db.run()` callbacks
- Create tables with `IF NOT EXISTS` on server startup

## Error Handling

- Always check for errors in SQLite callbacks as the first operation
- Return early after sending error responses (`return res.status(...).json(...)`)
- Log errors to console for debugging (`console.error(err.message)`)
- Never expose internal database error details in production — return generic messages for 500 errors

## Security

- CORS is enabled for cross-origin requests from the frontend
- Validate and sanitize all user input on the server side
- Never trust client-provided data — always validate types and required fields
- Use parameterized queries exclusively to prevent SQL injection
- Never expose sensitive information (database paths, stack traces) in API responses

## Code Style

- Write comments in English
- Use `const` for variables that don't change, `let` only when reassignment is needed
- Use template literals for string interpolation
- Use arrow functions for callbacks
- Keep route handlers focused — extract complex logic into helper functions if needed
