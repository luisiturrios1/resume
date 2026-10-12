# Portfolio redesign delivery — October 12, 2026

## Audit and implementation plan

The repository already provided React/TypeScript/Vite, eight language dictionaries, build-time SSR, résumé discovery, a cached GitHub snapshot, and a Pages Actions workflow. It had uncommitted owner-confirmed content updates when work began. These facts were carried forward; the original content notes are archived unchanged in `content-history.md`.

The implementation sequence was: audit the portfolio and updated résumé; establish source priority; define typed narrative records and English/Spanish copy; replace layout/components; add screenshot scrollytelling and a conceptual platform comparison; validate production routes, interaction behavior, accessibility, and layout; document delivery. No repository was pushed and no deployment was triggered.

## Decisions

- Retain React, TypeScript, Vite and static pre-rendering. A framework migration would add deployment risk without improving this section-based presentation.
- Use CSS and IntersectionObserver for motion. The diagram does not need a visualization runtime, and the product story does not need a large animation library.
- Use system sans-serif and monospace fonts to eliminate remote font requests and loading shifts.
- Separate the Kueski architecture story from the résumé timeline. Highlight architectural ownership and self-service, not only technology adoption or the DMS migration.
- Use four real product screenshots from the sibling product's web assets, with full-size proportions and intrinsic dimensions. Show static captures on mobile.
- Keep meaningful commercial/adoption evidence without combining historical analytics snapshots or making up financial metrics.
- Keep case studies inline and expandable with native disclosure controls, making them readable in static HTML and usable without JavaScript.
- Maintain complete translations in all eight languages, using English as the reference, including stories, SEO, and accessibility labels.
- Preserve the exact updated English résumé bytes and provide seven complete translated PDFs with locale-specific downloads. Education follows that document despite an older conflicting institution name; unspecified certification dates are omitted.

## Validation

Executed against the production build with `/resume/` as the base path:

- ESLint and strict TypeScript checks.
- Seven unit tests covering locale precedence, translation fallback/schema, untranslated explanatory copy, PDF assets, résumé content completeness, and résumé URL behavior.
- Forty Playwright browser tests, including eight locale routes, actual downloaded bytes and filenames, language/theme persistence, switching through all eight languages, direct anchor refresh, internal link targets, all eight static pages without JavaScript, keyboard diagram controls, and screenshot selection.
- Thirty-two axe scans across eight languages × dark/light × mobile/desktop, with no WCAG 2 A/AA or 2.1 AA violations detected.
- Static route/metadata/sitemap/asset verification for all eight language directories under `/resume/`.
- Visual review of the desktop hero/product composition and the Spanish mobile layout in the in-app browser. Responsive overflow checks cover 320, 390, 768, 1024, and 1440 pixels for all eight routes, and desktop layouts up to 2560 pixels.
- Formatting and `git diff --check` passed. The downloadable résumé SHA-256 exactly matches the supplied updated PDF.
- Production assets: approximately 132 KB gzipped JavaScript and 8.7 KB gzipped CSS, with no remote font or animation runtime. Product imagery is lazy-loaded below the introduction.

The localization follow-up identified a long German heading overflowing at 320 pixels. Section headings now constrain their width and permit language-aware hyphenation and emergency wrapping. Native disclosures are tested via keyboard to avoid automation instability during smooth scrolling.

The seven translated PDFs were rendered and all fourteen pages visually inspected. Text checks verify every translated paragraph, all role/date ranges, proper source links, and the unchanged English checksum. CJK glyph coverage and PDF language metadata are checked. Each browser download is compared byte-for-byte to its language asset. Complete copy and matching PDFs are available with JavaScript disabled.

The theme-button follow-up reproduced an unchanged dark page after the first click: the old cycle moved from dark to system, which was also dark. The button now toggles the resolved visible theme directly between light and dark, with a target-theme icon and accessible label. Older saved system preferences continue following the operating system until the user explicitly toggles. Nine regression cases check each saved preference against both OS schemes, actual background-color change after one click, reload persistence, keyboard activation, and OS changes while system mode is active. All forty browser tests passed after this correction.

Accessibility automation is not a substitute for an assistive-technology user audit. Browser checks primarily use Chromium; Safari/Firefox checks are recorded separately if run. Product/store/backend correctness is outside this portfolio validation.

## Review and publish

Use the production preview commands in the root README. The existing GitHub Pages workflow remains the publish path after owner review; only `dist/` is uploaded. There is no new hosting service, production environment, credential, or runtime API dependency.
