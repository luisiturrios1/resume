export const locales = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  nl: 'Nederlands',
  it: 'Italiano',
  ja: '日本語',
  'zh-CN': '简体中文',
};
export const isLocale = (value: string | null | undefined): value is Locale =>
  locales.some((locale) => locale === value);
export function detectLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const lower = language.toLowerCase();
    if (lower === 'zh' || lower === 'zh-cn' || lower.startsWith('zh-hans')) return 'zh-CN';
    const base = lower.split('-')[0];
    if (isLocale(base)) return base;
  }
  return 'en';
}
export function pathLocale(pathname: string, base = '/'): Locale | null {
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const segment = relative.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : null;
}
export function resolveLocale(
  pathname: string,
  saved: string | null,
  languages: readonly string[],
  base = '/',
): Locale {
  return pathLocale(pathname, base) ?? (isLocale(saved) ? saved : detectLocale(languages));
}
export function resumeUrl(
  locale: Locale,
  files: Partial<Record<Locale, string>>,
  base = '/',
): string | null {
  const file = files[locale] ?? files.en;
  return file ? `${base.endsWith('/') ? base : `${base}/`}${file}` : null;
}
export function translation(
  dictionary: Partial<Record<string, string>>,
  fallback: Record<string, string>,
  key: string,
): string {
  return dictionary[key] || fallback[key] || key;
}
export function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private browsing may disallow persistence. */
  }
}
