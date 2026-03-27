---
name: generate-jest-tests
description: Guide for generating Jest test suites for Express.js API endpoints using supertest. Use this when asked to write tests for the backend.
---

# Generate Jest Tests

This skill teaches you how to create a complete Jest test suite for the backend API of this Todo List application.

## When to Use This Skill

Use this skill when you need to:
- Write tests for existing or new API endpoints
- Set up test infrastructure (Jest + supertest) for the backend
- Verify that the API handles both success and error cases correctly

## Prerequisites

- Node.js installed
- `backend/index.js` with Express routes
- `sqlite3` package installed (already a dependency in `backend/package.json`)
- Jest and supertest installed: `cd backend && npm install --save-dev jest supertest`

## Steps

1. **Check** dependencies — ensure `jest` and `supertest` are in `backend/package.json` devDependencies. If missing, install them.
2. **Create** `backend/__tests__/` directory if it doesn't exist.
3. **Write** a test file (e.g., `backend/__tests__/todos.test.js`).
4. **Set up** an in-memory SQLite database in `beforeAll` to isolate tests from real data.
5. **Register** the same Express routes using the test database.
6. **Write** tests: one `describe` block per endpoint, covering success and error cases.
7. **Run** with `cd backend && npx jest --verbose`.

## Test File Template

```javascript
const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

let app;
let db;

beforeAll((done) => {
  db = new sqlite3.Database(':memory:');
  db.run(`CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )`, () => {
    app = express();
    app.use(express.json());

    // Register routes using the test db — mirror backend/index.js
    app.get('/todos', (req, res) => {
      db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    app.post('/todos', (req, res) => {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'Text is required' });
      db.run('INSERT INTO todos (text) VALUES (?)', [text], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, text, completed: false });
      });
    });

    // ... register PUT and DELETE routes the same way

    done();
  });
});

afterAll((done) => {
  db.close(done);
});

describe('GET /todos', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /todos', () => {
  it('should create a new todo with valid text', async () => {
    const res = await request(app).post('/todos').send({ text: 'Buy groceries' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toBe('Buy groceries');
    expect(res.body.completed).toBe(false);
  });

  it('should return 400 when text is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Text is required');
  });
});
```

## Guidelines

- One `describe` block per endpoint
- Test names should clearly describe the expected behavior
- Always verify: status code, response body structure, specific field values
- Use `:memory:` SQLite database for speed and isolation
- Clean up test data between tests if needed with `beforeEach`
