# Siyamthanda Mgqoboka · Developer portfolio

React + TypeScript + Vite. All content lives in `src/data.ts`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## Edit content
- Profile, availability, projects, skills and contact: `src/data.ts`
- Project screenshots: `public/projects/` (referenced from each project's `shots`)
- Empty strings and lists are hidden, e.g. no `repo` means no GitHub button
- CV: save it as `public/cv.pdf` and set `cv: "cv.pdf"` in `src/data.ts`
- Email / LinkedIn: fill in `contact` in `src/data.ts`

## Put it live on GitHub Pages (clean link)
1. On the **Siya23-maker** GitHub account, create a public repo named exactly
   **`Siya23-maker.github.io`**.
2. Upload every file in this folder (including the hidden `.github` folder) to the `main` branch.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for the green tick.
5. Your site is live at **https://siya23-maker.github.io/**

Prefer a different repo name such as `portfolio`? It still works; the workflow detects the
name and the site lives at `https://siya23-maker.github.io/portfolio/`.
