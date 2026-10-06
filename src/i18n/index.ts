import en from './en/common.json';
import es from './es/common.json';
import de from './de/common.json';
import fr from './fr/common.json';
import nl from './nl/common.json';
import it from './it/common.json';
import ja from './ja/common.json';
import zh from './zh-CN/common.json';
import { translation, type Locale } from '../utils/preferences';
export type TranslationKey = keyof typeof en;
export const dictionaries: Record<Locale, Partial<Record<TranslationKey, string>>> = {
  en,
  es,
  de,
  fr,
  nl,
  it,
  ja,
  'zh-CN': zh,
};
export function translator(locale: Locale) {
  return (key: TranslationKey) => translation(dictionaries[locale], en, key);
}
export type Translate = ReturnType<typeof translator>;
