# ahmadaldirieh.com

Personal portfolio website for Ahmad Aldirieh — Electrical Engineering student at the University of Waterloo.

## Tech Stack

Pure vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies.

- **HTML5** — semantic markup, multi-page structure
- **CSS3** — custom properties, grid, flexbox, animations, dark/light theming
- **JavaScript (ES6+)** — DOM manipulation, IntersectionObserver, localStorage, canvas API, event delegation

Hosted on **Vercel**, auto-deploys on push to main.

## Structure

```
/
├── index.html                  # Main page
├── styles.css                  # All styles
├── script.js                   # Theme toggle, scroll reveal, gallery, nav
├── favicon.svg                 # AA favicon
├── resume.pdf                  # Resume
├── project-firefighter.html    # Inferno-1400 project page
├── project-hrvita.html         # HRVita project page
├── project-frenzyflyer.html    # Frenzy Flyer project page
├── project-sumo.html           # Sumo robot project page
├── project-linefollower.html   # Line follower project page
└── media/                      # Compressed images and videos
```

## Features

- Dark / light mode toggle (persisted via localStorage)
- Scroll reveal animations via IntersectionObserver
- Per-project gallery with photo and video switching
- Fully responsive (mobile, tablet, desktop)
- No JavaScript frameworks or CSS preprocessors
