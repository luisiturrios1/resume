import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
const locales = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN'];
for (const locale of locales) {
  for (const theme of ['dark', 'light']) {
    test(`${locale} / ${theme}: WCAG AA accessibility at mobile and desktop widths`, async ({
      page,
    }) => {
      await page.addInitScript((value) => localStorage.setItem('portfolio-theme', value), theme);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`${locale}/`);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((node) => node.target) })),
        ).toEqual([]);
      }
    });
  }
}
for (const locale of locales) {
  test(`${locale}: mobile content, case study, downloads, and layout`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${locale}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toBeVisible();
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.product-section summary').click();
    await expect(page.locator('.product-section .case-content')).toBeVisible();
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('.navigation')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.navigation')).not.toBeVisible();
    const dictionary = JSON.parse(readFileSync(`src/i18n/${locale}/common.json`, 'utf8'));
    await expect(page.locator('main')).toHaveAttribute('lang', locale);
    await expect(page.locator('#hero-title')).toContainText(dictionary.heroFirst);
    await expect(page.locator('#engineering h2')).toHaveText(dictionary.kueskiTitle);
    await expect(page).toHaveTitle(dictionary.seoTitle);
    const filename = `luis-iturrios-resume-${locale}.pdf`;
    const links = page.locator('a[download]');
    for (const anchor of await links.all()) {
      await expect(anchor).toHaveAttribute('href', new RegExp(`/resume/${filename}$`));
      await expect(anchor).toHaveAttribute('download', filename);
      await expect(anchor).toHaveAttribute('hreflang', locale);
    }
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#resume a[download]').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(filename);
    expect(readFileSync((await download.path())!)).toEqual(
      readFileSync(`public/resume/${filename}`),
    );
    const response = await page.request.get(`resume/${filename}`);
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
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('.theme-control').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('architecture comparison and product screen controls work by keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('en/');
  const before = page.locator('.diagram-controls button').filter({ hasText: 'Before' });
  await before.focus();
  await page.keyboard.press('Enter');
  await expect(before).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.diagram-status')).toContainText('Amazon EC2 and Jenkins');
  await page.locator('.diagram-controls button').filter({ hasText: 'After' }).click();
  await expect(page.locator('.diagram-status')).toContainText(
    'without direct Platform Engineering',
  );
  await page.locator('.screen-controls button').nth(2).click();
  await expect(page.locator('.story-phone img.is-active')).toHaveAttribute('src', /poi-medium/);
});
test('static Spanish page, disclosures, and PDF work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const base = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173/';
  await page.goto(`${base}es/#engineering`);
  await expect(page.locator('h1')).toContainText('Construyo');
  await expect(page.locator('.before-panel')).toContainText('Amazon EC2');
  await expect(page.locator('.after-panel')).toContainText('Amazon EKS');
  await page.locator('.engineering-section summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.engineering-section .case-content')).toContainText(
    'Diseñé personalmente',
  );
  await expect(page.locator('.no-script-languages')).toBeVisible();
  await expect(page.locator('#resume a[download]')).toHaveAttribute('href', /resume-es.pdf$/);
  await context.close();
});
test('reduced motion, internal links, and refreshed deep routes remain usable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('es/#engineering');
  await page.reload();
  await expect(page.locator('#engineering h2')).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href')!)
        .filter((href) => !document.getElementById(href.slice(1))),
    );
  expect(missing).toEqual([]);
  await page.selectOption('#language', 'en');
  await expect(page).toHaveURL(/en\/#engineering$/);
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
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

test('switching through every language updates copy, SEO, and every download', async ({ page }) => {
  await page.goto('en/');
  for (const locale of locales) {
    await page.selectOption('#language', locale);
    const dictionary = JSON.parse(readFileSync(`src/i18n/${locale}/common.json`, 'utf8'));
    await expect(page.locator('main')).toHaveAttribute('lang', locale);
    await expect(page.locator('#hero-title')).toContainText(dictionary.heroFirst);
    await expect(page.locator('#engineering h2')).toHaveText(dictionary.kueskiTitle);
    await expect(page).toHaveTitle(dictionary.seoTitle);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      'content',
      dictionary.socialImageAlt,
    );
    for (const anchor of await page.locator('a[download]').all()) {
      await expect(anchor).toHaveAttribute('download', `luis-iturrios-resume-${locale}.pdf`);
      await expect(anchor).toHaveAttribute('href', new RegExp(`resume-${locale}.pdf$`));
    }
  }
  await page.reload();
  await expect(page.locator('#resume a[download]')).toHaveAttribute(
    'download',
    'luis-iturrios-resume-zh-CN.pdf',
  );
});
test('all eight static languages offer matching PDFs and language links without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const base = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173/';
  for (const locale of locales) {
    await page.goto(`${base}${locale}/`);
    const dictionary = JSON.parse(readFileSync(`src/i18n/${locale}/common.json`, 'utf8'));
    await expect(page.locator('#engineering h2')).toHaveText(dictionary.kueskiTitle);
    await expect(page.locator('.no-script-languages a')).toHaveCount(8);
    await expect(page.locator('#resume a[download]')).toHaveAttribute(
      'download',
      `luis-iturrios-resume-${locale}.pdf`,
    );
  }
  await context.close();
});

for (const saved of ['unset', 'dark', 'light', 'system']) {
  for (const colorScheme of ['dark', 'light'] as const) {
    test(`theme ${saved} / ${colorScheme}: one click changes the visible color and persists`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.addInitScript((value) => {
        if (value !== 'unset' && !localStorage.getItem('portfolio-theme'))
          localStorage.setItem('portfolio-theme', value);
      }, saved);
      await page.goto('en/');
      const initial =
        saved === 'light' || (saved === 'system' && colorScheme === 'light') ? 'light' : 'dark';
      const opposite = initial === 'dark' ? 'light' : 'dark';
      await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
      const background = await page
        .locator('body')
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      await page.locator('.theme-control').click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', opposite);
      expect(
        await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor),
      ).not.toBe(background);
      expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe(opposite);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', opposite);
      await page.locator('.theme-control').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
    });
  }
}

test('a saved system preference tracks the visible scheme until the user toggles it', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'system'));
  await page.goto('en/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.theme-control')).toHaveAttribute(
    'aria-label',
    'Change color theme: Light',
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.theme-control')).toHaveAttribute(
    'aria-label',
    'Change color theme: Dark',
  );
  await page.locator('.theme-control').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('dark');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
