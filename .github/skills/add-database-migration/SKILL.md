---
name: add-database-migration
description: Guide for creating SQLite database migration scripts. Use this when asked to modify the database schema or add new columns.
---

# Add Database Migration

This skill teaches you how to create and run idempotent SQLite migration scripts for this Todo List application.

## When to Use This Skill

Use this skill when you need to:
- Add new columns to the `todos` table
- Create new tables
- Modify the database schema in any way
- Prepare a migration that is safe to run multiple times

## Prerequisites

- Node.js installed
- SQLite database `todos.db` in the `backend/` directory
- The `sqlite3` package is already a dependency

## Steps

1. **Create** `backend/migrations/` directory if it doesn't exist: `mkdir -p backend/migrations`
2. **Determine** the next migration number by checking existing files in `backend/migrations/`.
3. **Write** the migration script following the pattern below.
4. **Run** it: `cd backend && node migrations/NNN_description.js`
5. **Verify** by checking the console output for success messages.
6. **Update** the API endpoints in `backend/index.js` to accept and return the new fields.

## Migration Script Template

```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', 'todos.db'));

db.serialize(() => {
  db.run(`ALTER TABLE todos ADD COLUMN column_name TYPE DEFAULT value`, (err) => {
    if (err) {
      if (err.message.includes('duplicate column name')) {
        console.log('Column already exists — skipping.');
      } else {
        console.error('Migration error:', err.message);
        process.exit(1);
      }
    } else {
      console.log('Migration applied: column_name added.');
    }
  });
});

db.close((err) => {
  if (err) console.error('Error closing database:', err.message);
  else console.log('Migration complete.');
});
```

## Naming Convention

- Files: `NNN_short_description.js` (e.g., `001_add_priority.js`, `002_add_due_date.js`)
- Columns: `snake_case`

## Example: Add Priority and Due Date

```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', 'todos.db'));

db.serialize(() => {
  db.run(`ALTER TABLE todos ADD COLUMN priority TEXT DEFAULT 'medium'`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error:', err.message);
    } else {
      console.log('Column "priority" ready.');
    }
  });

  db.run(`ALTER TABLE todos ADD COLUMN due_date TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error:', err.message);
    } else {
      console.log('Column "due_date" ready.');
    }
  });
});

db.close(() => console.log('Migration finished.'));
```

## After Running the Migration

Update `backend/index.js`:
- `POST /todos` — accept the new field in `req.body` and include it in the INSERT query
- `PUT /todos/:id` — handle updating the new field
- `GET /todos` — the new columns are returned automatically by `SELECT *`
