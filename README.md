# AIRIS Lab website

Single-page lab homepage listing the lab’s research projects, built with [Astro](https://astro.build) and served at https://shuaili90.github.io/.
Each project has its own website and repository; this page links to them.

## Add or edit a project

1. Add a card image to `public/images/` (WebP, about 1200 px wide).
2. Add or edit an entry in `src/data/projects.ts`: topic, title, one-sentence description, website URL, image size, and alternative text.

Cards appear in the order listed. Page text is in `src/pages/index.astro`; styles are in `src/styles/global.css`.

## Run locally

Requires Node.js 24.

```sh
npm ci
npm run dev              # live preview at http://localhost:4321/
```

## Check before publishing

```sh
SITE_URL=https://shuaili90.github.io npm run build
npx astro preview --port 4480 &
npm run lint
npm run test:a11y        # axe WCAG 2.1 A/AA scan plus keyboard and reflow checks
```

Automated checks do not establish full WCAG or ADA compliance.

## Publish

Pushing to `main` runs `.github/workflows/deploy.yml`: it audits dependencies, lints, builds, runs the accessibility checks, and pushes the built site to the `gh-pages` branch, which GitHub Pages serves.

The previous Lab Website Template files remain in this repository’s git history.
