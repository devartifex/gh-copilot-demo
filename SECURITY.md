# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

Only the latest version on the `main` branch receives security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainers at **[security@example.com](mailto:security@example.com)** with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - The potential impact
   - Any suggested fixes (optional)
3. You will receive an acknowledgment within **48 hours** and a detailed response within **5 business days**.

## Security Best Practices for Contributors

This project follows secure coding guidelines based on the OWASP Top 10. All contributors must adhere to the following:

### SQL Injection Prevention

- Always use parameterized queries with `?` placeholders — never concatenate user input into SQL strings.

```javascript
// GOOD
db.run('INSERT INTO todos (text) VALUES (?)', [userInput], callback);

// BAD
db.run(`INSERT INTO todos (text) VALUES ('${userInput}')`);
```

### Input Validation

- Validate all request body fields for existence, type, and length.
- Return `400 Bad Request` with clear error messages for invalid input.

### Secrets Management

- Never hardcode secrets (API keys, tokens, credentials) in source code.
- Use environment variables or a `.env` file (excluded from version control via `.gitignore`).

### Dependencies

- Run `npm audit` regularly and before every release.
- Keep all dependencies up to date.
- Remove unused dependencies from `package.json`.

### Security Headers

The Express backend should set the following headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy` (appropriate for the application)

### XSS Prevention

- Astro escapes expressions in `{}` by default — do not use `set:html` with unsanitized user input.

## Disclosure Policy

- Vulnerabilities will be patched in a timely manner and disclosed after a fix is available.
- Credit will be given to reporters unless they prefer to remain anonymous.
