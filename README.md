# ai-portfolio

A personal portfolio rendered as a 3D scene instead of a normal page. You scroll and a column of project cards (web apps, then animation and short film clips) slides past in front of a field of floating particles. It is a work in progress: the scene works, but several parts are placeholders (see Known gaps).

The package name is `portfolio-3d`.

## Stack

- React 19 and Vite 7
- three.js through `@react-three/fiber` and `@react-three/drei` (`Canvas`, `ScrollControls`, `Sparkles`, `Image`, `Text`)
- Tailwind CSS 3 (via PostCSS) for the little bit of overlay styling, Inter from Google Fonts
- `framer-motion` is installed but not used anywhere in `src`
- ESLint 9 flat config with the react-hooks and react-refresh plugins
- `gh-pages` for deployment

## Getting started

```
npm install
npm run dev
```

Other scripts from `package.json`:

- `npm run build` builds into `dist/`
- `npm run preview` serves the built output
- `npm run lint` runs ESLint
- `npm run deploy` runs the build and then pushes `dist/` to the `gh-pages` branch (`predeploy` runs the build first)

No environment variables are used. `vite.config.js` sets `base: './'` so the built site uses relative paths, which is what GitHub Pages needs. There is no deployed URL in the repo config; `homepage` in `package.json` only points at the GitHub repo.

## Project structure

```
src/
  main.jsx               entry point
  App.jsx                full-screen <Canvas> that renders <Experience />
  index.css              Tailwind directives, dark zinc background, hides scrollbar
  components/
    Experience.jsx       scene: background colour, sparkles, scroll controls
    Projects.jsx         project data array and the card component
    App.jsx              older/alternate App with a header and music button (not imported)
public/                  thumbnails, project videos, ambient.mp3
```

## How it works

`main.jsx` mounts `src/App.jsx`, which is just a `Canvas` filling the viewport. `Experience.jsx` sets a near-black background (`#09090b`), adds 300 `Sparkles`, and wraps `Projects` in drei's `ScrollControls` with 8 pages and some damping.

`Projects.jsx` holds `projectData`, a hardcoded array of 8 entries. Each has a `type` (`web` or `video`), a title, a description, a thumbnail and a url. There are two web apps (Prime Meridian, MediCare Dashboard) and six videos (an auto rickshaw transformation, two sword pieces, and three short films).

Each entry becomes a `ProjectItem`: a drei `Image` plus two `Text` labels. On every frame, `useFrame` reads `scroll.offset` and positions the card along Y, 8 units apart. Cards scale down, tilt and fade the further they are from the centre. Clicking a web card opens its `link` in a new tab. Clicking a video card calls `onSelectVideo`.

All data is local. Nothing is fetched, and the images and videos are served from `public/`.

## Known gaps

- Video cards do nothing yet. `Projects` expects an `onSelectVideo` prop, but `Experience` never passes one, so clicking a video card throws. There is no video player or modal in the code.
- The two web project links are placeholders (`https://your-link1.com`, `https://your-link2.com`).
- `img1.png` to `img7.png` in `public/` are byte-identical (same MD5), so all six video cards currently show the same thumbnail. `img7.png` and `rickshaw.mp4` are not referenced.
- `src/components/App.jsx` (header, "Play Music" button using `ambient.mp3`, scroll hint) is not imported by anything, and its `./components/Experience` import would not resolve from where it sits. The music and header UI is therefore not live.
- `public/` is about 173 MB, mostly videos plus a 27 MB `ambient.mp3`, all committed to git. A deploy to GitHub Pages ships all of it.
- `index.html` still has the default title (`portfolio-3d`) and the Vite favicon. `src/App.css` and `src/assets/react.svg` are leftovers from the template and are unused.
- `framer-motion` and `@types/three` / `@types/react*` are not used by this JavaScript project.
- `.gitignore` lists a `reconstruct.sh` that is not in the repo.

## History

All commits are by AdamPandey and from 2026-02-03: Vite scaffold, 3D canvas, sparkles, project data, scroll controls, then the zinc styling pass.
