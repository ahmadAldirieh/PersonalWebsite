# ahmadaldirieh.com

Personal portfolio website for Ahmad Aldirieh

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Unbounded, DM Sans, DM Mono (Google Fonts)
- **Deployment:** Vercel (auto-deploys on push to main)

No third-party component libraries. All UI is custom.

## Project Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts
│   ├── page.tsx                # Home page (Hero, About, Experience, Projects, Contact)
│   ├── globals.css             # Global styles, CSS variables, Tailwind
│   └── projects/[slug]/
│       └── page.tsx            # Dynamic project detail pages (statically generated)
├── components/
│   ├── Nav.tsx                 # Sticky nav with theme toggle + mobile menu
│   ├── ProjectCard.tsx         # Project grid card
│   └── ProjectGallery.tsx      # Interactive photo/video gallery (client component)
├── lib/
│   └── projects.ts             # All project data (single source of truth)
└── public/
    ├── favicon.svg
    ├── resume.pdf
    └── media/                  # Compressed images and videos
```

## Features

- Dark / light mode toggle (persisted via `localStorage`)
- Scroll reveal animations via `IntersectionObserver`
- Per-project gallery with clickable photo and video switching
- Fully static export — no server required
- Fully responsive

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build
```

Outputs a fully static site to `/out`.
