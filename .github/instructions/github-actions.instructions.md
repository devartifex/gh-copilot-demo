---
description: 'GitHub Actions CI/CD best practices for this Node.js monorepo with Express backend and Astro frontend'
applyTo: '.github/workflows/*.yml,.github/workflows/*.yaml'
---

# GitHub Actions CI/CD Best Practices

## Project Context

This is a Node.js monorepo with:

- `backend/` — Express.js API with SQLite (Jest for testing)
- `frontend/` — Astro web application
- Root `package.json` with `concurrently` for running both

## Workflow Structure

- Use descriptive names for workflow files (e.g., `ci.yml`, `deploy.yml`)
- Set `permissions` explicitly — default to `contents: read`
- Use `concurrency` to prevent duplicate runs on the same branch
- Pin actions to full commit SHA or major version tag (`@v4`) — never use `@main` or `@latest`

## Caching

Cache `node_modules` for both backend and frontend to speed up builds:

```yaml
- name: Cache Node.js modules
  uses: actions/cache@v4
  with:
    path: |
      backend/node_modules
      frontend/node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

## Testing

- Run `npm test` in the `backend/` directory for Jest tests
- Run Playwright E2E tests in the `frontend/` directory with `npx playwright test`
- Install Playwright browsers in CI with `npx playwright install --with-deps`
- Run linting and type checking for the frontend
- Publish test results as artifacts for PR visibility
- Enforce minimum test coverage thresholds
- Upload Playwright HTML report as an artifact on failure

## Build and Deploy

- Build the Astro frontend with `npm run build` in the `frontend/` directory
- Upload build artifacts for deployment jobs
- Use GitHub Environments with protection rules for production deployments
- Use manual approval for production deployments

## Security

- Store all secrets (API keys, deployment credentials) in GitHub Secrets
- Use OIDC for cloud provider authentication when possible
- Run `npm audit` as part of CI to detect vulnerable dependencies
- Never print secrets to logs

## Recommended CI Workflow Structure

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install backend dependencies
        run: cd backend && npm ci
      - name: Run backend tests
        run: cd backend && npm test
      - name: Install frontend dependencies
        run: cd frontend && npm ci
      - name: Install Playwright browsers
        run: cd frontend && npx playwright install --with-deps
      - name: Build frontend
        run: cd frontend && npm run build
      - name: Run Playwright E2E tests
        run: cd frontend && npx playwright test
      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: frontend/playwright-report/
```
