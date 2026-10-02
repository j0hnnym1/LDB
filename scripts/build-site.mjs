// Copies the public website into dist/ for Cloudflare. Only the paths listed
// here are published, so internal notes, sources and client material in this
// repository can never be deployed by accident.
import { cpSync, rmSync } from 'node:fs';

const PUBLIC = ['index.html', 'privacy.html', 'css', 'assets'];

rmSync('dist', { recursive: true, force: true });
for (const path of PUBLIC) cpSync(path, `dist/${path}`, { recursive: true });
console.log(`Copied ${PUBLIC.join(', ')} to dist/`);
