import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  locales,
  detectLocale,
  resolveLocale,
  resumeUrl,
  translation,
  pathLocale,
} from '../src/utils/preferences.ts';
test('explicit URL wins over saved and browser languages, including repository base', () => {
  assert.equal(resolveLocale('/resume/de/', 'es', ['fr'], '/resume/'), 'de');
  assert.equal(pathLocale('/resume/zh-CN/', '/resume/'), 'zh-CN');
});
test('first visit prefers saved selection then supported browser language, otherwise English', () => {
  assert.equal(resolveLocale('/', 'it', ['ja']), 'it');
  assert.equal(resolveLocale('/', 'invalid', ['pt', 'es-MX']), 'es');
  assert.equal(detectLocale(['zh-Hans-CN']), 'zh-CN');
  assert.equal(detectLocale(['fr-CA']), 'fr');
  assert.equal(detectLocale(['pt-BR']), 'en');
  assert.equal(detectLocale(['zh-TW']), 'en');
});
test('translation fallback handles missing and empty values', () => {
  assert.equal(translation({}, { hello: 'Hello' }, 'hello'), 'Hello');
  assert.equal(translation({ hello: '' }, { hello: 'Hello' }, 'hello'), 'Hello');
  assert.equal(translation({}, {}, 'missing'), 'missing');
});
test('localized résumé preferred; English is fallback; no broken link without PDFs', () => {
  const files = { en: 'resume/en.pdf', es: 'resume/es.pdf' };
  assert.equal(resumeUrl('es', files, '/resume/'), '/resume/resume/es.pdf');
  assert.equal(resumeUrl('ja', files, '/resume/'), '/resume/resume/en.pdf');
  assert.equal(resumeUrl('en', {}, '/'), null);
});
test('all supported language files have complete, nonempty translation schemas', () => {
  const english = JSON.parse(readFileSync('src/i18n/en/common.json'));
  for (const locale of locales) {
    const dictionary = JSON.parse(readFileSync(`src/i18n/${locale}/common.json`));
    assert.deepEqual(Object.keys(dictionary).sort(), Object.keys(english).sort());
    assert.ok(
      Object.values(dictionary).every((value) => typeof value === 'string' && value.trim()),
    );
  }
});

test('all eight locales have distinct, valid PDF assets and complete résumé copy', () => {
  const manifest = JSON.parse(readFileSync('src/data/resumes.json'));
  assert.deepEqual(Object.keys(manifest).sort(), [...locales].sort());
  const english = JSON.parse(readFileSync('scripts/resume-content/en.json'));
  for (const locale of locales) {
    assert.equal(manifest[locale], `resume/luis-iturrios-resume-${locale}.pdf`);
    assert.equal(readFileSync(`public/${manifest[locale]}`).subarray(0, 5).toString(), '%PDF-');
    const content = JSON.parse(readFileSync(`scripts/resume-content/${locale}.json`));
    assert.deepEqual(Object.keys(content).sort(), Object.keys(english).sort());
    assert.ok(Object.values(content).every((value) => typeof value === 'string' && value.trim()));
  }
});
test('long explanatory copy is translated from the English reference in every other locale', () => {
  const english = JSON.parse(readFileSync('src/i18n/en/common.json'));
  for (const locale of locales.filter((locale) => locale !== 'en')) {
    const dictionary = JSON.parse(readFileSync(`src/i18n/${locale}/common.json`));
    for (const [key, value] of Object.entries(english)) {
      if (value.length > 70)
        assert.notEqual(dictionary[key], value, `${locale}: untranslated ${key}`);
    }
    assert.ok(!('localizationNotice' in dictionary));
  }
});
