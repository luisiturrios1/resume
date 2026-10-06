import { useEffect, useState } from 'react';
import type { Translate } from '../i18n';
import { languageNames, locales, type Locale } from '../utils/preferences';
import type { Theme } from '../hooks/usePreferences';
import { profile } from '../data/profile';
import { Icon } from './Icon';
import { ResumeLink } from './ResumeLink';
export function Header({
  locale,
  theme,
  t,
  changeLocale,
  changeTheme,
}: {
  locale: Locale;
  theme: Theme;
  t: Translate;
  changeLocale: (locale: Locale) => void;
  changeTheme: (theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 24);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className={`header ${compact ? 'compact' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="wordmark">
          <span className="brand-mark" aria-hidden="true">
            li<span>.</span>
          </span>
          <span>
            Luis Iturrios<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          className={`navigation ${open ? 'is-open' : ''}`}
          id="navigation"
          aria-label={t('menu')}
        >
          {(['experience', 'projects', 'openSource', 'about', 'contact'] as const).map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setOpen(false)}>
              {t(key)}
            </a>
          ))}
          <div className="mobile-social">
            <a href={profile.github}>
              GitHub <Icon name="external" size={13} />
            </a>
            <a href={profile.linkedin}>
              LinkedIn <Icon name="external" size={13} />
            </a>
            <ResumeLink locale={locale} t={t} className="text-link" />
          </div>
        </nav>
        <div className="header-tools">
          <div className="language-control">
            <Icon name="globe" size={15} />
            <label className="sr-only" htmlFor="language">
              {t('language')}
            </label>
            <select
              id="language"
              value={locale}
              onChange={(event) => changeLocale(event.target.value as Locale)}
            >
              {locales.map((lang) => (
                <option key={lang} value={lang} lang={lang}>
                  {languageNames[lang]}
                </option>
              ))}
            </select>
          </div>
          <button
            className="icon-button theme-control"
            onClick={() =>
              changeTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')
            }
            aria-label={`${t('theme')}: ${t(theme)}`}
            title={`${t('theme')}: ${t(theme)}`}
          >
            <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
          </button>
          <a className="icon-button header-social" href={profile.github} aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a className="icon-button header-social" href={profile.linkedin} aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <div className="header-resume">
            <ResumeLink locale={locale} t={t} className="button small" />
          </div>
          <button
            className="icon-button mobile-toggle"
            aria-label={t('menu')}
            aria-controls="navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
