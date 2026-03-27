---
description: "Add a new REST API endpoint to the Express.js backend"
agent: "agent"
tools: ["read", "edit", "execute", "search"]
---

# Add REST Endpoint

Add a new REST API endpoint to [backend/index.js](../../backend/index.js).

## What to Add

{{description}}

## Instructions

1. Read the existing endpoints in `backend/index.js` to understand the pattern.
2. Add the new route after the existing routes, before `app.listen`.
3. Follow the same coding style: parameterized SQLite queries (`?`), callback error handling, JSON responses.
4. Validate all required input — return 400 with a descriptive error message if missing.
5. Handle database errors — return 500 with `err.message`.
6. Test the endpoint by running `cd backend && node index.js` and calling it with curl.
