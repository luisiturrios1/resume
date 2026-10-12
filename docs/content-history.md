# Content provenance

## Professional history

Source: **Resume Luis J Iturrios-2.pdf**, supplied from the owner’s Downloads directory. The English downloadable PDF is an unchanged copy. The source is one page and was read as text and visually reviewed.

- Kueski: DevOps Engineering Manager (2024); DevOps Tech Lead (2021).
- KIO Networks: Product Developer (2019).
- SAT: Inter-institutional coordination manager (2018).
- OOMAPASSLRC: Software Developer, water resource planning (2017).
- SAIT: Software Developer, invoice-signing service migration PHP → Go and CFDI product development (2014).
- Education: ICT engineering, Universidad Tecnológica de San Luis Río Colorado (2016); SCRUM Master certification, International Scrum Institute (2015); SDP07 HCI & Communication, Carnegie Mellon University (2013).
- Email: luisiturrios1@gmail.com. Location: San Luis Río Colorado, Mexico.

The Kueski scaling evidence is supported both by the résumé and the owner’s prompt: approximately 50 → 350 requests per second after work on Kubernetes/EKS scalability. The two comparison bars correspond to these two endpoints only; there are no invented intermediate measurements or time series.

The source prints role start years, not end dates. No tenure ranges, years-of-experience total, or claim about current employment has been extrapolated. Role-specific technology lists follow the résumé’s right-hand experience column. Global skill lists are separate. TypeScript appears in the hero because it was explicitly requested by the owner; it is not attributed to an employer or added to the résumé-derived technical profile.

## python-cfdiclient

Sources:

