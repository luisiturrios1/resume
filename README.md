# Luis Iturrios — The engineer behind the systems

An Engineering Editorial portfolio: software architecture, infrastructure, developer platforms, open-source tools, and real commercial products. React 19 + TypeScript + Vite, with static pre-rendering for GitHub Pages. No production server, runtime API dependency, tracking, or external font request.

## Site narrative

1. **Introduction:** “I build across the stack.”
2. **Selected work:** Desierto de Altar GPS, real app captures, 3,000 owner-reported MAU, actual store links, product ownership, and engineering decisions. Rifas México is a compact additional historical product.
3. **Engineering impact:** Kueski's EC2/Jenkins → EKS/GitHub transformation, architectural ownership, developer autonomy, and a seven-part case study. AWS DMS is secondary.
4. **Open source:** python-cfdiclient's SAT integration workflow, real library entry points, PyPI installation, maintenance practices, and a dated repository snapshot.
5. **Experience:** updated chronology, grouped Kueski progression, and earlier work.
6. **About:** engineering approach, education, and verified credentials.
7. **Résumé:** the original English PDF plus complete translations in the seven other languages; downloads follow the selected language.
8. **Contact:** email, GitHub, and LinkedIn.

## Development and review

Node **22.18+** is required; CI uses Node 22.

```sh
npm ci
npm run dev
```

For a production preview matching the GitHub Pages project path:

```sh
BASE_PATH=/resume/ VITE_SITE_URL=https://luisiturrios1.github.io/resume/ npm run build
BASE_PATH=/resume/ npm run check:pages
BASE_PATH=/resume/ npm run preview -- --host 127.0.0.1
# http://127.0.0.1:4173/resume/en/
```

For a root-path preview, omit `BASE_PATH` for both build and preview. The preview base must match the build base.

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
# Run after a production build; use the corresponding base URL:
BASE_PATH=/resume/ PLAYWRIGHT_BASE_URL=http://127.0.0.1:4173/resume/ npm run test:e2e
```

Install Chromium once with `npx playwright install chromium` if it is unavailable. Browser tests cover static language pages, responsive layouts, theme/language persistence, keyboard controls, no-JavaScript content, direct refreshes, internal navigation, PDF downloads, and axe WCAG AA scans for all eight languages in both themes. Automated accessibility results supplement visual and keyboard review; they do not establish full human conformance.

## Architecture and interactions

The existing stack was retained to preserve working deployment and localization. Vite builds the client and a temporary React SSR entry; `scripts/prerender.mjs` generates complete HTML for every route. Only `dist/` is deployed, never `.ssr/`.

- `src/data/profile.ts`: typed professional history, product details, and education.
- `src/data/narrative.ts`: product links/adoption, screenshot chapters, Kueski case structure, and SAT workflow.
- `src/i18n/`: complete copy for all eight languages, using English as the reference. Type checking requires every dictionary to implement the full English key schema.
- `src/sections/`: dedicated narrative sections, including `Engineering` and `Resume`.
- `src/index.css`: dark/light tokens, responsive editorial grids, focus states, and reduced-motion behavior.
- `public/images/product/`: actual Spanish app screenshots; no invented interfaces.

A lightweight IntersectionObserver updates the sticky desktop phone as visitors scroll through product chapters. Native buttons also select screens. Mobile uses inline captures with no sticky animation. The Kueski comparison offers keyboard-accessible before/after focus and explanation while retaining both diagrams in the document. Native `details` exposes the full case studies without JavaScript. Supported browsers progressively animate heading reveals with CSS view timelines; reduced motion disables these effects. Native scrolling is preserved. No GSAP, animation bundle, or WebGL dependency is needed.

Dark is the initial theme. The color button switches directly between light and dark on every click and retains the selection. Previously saved system preferences are respected until the visitor chooses an explicit theme; the button icon and label reflect the next visible theme. An explicit language URL takes precedence over saved/browser preferences. No-JavaScript visitors receive real HTML, working disclosures/downloads, and links to all eight languages.

## SEO and static routes

The build produces `en/`, `es/`, `de/`, `fr/`, `nl/`, `it/`, `ja/`, and `zh-CN/`, plus an English root and a true `404.html`. Each route has canonical/hreflang links, title/description, Open Graph/Twitter metadata, a real product social image, and Person JSON-LD. The build writes sitemap, robots, and `.nojekyll`. Direct navigation and refresh work under `/resume/`; no SPA fallback rewrite is required.

## Deployment

**This redesign is local-only and has not been pushed or deployed.** To publish after review, keep repository **Settings → Pages → Build and deployment → GitHub Actions** selected, then push approved changes to `main`/`master` or manually run **Deploy portfolio to GitHub Pages**.

The existing workflow runs locked installation, lint, type checking, unit tests, the production build, and static-route verification; it uploads `dist` through the official Pages actions. It reads the base path/public URL from `configure-pages`, supporting project sites and custom domains. Browser tests are available locally and are not claimed as part of the deployment job.

## Maintaining content

See [CONTENT.md](CONTENT.md) for source priority, metric scope, factual conflicts, asset provenance, and retained owner-confirmed facts. See [docs/redesign.md](docs/redesign.md) for decisions and validation. Earlier notes remain in [docs/content-history.md](docs/content-history.md).

The approved original remains at `public/resume/luis-iturrios-resume-en.pdf` unchanged. Seven complete translations live alongside it as `luis-iturrios-resume-<locale>.pdf`. Every download link uses the selected locale and an explicit matching filename. `prepare:content` discovers the files at build time; English remains the defensive fallback if an asset is ever removed.

PDF content is maintained in `scripts/resume-content/`: English is the canonical transcription; all seven translations have the same section schema. The renderer uses localized role labels from the website dictionaries. Official certification titles, institutional names, and technology names retain their proper spelling. The translations preserve the original six employers, five Kueski role periods, 3,000 MAU, certifications, education, and contact links.

To regenerate translations, install `reportlab` and `pypdf` in your Python environment, then run:

```sh
python3 scripts/generate-resumes.py
python3 scripts/verify-resumes.py
npm run prepare:content
```

On macOS the renderer uses Arial, Arial Bold, and Arial Unicode from the system font directory. On other platforms, supply a directory containing these fonts with `--font-dir`. It embeds and checks every glyph, writes two-page PDFs to `output/pdf/`, and copies them into `public/resume/`. The English PDF is never regenerated. Rendering is a maintenance operation; deployment does not require Python or these fonts. After changing copy, render and visually review every affected page before publishing.

Update typed records and English reference copy, then update all seven translations and affected PDFs together. Avoid inferring employment dates, product metrics, private infrastructure, or CI success. The legacy `app-metrics.json` remains historical evidence and is not displayed as current analytics. `npm run update:github` refreshes the cached public snapshot at maintenance time; no visitor-side API call is required.

## Current limitations

- The product case study retains documented group/device validation caveats. This portfolio task did not rebuild or validate the mobile app.
- The diagrams intentionally describe conceptual workflows.
- The social image is a real product landscape asset, not a new fabricated product screenshot.
