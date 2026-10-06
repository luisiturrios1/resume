import { existsSync, writeFileSync } from 'node:fs';
const languages = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN'];
const manifest = {};
for (const language of languages) {
  const file = `resume/luis-iturrios-resume-${language}.pdf`;
  if (existsSync(`public/${file}`)) manifest[language] = file;
}
writeFileSync('src/data/resumes.json', JSON.stringify(manifest, null, 2) + '\n');
