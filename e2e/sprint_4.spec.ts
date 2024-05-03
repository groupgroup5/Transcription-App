import { test, expect } from '@playwright/test';

test('Open app', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
});

test('Light/dark modes', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByLabel('Light Switch').getByRole('img').click();
  await page.getByLabel('Light Switch').click();
});

test('File Sorting', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('combobox').selectOption('Recently Edited');
  await page.getByRole('combobox').selectOption('Name');
});

test('File Search', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByPlaceholder('Search projects...').click();
  await page.getByPlaceholder('Search projects...').fill('CS');
  await page.getByPlaceholder('Search projects...').press('Enter');
});

test('Create blank file', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('button', { name: 'Blank File' }).click();
});

test('Edit timestamp', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().fill('00:00:17');
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().fill('00:00:22');
});

test('Transcript Editing', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().fill('00:00:17');
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().fill('00:00:22');
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').click();
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').fill('Test, 1, 2, 3');
  await page.locator('#inline-text').nth(1).click();
});

test('Remove segment', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().fill('00:00:17');
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().fill('00:00:22');
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').click();
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').fill('Test, 1, 2, 3');
  await page.locator('#inline-text').nth(1).click();
  await page.locator('div').filter({ hasText: /^00:00:17 00:00:22 Test, 1, 2, 3 x$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'x' }).click();
});

test('Create new segment', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().click();
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().press('ArrowRight');
  await page.locator('#inline-timestamp > div').first().fill('00:00:17');
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().click();
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().press('ArrowRight');
  await page.getByText(':00:00').first().fill('00:00:22');
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').click();
  await page.locator('#main-content div').filter({ hasText: ':00:17 00:00:22 x' }).locator('#inline-text').fill('Test, 1, 2, 3');
  await page.locator('#inline-text').nth(1).click();
  await page.locator('div').filter({ hasText: /^00:00:17 00:00:22 Test, 1, 2, 3 x$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'x' }).click();
  await page.getByRole('button', { name: 'Add New Segment' }).click();
  await page.locator('#inline-text').click();
  await page.locator('#inline-text').fill('Mew');
});

test('Upload file to transcribe', async ({ page }) => {
  await page.goto('http://localhost:1420/home');
  await page.getByRole('link', { name: 'Transcript' }).click();
  await page.getByText('Upload', { exact: true }).click();
});





