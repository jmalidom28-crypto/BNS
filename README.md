# BNS Nutrition Assistant PWA — Prototype v0.1

## What this package includes
- Bilingual English/Filipino interface
- Large touch targets and one-child-at-a-time workflow
- Birthdate, monitoring date, sex, weight, length/height, measurement-method fields
- Offline-capable app shell after first successful load on a supported browser
- Age in completed months and measurement-method adjustment display
- No child database, cloud sync, or export
- Nutritional classification fields are intentionally DISABLED pending validated WHO reference data and confirmation of current Philippine OPT+ classification/reporting rules.

## Important safety status
This is a user-interface and workflow prototype, NOT an approved clinical or public-health assessment tool. Do not use it for actual OPT+ classification, treatment, referral, or reporting. A future calculation module must use the official WHO Child Growth Standards and the appropriate z-score algorithms, account for age/sex/measurement method and flags, and be validated against official WHO Anthro outputs and current Philippine Department of Health / National Nutrition Council guidance.

WHO references:
- WHO Child Growth Standards: https://www.who.int/tools/child-growth-standards
- WHO Anthro software: https://www.who.int/tools/child-growth-standards/software
- WHO official R implementation: https://github.com/WorldHealthOrganization/anthro
- Philippine NNC WHO-CGS reference tables: https://nnc.gov.ph/resources/iec-and-presentation-materials/iec-materials-resources/who-cgs-reference-table-0-71-mos-version-2018/

## Files
- `index.html` — user interface
- `app.js` — date validation, age calculation, bilingual labels
- `manifest.webmanifest` — installable web-app metadata
- `sw.js` — offline caching service worker
- `icon.svg` — app icon

## Deploy using GitHub Pages (free static hosting)
A computer is easiest for the initial deployment.

1. Sign in to GitHub or create an account at https://github.com.
2. Create a new repository, e.g. `bns-nutrition-assistant`. If this will be public, do not add any patient information; this package contains no records.
3. Upload all five app files from this folder (`index.html`, `app.js`, `manifest.webmanifest`, `sw.js`, `icon.svg`) to the repository root.
4. In the repository, open **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**, select the `main` branch and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. The URL is normally `https://YOUR-USERNAME.github.io/bns-nutrition-assistant/`.
7. Open that HTTPS URL in Safari on iPhone or Chrome on Android. Open it once while online so the app shell can be cached.
8. iPhone: Safari → Share → Add to Home Screen. Android: Chrome menu → Install app or Add to Home screen.
9. Test in airplane mode after the first load. If the app does not reopen offline, reconnect and revisit the published HTTPS page before testing again.

## Test checklist
- [ ] Birthdate earlier than monitoring date
- [ ] Same-day visit and birthdate
- [ ] Under 24 months and 24 months or older measurement conventions
- [ ] Impossible weight/height values rejected
- [ ] Filipino/English toggle works
- [ ] Clear for next child clears fields and resets monitoring date
- [ ] Reopen after first load with airplane mode enabled
- [ ] Confirm no patient information is stored or transmitted

## Before using for official OPT+
1. Confirm which exact classifications, indicator names, thresholds, and age cutoffs the current local OPT+ guidance requires.
2. Obtain official WHO reference tables and a standards-compliant calculation implementation. Do not approximate the LMS tables or classify based on simple raw height/weight cutoffs.
3. Build the z-score module with proper interpolation and WHO flag handling.
4. Create a test set covering both sexes, age ranges, measurement methods, normal and extreme measurements, and edge cases.
5. Compare every indicator against WHO Anthro/official reference outputs and document acceptance criteria.
6. Have the City/Municipal Nutrition Action Officer or authorized nutrition technical lead review and approve it before field deployment.
7. Version the reference dataset and include a visible “standards version” and last validation date.

## Updating the app
After changing files, update `CACHE_NAME` in `sw.js` (e.g. `v02`) so phones replace the old cached files. Re-publish, then reopen online to receive the update.
