---
description: 'Secure coding guidelines based on OWASP Top 10, adapted for Express.js and SQLite'
applyTo: '**'
---

# Secure Coding and OWASP Guidelines

All code must be secure by default. When in doubt, choose the more secure option and explain the reasoning.

## A01: Broken Access Control

- Enforce the principle of least privilege in all API endpoints
- Deny by default — access should only be granted with an explicit rule
- Validate that users can only access and modify their own resources
- Prevent path traversal in any file-related operations

## A02: Cryptographic Failures

- Never hardcode secrets (API keys, database credentials, tokens) in source code
- Use environment variables or a `.env` file (excluded from version control) for sensitive configuration
- Always use HTTPS in production for data in transit
- If authentication is added in the future, use bcrypt or Argon2 for password hashing — never MD5 or SHA-1

```javascript
// GOOD: Load from environment
const dbPath = process.env.DB_PATH || 'todos.db';

// BAD: Hardcoded secret
const apiKey = "sk_live_abc123xyz789";
```

## A03: Injection

- **SQL Injection**: Always use parameterized queries with `?` placeholders in SQLite — never concatenate user input into SQL strings
- **XSS Prevention**: When rendering user-provided data in Astro templates, ensure it is properly escaped (Astro escapes by default in `{}` expressions)
- Never use `set:html` with unsanitized user input in Astro components
- Sanitize any user input before using it in OS commands

```javascript
// GOOD: Parameterized query
db.run('INSERT INTO todos (text) VALUES (?)', [userInput], callback);

// BAD: String concatenation — SQL injection vulnerability!
db.run(`INSERT INTO todos (text) VALUES ('${userInput}')`, callback);
```

## A05: Security Misconfiguration

- Disable verbose error messages in production — return generic error messages for 500 responses
- Set security headers in Express:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy` (appropriate for the app)
- Configure CORS with specific allowed origins in production instead of allowing all origins
- Keep dependencies up to date — run `npm audit` regularly

## A06: Vulnerable Components

- Use the latest stable versions of all dependencies
- Run `npm audit` before every release
- Remove unused dependencies from `package.json`
- Review third-party packages before adding them to the project

## A07: Authentication Failures

- If authentication is implemented, generate new session identifiers on login
- Set cookies with `HttpOnly`, `Secure`, and `SameSite=Strict` attributes
- Implement rate limiting on authentication endpoints

## Input Validation Rules

- Validate all request body fields exist and have correct types
- Validate string lengths (minimum and maximum)
- Reject unexpected fields in request bodies
- Return `400 Bad Request` with clear error messages for validation failures

```javascript
// Input validation example
app.post('/todos', (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (text.trim().length === 0 || text.length > 500) {
        return res.status(400).json({ error: 'Text must be between 1 and 500 characters' });
    }

    // Proceed with parameterized query...
});
```
