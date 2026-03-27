# Copilot Code Review Instructions

## Review Focus

Prioritize the following in code reviews:

1. **Security vulnerabilities** — SQL injection, XSS, credential exposure, insecure dependencies
2. **Logic errors and bugs** — Off-by-one errors, null/undefined handling, race conditions, incorrect control flow
3. **Performance issues** — N+1 queries, unnecessary re-renders, missing indexes, memory leaks
4. **Error handling** — Missing try/catch blocks, unhandled promise rejections, inadequate error messages
5. **API contract violations** — Breaking changes, missing validation, incorrect status codes

## What NOT to Flag

Do NOT comment on the following — these are handled by linters and formatters:

- Casing conventions in comments (e.g., `todo` vs `TODO:` vs `TODO`)
- Whitespace, indentation, or formatting issues
- Import ordering
- Trailing commas or semicolons
- Line length (unless extreme)
- Missing JSDoc on internal/private functions
- Placeholder comments like `// TODO`, `// FIXME`, `// HACK`

## Tone and Style

- Be concise — one or two sentences per comment
- Explain **why** something is an issue, not just **what** is wrong
- Suggest a fix when possible
- Use a constructive, professional tone
- Group related issues into a single comment rather than leaving many small ones

## Project-Specific Guidelines

- This project uses **Express.js** (backend) and **Astro** (frontend)
- Database queries must use **parameterized statements** (no string concatenation for SQL)
- All API endpoints must validate input before processing
- Frontend components should handle loading and error states
- Use `async/await` over `.then()` chains
