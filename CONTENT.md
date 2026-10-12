# Content provenance — October 12, 2026

## Source priority

1. The owner's redesign brief: the Kueski architectural ownership and self-service transformation; multidisciplinary positioning; confirmation of 3,000 MAU and store sales.
2. `/Users/luisiturrios/Repos/linkedin/output/pdf/Luis_Iturrios_Resume_Clara_Staff_DevOps.pdf`: primary professional history, dates, education, certifications, product adoption, and contact. `public/resume/luis-iturrios-resume-en.pdf` is a byte-for-byte copy.
3. The six files in `/Users/luisiturrios/Repos/linkedin`: the editable résumé, profile extraction, own LinkedIn activity, interests, and preparation notes. Interests were reviewed as context; private profile metrics, unrelated personal posts, and third-party recommendations are not published.
4. Public python-cfdiclient README and PyPI metadata; local package and workflow files. Product documentation and real assets in the sibling Desierto de Altar repository.
5. Existing owner-confirmed website content, including uncommitted material present at the start. Historical notes are preserved in [content-history.md](docs/content-history.md).

The public LinkedIn page could not be retrieved (HTTP 999), so the owner's dated local extraction supplies chronology. The existing portfolio, GitHub profile/repository, and PyPI page were inspected. The GitHub profile's older DevOps headline does not override the updated résumé or the owner’s brief. The product's public website was unavailable to the web reader; its local source and store URLs were available.

## Kueski

The brief explicitly confirms that Luis designed the target architecture and led implementation, moving from EC2/Jenkins toward EKS/GitHub workflows and developer self-service. It also confirms business expansion, including Amazon partnerships. The seven-part story preserves these facts. Existing owner-confirmed Staff Engineering content separately supports API definition, idempotency, and coordination for Amazon merchant integration.

The diagram shows a **conceptual workflow**, not internal infrastructure. It contains no inferred topology, confidential service names, team sizes, rollout dates, performance improvements, deployment frequencies, or revenue. AWS DMS appears as a secondary achievement, supported by the résumé and the owner's LinkedIn post. The former 50→350 RPS visual was removed from the page.

The five Kueski role periods and Aloi's November 2025–present period follow the updated PDF. Earlier roles follow that source; OOMAPASSLRC remains as additional owner-confirmed historical experience. Responsibilities retained from prior owner interviews are not presented as text extracted from the new PDF.

## Desierto de Altar GPS

The updated PDF and brief agree on **3,000 monthly active users** and real sales in both stores. The displayed figure is labelled owner-reported, dated to the October 2026 résumé; it is not a live analytics reading. Historical 1.2K analytics/store rating snapshots remain in `src/data/app-metrics.json` for provenance but are not used as current product metrics. Older preparation notes mentioning “3 users” are superseded by the updated PDF and explicit brief.

Feature statements: offline maps, GPS route recording, POIs, GPX/KML import, GPX export, temporary sharing groups, and free/lifetime Pro tiers. Live sharing requires connectivity. The existing source review's extended device/store-build group-validation caveat is retained; no public release of CarPlay/Android Auto is claimed.

Implementation details are grounded in the existing [source review](docs/desierto-case-study-sources.md) and sibling documentation. Flutter/Dart, Mapbox, Drift/SQLite, Firebase, RevenueCat, native bridges, and testing practices are supported by actual project files. Owner-confirmed AI/spec-driven development, store review, and lifecycle ownership are retained. Source presence does not establish a fresh native build or current passing mobile tests; this task tests the portfolio only.

### Assets

Copied from `/Users/luisiturrios/Repos/desierto_de_altar/firebase/hosting/src/assets/`:

- `screens/{map,downloads,route,poi}-medium.webp` → `public/images/product/`: real Spanish app captures, displayed without fabricated overlays or recreated UI. Each capture is 604×1313.
- `social.jpg` → `public/images/social.jpg`: real product landscape asset, 1200×630, used for social metadata.
- Existing `public/images/desert.webp` is the same product's desert landscape.

Product links come directly from the updated résumé:

- [Website](https://desierto-de-altar-gps.web.app)
- [App Store](https://apps.apple.com/app/id6788148149)
- [Google Play](https://play.google.com/store/apps/details?id=com.iturriosdev.desiertodealtar)

Rifas México is retained as an owner-confirmed prior product built, operated, and sold. The link points to its current publisher. No present-day adoption, ratings, sale amount, or profitable exit is attributed to Luis.

## python-cfdiclient

[Repository](https://github.com/luisiturrios1/python-cfdiclient) and [PyPI](https://pypi.org/project/cfdiclient/) support e.firma/FIEL authentication, bulk CFDI/metadata requests, asynchronous request verification, ZIP package downloads, and invoice status checks. The installed distribution is `cfdiclient`, not `python-cfdiclient`. GPL-3.0-only comes from `pyproject.toml`.

The package/workflow sources support multi-version/cross-platform testing, automated releases, semantic versioning, CodeQL, and dependency review. Their existence is described; current CI success is not inferred. The website uses the existing timestamped repository snapshot (139 stars), without runtime GitHub requests. The code preview lists real public entry points; it links to the README for the complete authenticated flow and does not imply that the import block downloads invoices by itself.

## Education and credentials

The primary PDF names Universidad Tecnológica Metropolitana de San Luis Potosí, 2012–2016. That name takes precedence over the different institution in an older résumé and LinkedIn header; the discrepancy is documented rather than silently treated as a second degree.

AWS Solutions Architect **Associate**: June 2024–June 2027, with the supplied public Credly credential. The new PDF does not provide dates for SCRUM or HCI certificates; the website no longer displays inferred 2015/2013 dates.

## Localization

At the owner’s request, English is the reference for all eight complete experiences: English, Spanish, German, French, Dutch, Italian, Japanese, and Simplified Chinese. The editorial fallback was removed. Stories, navigation, accessibility labels, dates/numbers, résumé descriptions, and social metadata follow the selected language. Product captures retain the real Spanish interface and are labelled accordingly.

The original English PDF remains byte-for-byte unchanged. Seven two-page translated PDFs were created from its editable English source, without adding website-only experience or altering facts. `scripts/resume-content/en.json` records that canonical text; each translated file implements the same schema. The renderer embeds Latin/CJK fonts and sets the PDF language. Official qualification names and institutions remain proper names. Download links, filenames, and the build manifest select the corresponding language even without JavaScript. `scripts/verify-resumes.py` checks full translated content, employment and certification date ranges, source links, and the original English checksum.
