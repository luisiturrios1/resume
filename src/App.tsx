import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { OpenSource } from './sections/OpenSource';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { translator } from './i18n';
import { usePreferences } from './hooks/usePreferences';
import { updateSeo } from './utils/seo';
import type { Locale } from './utils/preferences';
export default function App({ initialLocale = 'en' }: { initialLocale?: Locale }) {
  const { locale, theme, changeLocale, changeTheme } = usePreferences(initialLocale);
  const t = translator(locale);
  useEffect(() => updateSeo(locale), [locale]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t('skip')}
      </a>
      <div id="top" />
      <Header
        locale={locale}
        theme={theme}
        t={t}
        changeLocale={changeLocale}
        changeTheme={changeTheme}
      />
      <main id="main" className="site-container" tabIndex={-1}>
        <Hero t={t} locale={locale} />
        <Projects t={t} />
        <Experience t={t} locale={locale} />
        <OpenSource t={t} locale={locale} />
        <About t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <footer className="site-container footer">
        <a href="#top" className="footer-brand">
          Luis Iturrios<span>.</span>
        </a>
        <p>{t('footer')}</p>
        <a href="#top">
          {t('backTop')} <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
