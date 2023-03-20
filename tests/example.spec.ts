// e2e/example.spec.ts

import { test, expect } from '@playwright/test'

test('should open the landing page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle('Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang')
  await expect(page.locator('h2')).toBeGreaterThan(2)
  await expect(page.locator('h1')).toBeLessThanOrEqual(1)
})