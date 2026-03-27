---
description: "Generate a complete Jest + supertest test suite for the backend API"
agent: "agent"
tools: ["read", "edit", "execute", "search"]
---

# Generate Backend Tests

Generate a complete Jest test suite for the backend API in [backend/index.js](../../backend/index.js).

## Instructions

1. Ensure `jest` and `supertest` are in `backend/package.json` devDependencies. If not, run: `cd backend && npm install --save-dev jest supertest`
2. Create `backend/__tests__/todos.test.js`.
3. Set up an in-memory SQLite database (`:memory:`) in `beforeAll` for test isolation.
4. Re-register the same Express routes from `backend/index.js` using the test database.
5. Write tests for each endpoint:
   - **GET /todos** — returns 200 with array, handles empty list
   - **POST /todos** — creates todo with valid text (200), rejects missing text (400)
   - **PUT /todos/:id** — updates text (200), updates completed (200), rejects empty body (400)
   - **DELETE /todos/:id** — deletes a todo (200)
6. For each endpoint test both success and error cases.
7. Verify status codes, JSON response structure, and specific field values.
8. Run tests: `cd backend && npx jest --verbose`
