# Consultant One-Pager

A static one-page website for an independent consultant. Plain HTML + Tailwind CSS,
no JavaScript framework, no animations.

## Project structure

```
├── index.html          # The entire site (single page)
├── src/css/input.css   # Tailwind entry point: theme tokens (colors, font)
├── css/style.css       # Compiled CSS (generated — do not edit by hand)
├── assets/img/         # Favicon and images
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
- **Netlify / Vercel**: drag-and-drop the folder, or connect the repo with no build command.

## Customizing

- Colors and font: edit the `@theme` block in `src/css/input.css`, then rebuild.
- Content: all sections live in `index.html` (hero, services, projects, about, contact).
