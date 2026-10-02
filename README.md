## Project structure

```
├── index.html          # The entire site (single page)
├── privacy.html        # Privacy & cookie notice (linked from the footer)
├── src/css/input.css   # Tailwind entry point: theme tokens (colors, font)
├── css/style.css       # Compiled CSS (generated — do not edit by hand)
├── assets/fonts/       # Self-hosted Manrope (SIL OFL)
├── assets/img/         # Favicon and images
├── _config.yml         # GitHub Pages: keeps internal files off the live site
├── assets/js/site.js   # Navigation and project filtering
├── package.json        # Build scripts and dev dependencies
└── .gitignore
```

## Development

Requires Node.js (v18+).

```bash
npm install      # install Tailwind CLI
npm run watch    # recompile CSS on every change
```

Then open `index.html` in a browser, or serve it locally:

```bash
npx serve .
```

## Building for production

```bash
npm run build    # writes minified CSS to css/style.css
```

The compiled `css/style.css` is committed to the repo, so the site can be
deployed as-is without a build step. Rebuild and commit it whenever you change
`src/css/input.css` or the markup in `index.html`.

## Deployment

The site is fully static — any static host works:

- **GitHub Pages**: push to GitHub, then Settings → Pages → deploy from branch (`main`, root).
  `_config.yml` keeps internal notes (`*.md`), `package*.json` and `src/` off the live site.
- **Netlify / Vercel**: connect the repo with no build command. Do not drag-and-drop the
  working folder: it would also publish `temp/` (client material) and `node_modules/`.
  On these hosts `_config.yml` does not apply, so exclude the same files there.

## Privacy and security

The site sets no cookies, uses no browser storage and makes no third-party requests,
so it needs no cookie banner. `privacy.html` states this publicly, and the
Content-Security-Policy meta tag in each page enforces it: browsers block any
request to another domain. Keep it that way:

- Self-host every asset (fonts live in `assets/fonts/`); never link Google Fonts or CDNs.
- Adding analytics, a form service, a map or a video embed introduces third-party
  processing (and usually cookies). Update `privacy.html`, the CSP and, if anything is
  stored on the device, add consent **before** shipping it.

## Customizing

- Colors and font: edit the `:root` block in `src/css/input.css`, then rebuild.
- Content: all sections live in `index.html` (hero, services, projects, about, contact).
