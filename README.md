# Luis Iturrios · Engineering portfolio

A restrained, multilingual portfolio for software engineering, platform engineering, and technical leadership. React, TypeScript, Vite, and Tailwind CSS. Static HTML for every language; no backend, runtime API calls, routing dependency, or tracking.

## Development

Use Node **22.18 or newer** (Node 22 LTS is used in CI).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The first visit uses a saved language or the first supported browser language, otherwise English. An explicit language URL always takes precedence. English is the default static page and translation fallback.

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm run check:pages
npm run preview
```

`npm run build` discovers available résumé PDFs, checks TypeScript, builds the client, builds a temporary server-rendering entry, and writes static HTML for eight language directories. The `.ssr` directory is a local build intermediate: **only `dist` is deployed**. Server rendering happens during the build; there is no server in production.

Optional browser checks:

```sh
npx playwright install chromium
npm run test:e2e
```

These verify all eight languages at mobile width, URL/SEO updates, persisted preferences, navigation, case studies, downloads, and wider layouts. Unit tests cover language precedence/detection, translation fallback, complete dictionaries, and résumé selection.

## GitHub Pages deployment

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. Push to `main` or `master`, or run the **Deploy portfolio to GitHub Pages** workflow manually. No local build or deployment commands are required.

The workflow installs locked dependencies, runs ESLint, strict TypeScript checking, and unit tests, builds, uploads `dist`, and deploys through GitHub’s official Pages actions. It reads the base path and public URL from `configure-pages`, supporting project repositories, user sites, and configured custom domains. No GitHub token is embedded in the client. Do not configure a second branch-based Pages deployment alongside this workflow.

Expected project URL: `https://luisiturrios1.github.io/resume/`.

To reproduce a project-site build locally:

```sh
BASE_PATH=/resume/ VITE_SITE_URL=https://luisiturrios1.github.io/resume/ npm run build
BASE_PATH=/resume/ npm run preview
# Open http://localhost:4173/resume/en/
```

Use `VITE_SITE_URL` with the actual absolute public URL if deploying elsewhere. The default is the URL above; `BASE_PATH` defaults to `/` for local development.

### Clean language URLs without SPA routing

The build produces `en/index.html`, `es/index.html`, `de/index.html`, `fr/index.html`, `nl/index.html`, `it/index.html`, `ja/index.html`, and `zh-CN/index.html`. GitHub Pages serves `/resume/en/`, etc., directly. Both bookmarks and refreshes work, and `/en` receives the host’s normal directory-slash redirect. Navigation within the portfolio uses section anchors; the language selector updates browser history and content without reloading. Back/forward restores the URL’s language.

No hash-routing or redirect-to-index 404 workaround is needed. Unknown pages receive a real `404.html`. The root is pre-rendered English; browser preference detection applies there once JavaScript loads. With JavaScript disabled, the English root and every localized page remain readable, and case studies and résumé downloads still work.

Every language has pre-rendered title/description, OpenGraph, canonical, hreflang (including English `x-default`), and Person JSON-LD. The build also writes `sitemap.xml`, `robots.txt`, and `.nojekyll`.

## Content and translations

```text
src/
  components/       Shared header, icons, résumé link, section heading
  sections/         Hero, projects, experience, open source, about, contact
  data/             Typed professional content, project records, repository snapshot
  i18n/<language>/  common.json: complete UI and content dictionaries
  hooks/            Language and system/manual theme preferences
  utils/            Preference resolution, translation fallback, résumé URLs, SEO
scripts/            PDF discovery, GitHub snapshot refresh, static pre-rendering
public/             Résumé PDF, optimized project images, favicon
```

`src/data/types.ts` defines `Experience`, `Project`, `OpenSourceProject`, `Education`, and `SkillCategory`. Components use these records and translation keys instead of embedding professional copy in JSX. Technology, employer, product, and institution names remain proper nouns. Native-script fonts are available through system font stacks for Japanese and Simplified Chinese; no remote fonts are downloaded.

The site’s source notes and content limitations are documented in [CONTENT.md](CONTENT.md).

### Add a language

