import { useEffect, useState } from 'react';
import {
  pathLocale,
  readPreference,
  resolveLocale,
  savePreference,
  type Locale,
} from '../utils/preferences';
export type Theme = 'system' | 'light' | 'dark';
export function usePreferences(initialLocale: Locale) {
  const [locale, setLocale] = useState(initialLocale);
  const [theme, setTheme] = useState<Theme>('system');
  useEffect(() => {
    const selected = resolveLocale(
      location.pathname,
      readPreference('portfolio-language'),
      navigator.languages,
      import.meta.env.BASE_URL,
    );
    setLocale(selected);
    savePreference('portfolio-language', selected);
    if (!pathLocale(location.pathname, import.meta.env.BASE_URL))
      history.replaceState(null, '', `${import.meta.env.BASE_URL}${selected}/${location.hash}`);
    const savedTheme = readPreference('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    const popstate = () => {
      setLocale(pathLocale(location.pathname, import.meta.env.BASE_URL) ?? 'en');
    };
    window.addEventListener('popstate', popstate);
    return () => window.removeEventListener('popstate', popstate);
  }, []);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);
  const changeLocale = (next: Locale) => {
    setLocale(next);
    savePreference('portfolio-language', next);
    history.pushState(null, '', `${import.meta.env.BASE_URL}${next}/${location.hash}`);
  };
  const changeTheme = (next: Theme) => {
    setTheme(next);
    savePreference('portfolio-theme', next);
  };
  return { locale, theme, changeLocale, changeTheme };
}
