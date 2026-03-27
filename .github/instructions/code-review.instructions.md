---
description: 'Code review guidelines adapted for this Express.js + Astro + SQLite stack'
applyTo: '**'
excludeAgent: ["coding-agent"]
---

# Code Review Instructions

## Review Language

Respond in **English** when performing code reviews.

## Review Priorities

### 🔴 CRITICAL (Block merge)

- **Security**: SQL injection vulnerabilities, exposed secrets, missing input validation
- **Correctness**: Logic errors in CRUD operations, incorrect HTTP status codes, data corruption risks
- **Breaking Changes**: API contract changes without updating the frontend

### 🟡 IMPORTANT (Requires discussion)

- **Code Quality**: Duplicated code, missing error handling in SQLite callbacks, inconsistent patterns
- **Test Coverage**: Missing Jest tests for new API endpoints or missing Playwright E2E tests for frontend changes
- **Performance**: Missing database indexing, N+1 query patterns

### 🟢 SUGGESTION (Non-blocking improvements)

- **Readability**: Unclear variable names, complex inline logic that could be extracted
- **Best Practices**: Minor deviations from project conventions
- **Documentation**: Missing JSDoc or unclear comments

## Review Checklist

### Backend (Express.js + SQLite)

- [ ] All SQL queries use parameterized queries (`?` placeholders)
- [ ] All SQLite callbacks handle errors and return appropriate status codes
- [ ] Input validation is present for all request body fields
- [ ] New endpoints follow RESTful conventions (correct HTTP methods and status codes)
- [ ] No sensitive data exposed in error responses
- [ ] `this.lastID` or `this.changes` used appropriately after `db.run()`

### Frontend (Astro + Bootstrap)

- [ ] TypeScript interfaces defined for all data structures
- [ ] Fetch calls include error handling with user-visible feedback
- [ ] Bootstrap classes used exclusively for styling (no custom CSS unless justified)
- [ ] Interactive elements are keyboard accessible
- [ ] Form inputs have proper labels and validation
- [ ] Component props are typed with TypeScript interfaces

### Testing — Backend (Jest)

- [ ] New API endpoints have corresponding test cases
- [ ] Tests cover success paths, validation errors, and error scenarios
- [ ] Tests are independent and don't depend on execution order
- [ ] Test names clearly describe what is being tested
- [ ] Assertions are specific (not just truthy/falsy checks)

### Testing — Frontend (Playwright)

- [ ] New UI features have corresponding Playwright E2E tests in `frontend/e2e/`
- [ ] Tests use Playwright locators (`getByRole`, `getByText`, `getByLabel`) over raw CSS selectors
- [ ] Tests cover the full user flow (create, edit, complete, delete)
- [ ] Tests verify visible UI state with meaningful assertions (`toBeVisible`, `toHaveText`, `toHaveCount`)
- [ ] Tests are independent and do not rely on state from other tests
- [ ] No use of Jest, Vitest, or other frameworks for frontend/UI testing — Playwright only

## Comment Format

```markdown
**[🔴/🟡/🟢] Category: Brief title**

Description of the issue.

**Why this matters:**
Explanation of impact.

**Suggested fix:**
[code example]
```

## General Principles

1. Be specific — reference exact lines and files
2. Explain WHY something is an issue, not just WHAT
3. Provide corrected code examples when applicable
4. Acknowledge well-written code
5. Be constructive — focus on improving the code, not criticizing the author