- Local sibling repository `../python-cfdiclient/README.md` and `pyproject.toml`.
- [Public repository README](https://github.com/luisiturrios1/python-cfdiclient#readme).
- [GitHub repository API](https://api.github.com/repos/luisiturrios1/python-cfdiclient).
- [Latest GitHub release API](https://api.github.com/repos/luisiturrios1/python-cfdiclient/releases/latest).

The conservative description follows the documented SAT authentication, bulk download requests, request verification, and package retrieval workflow. Maintainer status was explicitly provided by the owner. Stars, latest release, language, and license are recorded with a fetch timestamp, not hardcoded estimates; see `src/data/open-source.json`. The displayed license is GitHub’s identifier. Package metadata identifies GPL-3.0-only.

## Desierto de Altar GPS

Product URL supplied by the owner: [Desierto de Altar GPS](https://desierto-de-altar-gps.web.app).

Additional verified material: local sibling repository `../desierto_de_altar/landing/index.html`, `landing/README.md`, and `landing/assets/captures.json`. These support maps, GPS routes, points of interest, and offline maps.

Images copied from the product’s own landing assets:

- `landing/assets/dunes.webp` → `public/images/desert.webp`.
- `landing/assets/screens/map-medium.webp` → `public/images/app-map.webp`.
- `landing/assets/screens/map-small.webp` → `public/images/app-map-small.webp`.

The source capture manifest identifies an actual iOS Simulator capture on September 30, 2026, not a reconstructed interface. The screenshot is displayed in full with original attribution retained. The desert photo is a product asset, not a generic stock replacement. Copies are optimized WebP variants already provided by the product repository.

The owner authorized a review of the product repository to complete the case study. Problem, solution, architecture, challenges, technology, engineering practices, and design takeaways now derive from inspected implementation and documentation. No audience counts, download counts, growth statistics, or measured engineering outcomes are invented. See [the source-to-content review](docs/desierto-case-study-sources.md) for exact files, interpretations, and pending validations.

## Additional owner-provided certification

AWS Certified Solutions Architect was explicitly supplied by the owner in chat. The official certification name is retained across all languages. The owner confirmed the award year as 2024. No level (Associate or Professional), expiration, or credential ID was provided; none is inferred. The original downloadable résumé PDF remains unchanged.

## Additional owner-provided experience

The owner supplied **Founding Software Engineer at Aloi, November 2025–present** and confirmed current employment. This is the newest timeline entry. No responsibilities, achievements, stack, employer website, or end dates for other roles were supplied or inferred. The LinkedIn URL provided is a private profile-edit URL, so it is not published as a public company or role link.

## Mobile hiring positioning and product metrics — October 5, 2026

The owner confirmed Flutter and Swift as the mobile positioning. Public copy intentionally omits job-search geography, relocation plans, visa requirements, and language proficiency claims. Existing employer titles and dates are preserved. The mobile positioning is applied across all eight languages; Swift evidence is explicitly native integration within a Flutter product, including `ios/Runner/RouteLiveActivityBridge.swift` and ActivityKit.

Verified through the signed-in browser and public store listings on October 5, 2026:

- Owner-provided link https://webhangar.net/app/3ut3CFEq resolves to the same two store listings recorded in `src/data/app-metrics.json`.
- App Store Mexico: 5.0/5, 61 ratings. These are ratings, not 61 written reviews.
- Google Play Mexico: header 5.0/5, 64 reviews, 500+ downloads. Phone-filtered ratings section shows 57 reviews; use the explicitly labelled store-header scope, not an aggregated or inferred total across platforms.
- GA4 property `desierto-de-altar-gps`, Firebase overview, All Users: user activity card shows 1.2K for its 30-day window ending October 4, 2026. Preserve the approximation and 30-day window, distinct from the overall report's September 7–October 4 range.
- Average engagement time per active user is 9m 51s for September 7–October 4, 2026. This is not average session duration.
- Store download threshold is Android-only, not total installs or active users. No cross-store rating average is calculated.

Metrics are dated snapshots, not live integrations. Analytics source requires owner access; public store links are provided on the site. No credentials or private analytics URLs are published. The original downloadable résumé remains unchanged and reflects the prior broader engineering positioning.

## Owner interview and LinkedIn chronology — October 6, 2026

This section supersedes earlier résumé-derived descriptions where they conflict. The downloadable PDF is intentionally unchanged at the owner's request. Only website content is updated; relocation, visa requirements, and job-search geography remain private. Public location is Mexico.

### Product ownership and development method

- Desierto de Altar GPS: owner personally originated and owns design, development, publication, promotion, maintenance, and production operation. Implementation was generated entirely with AI using spec-driven development, followed by manual validation and iterative correction. Copy does not claim manual authorship of the Swift or Flutter code.
- Owner confirmed project start June 17, 2026, and first store approval July 8, 2026: 21 elapsed days. This is first approval, not a claim that every current feature shipped within that period.
- Owner introduced Maestro after manual testing. Owner reports coverage of all current user flows, with tests added for new functionality. `.maestro/config.yaml` and `.maestro/flows/` in the sibling product repository confirm E2E infrastructure for onboarding, maps, events, personal data, downloads, and route video. No full product suite was executed in this portfolio task. No independently measured 100% coverage, code-coverage percentage, or live pass status is claimed.
- Owner handled background-location review in both stores with AI-assisted justification and confirmed approval and stable public operation on iOS and Android. This does not establish a measured crash-free percentage or resolve unrelated validation caveats in the case study.
- Owner confirmed monetization via in-app purchases and RevenueCat as purchase backend. Local `docs/revenuecat.md` corroborates Pro access, entitlements, and restoration. Firebase remains the general application backend; RevenueCat is not presented as replacing it. No revenue amount or profitability claim is added.
- Prior React Native experience and incidental Flutter code exposure at Kueski do not constitute employment on its mobile team. Swift experience is limited to tutorials and this product's native integrations. Go is the principal professional language at both Aloi and Kueski.
- Rifas México: owner created the complete React Native/Firebase/Node.js product, published and operated it for at least one year, then sold it. Exact dates and sale amount were not provided. Do not infer launch date from the oldest currently visible store release. The owner reported difficulty monetizing it; no profitable-exit claim is made.
- Public listing: https://apps.apple.com/mx/app/rifas-mexico/id6739985389 describes following third-party draws and is under a different publisher. Current ratings/users are not attributed to the owner's tenure. The former python-cfdiclient project preview was replaced by Rifas; python-cfdiclient retains its dedicated open-source section.

### Work history

Dates read directly in the owner's LinkedIn experience view: https://www.linkedin.com/in/luisiturrios1/ . These replace incomplete start-only dates from the original PDF:

| Role                                          | Period            |
| --------------------------------------------- | ----------------- |
| Aloi, Founding Software Engineer              | Nov 2025–present  |
| Kueski, Staff Engineer                        | Oct 2024–Nov 2025 |
| Kueski, Software Engineer Manager (DevOps)    | Jan 2024–Oct 2024 |
| Kueski, DevOps Tech Lead                      | Jan 2022–Jan 2024 |
| Kueski, DevOps Engineer                       | Aug 2021–Jan 2022 |
| Kueski, Platform Engineer                     | Jun 2021–Aug 2021 |
| KIO Networks, Product Developer               | Jan 2019–May 2021 |
| SAT, Inter-institutional coordination manager | Jul 2018–Dec 2018 |
| centralSoft, Co-founder & Product Developer   | Jan 2016–May 2018 |
| SAIT, Software Developer                      | May 2014–Jan 2016 |

OOMAPASSLRC is absent from LinkedIn but explicitly confirmed by the owner for all of 2017 (Jan–Dec): C#/ASP.NET maintenance of the Citizen Service Center (CAS), not water-resource planning. The overlap with centralSoft is preserved.

- Aloi: owner helped create the initial product now operated by clients, with product design, Go/Next.js development and AWS/Kubernetes work. https://www.femsaventures.com/portfolio publicly supports Aloi's enterprise fiscal AI description and portfolio membership. Use “backed by FEMSA Ventures,” not an unverified ranking as principal investor. No client identities are published.
- Staff Engineer: owner supplied cross-team enablement, Amazon merchant API definition, idempotency implementation within Kueski, technical meetings, and AI tooling/training definition for SSDLC adoption. No unprovided business outcome or launch attribution is claimed.
- Owner confirmed the approximately 50→350 requests/second result occurred during the DevOps Tech Lead period. Keep the existing résumé-supported contribution wording; no additional individual ownership is inferred.
- centralSoft: owner supplied Django products ElevaCloud (electronic invoicing) and CentralCFDI (BI over SAT CFDI data). No customer or revenue counts are inferred.

All eight website languages were updated. Native skills are labelled as integrations within Flutter; product and Go experience lead the positioning.
