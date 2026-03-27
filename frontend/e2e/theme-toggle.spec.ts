import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const screenshotsDir = path.join(import.meta.dirname, 'screenshots');

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

test.describe('Dark/Light mode toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Clean up saved theme after each test so the next test starts from a neutral state
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('theme'));
  });

  test('defaults to light mode on first visit', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-bs-theme', 'light');
  });

  test('toggle button is visible in the navbar', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(toggleBtn).toBeVisible();
  });

  test('switches to dark mode when toggle is clicked', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /switch to dark mode/i });
    await toggleBtn.click();

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-bs-theme', 'dark');
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });

  test('persists theme to localStorage', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /switch to dark mode/i });
    await toggleBtn.click();

    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe('dark');
  });

  test('remembers dark mode after page reload', async ({ page }) => {
    // Enable dark mode and reload — localStorage should persist it
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'dark');
  });

  test('screenshot — light mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'light');
    await page.screenshot({ path: path.join(screenshotsDir, 'light-mode.png'), fullPage: true });
  });

  test('screenshot — dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'dark');
    await page.screenshot({ path: path.join(screenshotsDir, 'dark-mode.png'), fullPage: true });
  });
});

test.describe('System preference: dark', () => {
  test('respects prefers-color-scheme: dark on first load', async ({ browser }) => {
    // Emulate a system dark preference with no saved theme
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    // Navigate once to clear any stale localStorage, then reload to trigger the inline script fresh
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'dark');
    await page.screenshot({
      path: path.join(screenshotsDir, 'system-dark-preference.png'),
      fullPage: true,
    });

    await context.close();
  });
});
