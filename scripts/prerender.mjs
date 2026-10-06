import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { render, locales, errorTranslations } from '../.ssr/entry-server.js';
const template = await readFile('dist/index.html', 'utf8');
const page = (locale) => {
  const result = render(locale);
  return template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace('<!--seo-->', result.head)
    .replace('<!--app-->', result.html);
};
for (const locale of locales) {
  await mkdir(`dist/${locale}`, { recursive: true });
  await writeFile(`dist/${locale}/index.html`, page(locale));
}
await writeFile('dist/index.html', page('en'));
// A translated home page is never served as a successful response for an unknown URL.
const root = (process.env.VITE_SITE_URL || 'https://luisiturrios1.github.io/resume/').replace(
  /\/?$/,
  '/',
);
const base = process.env.BASE_PATH || '/';
const errorScript = `<script>(()=>{const copy=${JSON.stringify(errorTranslations)};const prefix=${JSON.stringify(base)};let locale=location.pathname.slice(prefix.length).split('/')[0];if(!copy[locale]){try{locale=localStorage.getItem('portfolio-language')}catch{}}if(!copy[locale])locale='en';document.documentElement.lang=locale;document.title='404 · '+copy[locale].title;document.getElementById('error-title').textContent=copy[locale].title;const link=document.getElementById('error-home');link.textContent=copy[locale].link+' →';link.href=prefix+locale+'/';})()</script>`;
const fallback = template
  .replace('<!--seo-->', '<title>404 · Luis Iturrios</title><meta name="robots" content="noindex">')
  .replace(
    '<!--app-->',
    `<main style="font-family:system-ui;max-width:600px;margin:15vh auto;padding:24px"><p>404</p><h1 id="error-title">${errorTranslations.en.title}</h1><a id="error-home" href="${base}en/">${errorTranslations.en.link} →</a></main>${errorScript}`,
  )
  .replace(/<script type="module"[^>]*><\/script>/g, '');
await writeFile('dist/404.html', fallback);
await writeFile('dist/.nojekyll', '');
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locales.map((locale) => `<url><loc>${root}${locale}/</loc>${locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${root}${l}/"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${root}en/"/></url>`).join('')}</urlset>`,
);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${root}sitemap.xml\n`);
console.log(`Pre-rendered ${locales.length} localized pages, sitemap, and 404.`);
