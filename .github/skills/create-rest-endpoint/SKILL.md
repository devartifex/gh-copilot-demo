---
name: create-rest-endpoint
description: Guide for creating new REST API endpoints in the Express.js backend. Use this when asked to add a new API route or endpoint.
---

# Create REST Endpoint

This skill teaches you how to add a new REST API endpoint to the Express.js backend of this Todo List application.

## When to Use This Skill

Use this skill when you need to:
- Add a new GET, POST, PUT, or DELETE route to `backend/index.js`
- Extend the API with search, filtering, stats, or other features
- Create a new resource endpoint alongside the existing `/todos` routes

## Prerequisites

- The Express server is in `backend/index.js`
- SQLite database with table `todos (id, text, completed)`
- Dependencies are already installed: express, cors, body-parser, sqlite3

## Steps

1. **Open** `backend/index.js` and identify where to add the new route (after existing routes, before `app.listen`).
2. **Validate input** — check required fields exist, return 400 with a message if not.
3. **Query the database** — use parameterized queries (`?`) with `db.all`, `db.get`, or `db.run`.
4. **Handle errors** — return 500 with `err.message` on database failure.
5. **Return JSON** — send the result with `res.json()`.
6. **Test** — restart the server and call the endpoint with curl or the frontend.

## SQLite Method Reference

| Method | Use For | Callback Arg |
|--------|---------|-------------|
| `db.all(sql, params, cb)` | SELECT returning multiple rows | `(err, rows)` |
| `db.get(sql, params, cb)` | SELECT returning one row | `(err, row)` |
| `db.run(sql, params, cb)` | INSERT, UPDATE, DELETE | `(err)` — use `function()` for `this.lastID` / `this.changes` |

## Example: GET /todos/search

```javascript
// GET /todos/search - Search todos by keyword
app.get('/todos/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }

  db.all('SELECT * FROM todos WHERE text LIKE ?', [`%${q}%`], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
```

## Common Mistakes to Avoid

- Never concatenate user input into SQL strings — always use `?` parameters
- Don't forget `return` after sending an error response — the function keeps running otherwise
- Use `function()` (not arrow function) in `db.run` callback when you need `this.lastID`
