# Desierto de Altar GPS: case-study source review

This is a read-only review of the owner's local product repository at `/Users/luisiturrios/Repos/desierto_de_altar`. No changes, remote deployments, purchases, or production operations were performed in that repository. The portfolio describes implementation evidence; this review does not establish fresh production verification or successful native/store validation.

## Source-to-content mapping

| Portfolio content                                                                   | Repository evidence                                                                                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iOS/Android app, Flutter/Dart, dependencies                                         | `pubspec.yaml`, `ios/Runner/`, `android/app/src/`                                                                                                      |
| Feature modules, AppScope dependency composition, controller/stream state           | `AGENTS.md`, `lib/app/app.dart`, `lib/app/app_dependencies.dart`, feature application controllers                                                      |
| Downloadable satellite maps, style packs, tile regions                              | `lib/features/explorer/data/offline_map_service.dart`                                                                                                  |
| Local personal routes, points, segments, schema migrations                          | `lib/core/database/app_database.dart`, `lib/features/user_content/application/route_recording_controller.dart`                                         |
| Shared GPS acquisition, serialized source transitions, independent consumers        | `lib/core/location/location_session_coordinator.dart`                                                                                                  |
| GPX/KML geometry parsing, invalid coordinate/XML rejection                          | `lib/features/user_content/data/geographic_file_parser.dart`, `docs/file-imports.md`                                                                   |
| Transactional import, purchase/access checks before commit                          | `lib/app/imports/file_import_host.dart`, `docs/file-imports.md`                                                                                        |
| One-time Pro purchase, RevenueCat access and restoration                            | `docs/revenuecat.md`, `lib/features/purchases/domain/purchase_service.dart`                                                                            |
| Temporary group session state, reconciliation and stale-response handling           | `lib/features/location_groups/domain/location_group_session.dart`, `docs/location-groups.md`                                                           |
| Cloud Functions, Node.js, TypeScript, Firestore transactions, request deduplication | `firebase/functions/package.json`, `firebase/functions/src/location-groups/group-service.ts`, `firebase/functions/src/index.ts`                        |
| Auth/App Check identity checks, server membership and expiration enforcement        | `firebase/functions/src/security/verify-group-client.ts`, `firebase/functions/src/location-groups/group-service.ts`, `docs/location-groups.md`         |
| Wallet pass backend                                                                 | `firebase/functions/src/index.ts`, `firebase/functions/src/wallet/`                                                                                    |
| Swift native Live Activity bridge, Kotlin native integration                        | `ios/Runner/RouteLiveActivityBridge.swift`, `packages/car_integration/android/src/main/kotlin/com/iturriosdev/car_integration/CarIntegrationPlugin.kt` |
| Crashlytics, Performance Monitoring, Analytics, native flavor isolation             | `lib/core/firebase/firebase_runtime.dart`, `docs/firebase.md`                                                                                          |
| Automated checks and test infrastructure                                            | `.github/workflows/flutter.yml`, `test/`, `firebase/functions/test/`, `firebase/functions/package.json`                                                |

## Editorial interpretation and boundaries

- The problem statement is a synthesis of the product's offline maps, route, and local-library workflows. It does **not** claim user interviews, market research, usage volume, or measured user outcomes.
- “Lessons learned” explicitly presents design takeaways inferred from the implementation, not a fabricated first-person account of what the owner learned.
- GPS session coordination demonstrates management of shared acquisition and lifecycle requirements. No measured battery improvement or guaranteed background duration is claimed.
- Local offline maps and routes do not imply offline live group sharing. Live sharing requires connectivity; local state is distinct from a remote acknowledgement.
- Group code and backend are implemented, but `docs/location-groups.md` leaves full store-build end-to-end validation and extended physical-device validation pending. The case study states this limitation.
- `docs/car-integration.md` documents CarPlay and Android Auto implementation work plus platform authorization and physical-device verification requirements. They are **not** advertised as publicly released features. Swift/Kotlin are listed based on concrete native source code, not inferred from Flutter platform support alone.
- `docs/route_flyover_video.md` contains historical findings predating current localization. Current `lib/app/app.dart` and `lib/l10n/` take precedence: the product includes English/Spanish localization. The portfolio's eight languages belong to the website, not to the mobile product.
- Pro is a one-time, non-consumable purchase in the source, not a recurring subscription. No sales or revenue figures are used.
- Test suites and CI configuration are described as present in the repository. Their prior pass counts are not used as portfolio metrics, and this review did not rerun the mobile project's suites.
- New technical-profile entries are supported by this independent product. Professional-experience technology lists remain based on the supplied résumé.

## Maintenance

Case-study structure and heading/body translation keys live on the project record in `src/data/profile.ts`. Copy is in all eight `src/i18n/<locale>/common.json` dictionaries. The project preview renders the stack from structured project data. Future reviews should update capability status before removing the group-validation qualifier or advertising vehicle integrations as released.
