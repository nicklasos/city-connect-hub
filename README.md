# CITI — твоє місто поруч

Static Ukrainian and English website for residents. Brand assets and app screenshots are supplied by the product owner.

## Run

`node build.mjs` generates the homepage and 14 service pages in each language in `dist/`.

`python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` serves a local preview. Ukrainian is at `/` and English is at `/en/`.

## Content

Edit Ukrainian service descriptions and the 34-community list in `build.mjs`, and English service translations and place names in `content-en.mjs`. Then rebuild the site. Keep launch statuses for parking, utilities, and CNAP accurate. The supplied community list includes work in progress; it is not a list of fully launched services. Regional labels are included only where supplied explicitly.

Styles and client-side interactions are in `dist/styles.css` and `dist/app.js`. Static assets are in `dist/assets/`. No build dependencies, external trackers, or runtime data services are used.

Set `SITE_ORIGIN=https://your-domain.example node build.mjs` when building for a custom domain. This sets the canonical URLs, language alternates, share metadata and sitemap origin. Search indexing requires public access. Both language versions link to the original privacy and terms pages supplied by CITI.

## Verification from earlier revisions

- 14 service detail routes and 34 unique community names.
- Internal links, anchors, image paths, title/description metadata, one H1 per page, and JSON-LD validated.
- All 14 services are visible together in one collection, each with a screenshot, description, three benefits, detail link, and accurate development status.
- Browser checks: all 14 collection images decoded successfully; community search, onboarding carousel, mobile menu, and service-detail pages.
- All 21 PNG assets passed file integrity and HTTP content checks.
- Styles and scripts use content hashes in URLs to avoid stale cached assets after changes.
- Desktop 1440px and mobile 390px layouts checked; no horizontal overflow at these widths.

## Local preview troubleshooting

If only some images remain visible after the preview server stops, restart the server with the command above and reload the page. Already loaded images may remain in the browser cache while later screenshots fail to load; the original PNG files are intact.

## Collected marketing revisions

- Four benefit-focused hero badges; the generic AI prompt has been replaced.
- Removed the community-selection prompt beneath the hero buttons.
- App Store and Google Play QR codes are bundled SVG assets, with direct store links. Both were independently decoded from the actual desktop browser screenshot and match the store buttons.
- All 14 services are presented in one visible collection, with development statuses.
- Availability notes explain that the service set differs by city and some features are not yet available everywhere.

## Second design revision

- Replaced the hero and introductory slogans with resident-focused copy.
- Header, footer, getting-started illustration, and favicon use the supplied citi-logo.png unchanged.
- Community directory is now an interactive Ukraine map with all 34 cooperation communities, keyboard navigation, previous/next controls, and a searchable complete list.
- Map outline comes from the user-owned reference citi.org.ua; community-locations.json supplies approximate schematic settlement locations, not community boundaries. Cooperation does not imply every service is already launched.
- Replaced the mobile onboarding carousel with three original web step cards and direct section links.
- Browser verification: all 34 communities visited; isolated map pin, keyboard navigation, search and empty state passed.
