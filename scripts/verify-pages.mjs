import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const languages = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN'];
const base = process.env.BASE_PATH || '/';
const origin = (process.env.VITE_SITE_URL || 'https://luisiturrios1.github.io/resume/').replace(
  /\/?$/,
  '/',
);
for (const language of languages) {
  const html = readFileSync(`dist/${language}/index.html`, 'utf8');
  assert.ok(html.includes(`<html lang="${language}">`));
  assert.ok(html.includes(`rel="canonical" href="${origin}${language}/"`));
  assert.equal((html.match(/hreflang=/g) || []).length, 9);
  assert.ok(html.includes('application/ld+json'));
  assert.ok(html.includes('<h1'));
  assert.ok(html.includes('luisiturrios1@gmail.com'));
  assert.ok(!html.includes('<!--app-->'));
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1];
    if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('#')) continue;
    assert.ok(url.startsWith(base), `${language}: incorrect base for ${url}`);
    const path = url.slice(base.length).split('#')[0];
    assert.ok(existsSync(`dist/${path}`), `${language}: missing asset ${path}`);
  }
}
assert.ok(readFileSync('dist/404.html', 'utf8').includes('noindex'));
assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(`${origin}zh-CN/`));
assert.ok(existsSync('dist/.nojekyll'));
console.log(
  `Verified ${languages.length} static language routes, metadata, sitemap, PDFs, and asset paths under ${base}`,
);
