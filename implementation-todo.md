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
