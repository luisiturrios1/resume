import { test, expect } from '@playwright/test';
const locales = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN'];
for (const locale of locales) {
  test(`${locale}: mobile content, case study, downloads, and layout`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${locale}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.locator('summary').click();
    await expect(page.locator('.case-content')).toBeVisible();
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('.navigation')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.navigation')).not.toBeVisible();
    const response = await page.request.get('resume/luis-iturrios-resume-en.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(errors).toEqual([]);
  });
}
test('language selection persists and updates URL and SEO; theme persists', async ({ page }) => {
  await page.goto('en/');
  await page.selectOption('#language', 'es');
  await expect(page).toHaveURL(/\/es\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/es\/$/);
  await page.reload();
  await expect(page.locator('#language')).toHaveValue('es');
  await page.goto('./');
  await expect(page.locator('#language')).toHaveValue('es');
  await page.locator('.theme-control').click();
  await page.locator('.theme-control').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('desktop navigation and ultrawide layout', async ({ page }) => {
  for (const width of [768, 1280, 1920, 2560]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('en/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('en/');
  await page.locator('.navigation a[href="#experience"]').click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('.header')).toHaveClass(/compact/);
});
