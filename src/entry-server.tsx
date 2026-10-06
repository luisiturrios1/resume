import { renderToString } from 'react-dom/server';
import App from './App';
import { seoMarkup } from './utils/seo';
import { translator } from './i18n';
import { locales, type Locale } from './utils/preferences';
export { locales };
export function render(locale: Locale) {
  return { html: renderToString(<App initialLocale={locale} />), head: seoMarkup(locale) };
}

export const errorTranslations = Object.fromEntries(
  locales.map((locale) => {
    const t = translator(locale);
    return [locale, { title: t('notFound'), link: t('returnHome') }];
  }),
);