1. Add its code and native name in `src/utils/preferences.ts`.
2. Copy `src/i18n/en/common.json` into `src/i18n/<code>/common.json` and translate all values. Preserve keys and factual meaning.
3. Import the dictionary and register it in `src/i18n/index.ts`. Missing or empty strings fall back to English.
4. Add its OpenGraph locale in `src/utils/seo.ts` and its code to `scripts/prepare-content.mjs`. Include the language in browser tests.
5. Run unit tests, build, and check the new route on mobile and desktop. The pre-renderer and hreflang list use the central locale list automatically.

Language preference is persisted in local storage. An explicit URL beats persisted preference; unsupported regional variants fall back to supported base languages. Only Simplified Chinese (`zh-CN` / `zh-Hans`) is mapped to Chinese automatically; Traditional Chinese is not silently relabeled. Theme follows the operating system initially and can cycle through system, light, and dark using the header control. Preference storage failure does not prevent the site from working.

### Update résumé PDFs

Place approved PDFs at:

```text
public/resume/luis-iturrios-resume-en.pdf
public/resume/luis-iturrios-resume-es.pdf
```

English is included, copied unchanged from the supplied English résumé. **No Spanish PDF was supplied and none was generated.** Spanish and all other languages currently download English. Add `luis-iturrios-resume-<language>.pdf` for any supported language; the next build discovers it and records it in `src/data/resumes.json`. If a localized PDF does not exist, the download falls back to English. If no PDFs exist, the component displays a translated pending state instead of a broken link.

After adding a PDF, run `npm run prepare:content` for immediate development updates, or simply build. Keep the file itself under `public/`; `/public` is never part of the browser URL. The large original PDF is downloaded only on request, not loaded with the page.

### Add professional experience

Add a typed record to `experiences` in `src/data/profile.ts`, with a stable ID, employer, source-supported year, role/description translation keys, and supported technologies. Add each new text key to every dictionary. Do not infer end dates or assign global résumé skills to an employer without evidence. The timeline renders records in the specified order; newest first.

Education and technology categories are in the same file. The technical profile also includes technologies verified in Desierto de Altar GPS; these do not change employer-specific experience lists. The current résumé provides start years only, so the timeline deliberately shows start years rather than invented date ranges. The managerial role is listed from 2024 without an inferred end date. Aloi is the newest role, with November 2025–present and current employment explicitly confirmed by the owner.

### Add a project or case study

Add a typed project record in `src/data/profile.ts`, the corresponding text in dictionaries, and optimized assets in `public/images/`. A product’s case-study sections live as heading/body translation keys on its record in `src/data/profile.ts`; the preview renders them automatically. Populate them with source-backed or owner-approved content rather than unsupported estimates. Extend the section with a reusable project template when adding another product. Use actual screenshots, retain attribution, and set dimensions and responsive sizes.

For open-source repositories, add an `OpenSourceProject` record to `src/data/open-source.json`; the Open Source section renders all records automatically. Add the description translation key in every language. Fields unavailable from GitHub should be `null`, not estimated.

### Refresh GitHub information

```sh
npm run update:github
```

This uses unauthenticated GitHub public API requests at maintenance time, saves real stars, latest release, language, license, and timestamp, and preserves existing data if a request fails. Review and commit the updated JSON to publish it. The UI labels the date as a **snapshot**, formatted for the selected language in the owner’s Mexico City timezone. No API request happens in a visitor’s browser or is required for builds/deployments, avoiding runtime rate-limit failures.

Repository README/package metadata is the source for python-cfdiclient’s description. Snapshot metadata comes from GitHub, which may differ from an older local package checkout.

## Accessibility and performance

Semantic sections and headings, skip link, native keyboard-accessible language selection, disclosure controls, Escape-to-close mobile navigation, visible focus styles, system/manual theme support, and reduced-motion support. Content stays usable without JavaScript. There are no entrance animations, skill bars, carousels, analytics, remote fonts, backend services, or animation libraries.

Project images use WebP, fixed intrinsic dimensions, responsive screenshot variants, and lazy loading. The first screen uses typography and a small CSS/SVG systems illustration. Translation handling is a small typed dictionary lookup. Main container widths are capped for ultrawide displays; layouts stack on mobile.

## Remaining content work

- Revisit the GPS case study when full store-build group validation and extended device checks are completed. The current source-backed study states these pending validations; see [source notes](docs/desierto-case-study-sources.md).
- Supply the Spanish résumé PDF if desired.
- Confirm any professional-history updates newer than the supplied résumé, and add end dates only if verified.
- Have a native speaker review translated professional terminology before wider publication.
