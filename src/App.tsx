import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { OpenSource } from './sections/OpenSource';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Engineering } from './sections/Engineering';
import { Resume } from './sections/Resume';
import { translator } from './i18n';
import { usePreferences } from './hooks/usePreferences';
import { updateSeo } from './utils/seo';
import { locales, languageNames, type Locale } from './utils/preferences';
export default function App({ initialLocale = 'en' }: { initialLocale?: Locale }) {
  const { locale, resolvedTheme, changeLocale, changeTheme } = usePreferences(initialLocale);
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
        theme={resolvedTheme}
        t={t}
        changeLocale={changeLocale}
        changeTheme={changeTheme}
      />
      <main id="main" className="site-container" tabIndex={-1} lang={locale}>
        <Hero t={t} locale={locale} />
        <Projects t={t} locale={locale} />
        <Engineering t={t} />
        <OpenSource t={t} locale={locale} />
        <Experience t={t} locale={locale} />
        <About t={t} />
        <Resume t={t} locale={locale} />
        <Contact t={t} locale={locale} />
      </main>
      <footer className="site-container footer" lang={locale}>
        <a href="#top" className="footer-brand">
          Luis Iturrios<span>.</span>
        </a>
        <p>{t('footer')}</p>
        <a href="#top">
          {t('backTop')} <span aria-hidden="true">↑</span>
        </a>
      </footer>
      <noscript>
        <nav className="site-container no-script-languages" aria-label={t('language')}>
          {locales.map((language) => (
            <a
              key={language}
              lang={language}
              hrefLang={language}
              href={`${import.meta.env.BASE_URL}${language}/`}
            >
              {languageNames[language]}
            </a>
          ))}
        </nav>
      </noscript>
    </>
  );
}
