import { translator } from '../i18n';
import { profile } from '../data/profile';
import { locales, type Locale } from './preferences';
export const siteUrl = (
  import.meta.env.VITE_SITE_URL || 'https://luisiturrios1.github.io/resume/'
).replace(/\/?$/, '/');
export function seo(locale: Locale) {
  const t = translator(locale);
  return {
    title: t('seoTitle'),
    description: t('seoDescription'),
    canonical: `${siteUrl}${locale}/`,
    ogLocale: {
      en: 'en_US',
      es: 'es_MX',
      de: 'de_DE',
      fr: 'fr_FR',
      nl: 'nl_NL',
      it: 'it_IT',
      ja: 'ja_JP',
      'zh-CN': 'zh_CN',
    }[locale],
  };
}
export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Mobile Software Engineer · Flutter & Swift',
  url: siteUrl,
  sameAs: [profile.github, profile.linkedin],
};
export function updateSeo(locale: Locale) {
  const data = seo(locale);
  document.title = data.title;
  document.documentElement.lang = locale;
  for (const [selector, content] of [
    ['meta[name="description"]', data.description],
    ['meta[property="og:title"]', data.title],
    ['meta[property="og:description"]', data.description],
    ['meta[property="og:url"]', data.canonical],
    ['meta[property="og:locale"]', data.ogLocale],
  ])
    document.querySelector(selector)?.setAttribute('content', content);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', data.canonical);
}
const escape = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function seoMarkup(locale: Locale) {
  const data = seo(locale);
  return `<title>${escape(data.title)}</title><meta name="description" content="${escape(data.description)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(data.title)}"><meta property="og:description" content="${escape(data.description)}"><meta property="og:url" content="${data.canonical}"><meta property="og:locale" content="${data.ogLocale}"><meta property="og:site_name" content="Luis Iturrios"><link rel="canonical" href="${data.canonical}">${locales.map((l) => `<link rel="alternate" hreflang="${l}" href="${siteUrl}${l}/">`).join('')}<link rel="alternate" hreflang="x-default" href="${siteUrl}en/"><script type="application/ld+json">${JSON.stringify(person)}</script>`;
}
