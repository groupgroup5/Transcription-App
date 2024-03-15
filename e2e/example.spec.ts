import { test, expect } from '@playwright/test';

test('can open start page', async ({ page }) => {
  await page.goto('http://localhost:1420/');

  await expect(page).toHaveURL('http://localhost:1420/dashboard');
});

test('can open home', async ({ page }) => {
  await page.goto('http://localhost:1420/');

  await page.getByRole('link', { name: 'Home' }).click();

  await expect(page).toHaveURL('http://localhost:1420/home');
});


test('can open editor', async ({ page }) => {
  await page.goto('http://localhost:1420/');

  await page.getByRole('link', { name: 'Editor' }).click();

  await expect(page).toHaveURL('http://localhost:1420/editor');
});