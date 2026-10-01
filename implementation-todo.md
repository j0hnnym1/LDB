# Client changes — 27 September 2026

Sources: `temp/260927_LDB_Website_material.docx`, `temp/cases.xlsx`, and the supplied logos in `assets/img/logos_ldb/`.

- [x] ~~Read the brief and all 23 spreadsheet cases; inspect both removal screenshots.~~
- [x] ~~Replace the hero tagline with “Greenlight Your Success”.~~
- [x] ~~Replace About us with the client’s supplied text.~~
- [x] ~~Replace the old project cards with all 23 supplied cases and seven sector filters.~~
- [x] ~~Add a client/project logo scroller linked to the case studies.~~
- [x] ~~Present the supplied logos in monochrome within the existing brand palette.~~
- [x] ~~Add “member of nngroup” linked to https://nngroup.gr in the footer.~~
- [x] ~~Verify the header contains only “Est. 2004” and the favicon uses the three logo lights.~~
- [x] ~~Omit Privacy Policy, Cookie Policy, and cookie controls per the user’s instruction.~~
- [x] ~~Rebuild CSS and verify content, assets, filtering, navigation, and responsive layout.~~

The two screenshot-marked cards are “Funding business growth” and “A strategy for the region”; their generic content is superseded by the detailed case studies. Retain the existing visual identity and hero animation. Use the spreadsheet as the authoritative case text and order.

Verification: production CSS build and JavaScript syntax checks passed. Browser checks matched all 23 case names, headlines, and descriptions against the spreadsheet; exercised all eight filter buttons, logo-to-case links, scroller controls, menu/Escape, and no-JavaScript case details. No browser errors or horizontal overflow at 320, 390, 768, 1024, and 1440 pixels. Desktop/mobile screenshots, the footer, and all 23 logos were visually reviewed. Corrected white-logo contrast and scroller image bounds. No policy, cookie controls, or tracking were added.

## Follow-up layout and motion

- [x] ~~Reorder sections: What we do, Our Work, Clients & Collaborations, About us.~~
- [x] ~~Add automatic logo scrolling with pause/resume, interaction pauses, and reduced-motion support.~~
- [x] ~~Verify section order and automatic/manual scrolling on desktop and mobile.~~

## Security & GDPR audit — 30 September 2026

The user asked for no cookies at all, and a notice saying so; the earlier "omit Privacy/Cookie Policy" instruction is superseded.

- [x] ~~Self-host Manrope; remove Google Fonts, which sent every visitor's IP address to Google.~~
- [x] ~~Add a Content-Security-Policy meta tag: same-origin resources only, no inline script.~~
- [x] ~~Add `privacy.html` (no cookies, no storage, no third parties; hosting logs; email; rights) and link it from the footer.~~
- [x] ~~Add `_config.yml` so GitHub Pages stops publishing internal notes, `package*.json` and `src/`.~~
- [x] ~~Remove the office address from `client-checklist.md`.~~
- [x] ~~Warn in the README against drag-and-drop deploys, which would publish `temp/`.~~
- [ ] Client to supply the company's legal name, VAT number (ΑΦΜ) and ΓΕΜΗ number for the notice and footer.
- [ ] Decide whether the repository stays public: git history still contains the internal notes and address.

Verification: served over HTTP in Chrome at 1440 and 390 pixels. Both pages made zero third-party requests, set zero cookies and left local/session storage empty. The CSP blocked a test tracker image and inline script, with no console or page errors and no horizontal overflow. The Greek font subset loads for "ΕΣΠΑ". Homepage screenshots match the Google Fonts baseline; the only differences are anti-aliasing and the new footer link.
