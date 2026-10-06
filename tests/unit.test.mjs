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
