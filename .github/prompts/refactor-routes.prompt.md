---
description: "Refactor the backend by extracting routes into a separate module"
agent: "agent"
tools: ["read", "edit", "execute", "search"]
---

# Refactor Routes

Refactor the backend by separating routes from the main server file.

## Steps

1. Create `backend/routes/todos.js` using `express.Router()`.
2. Move all `/todos` route handlers from [backend/index.js](../../backend/index.js) into the new router file.
3. Accept the SQLite database connection (`db`) as a parameter — export a factory function like `module.exports = (db) => { ... return router; }`.
4. Update `backend/index.js`:
   - Import the router: `const todosRouter = require('./routes/todos')(db);`
   - Mount it: `app.use('/todos', todosRouter);`
   - Keep middleware (cors, bodyParser) in the main file.
5. Verify the refactoring: `cd backend && node index.js` and test all endpoints still work.
6. If tests exist, run them: `cd backend && npx jest --verbose`.
