# Krishnapriya P.R. | Cybersecurity Portfolio

A fast, accessible, single-page portfolio for an aspiring SOC Analyst. Built with plain HTML, CSS, and vanilla JavaScript so it can be hosted for free on GitHub Pages. No frameworks, no build step, no tracking.

**Live site:** `https://prkrishnapriya468-wq.github.io/YOUR-REPO-NAME/` (placeholder until you deploy)

## Purpose

To present my cybersecurity learning journey, real skills, and developing projects to recruiters and mentors. Everything on the site should reflect what is actually true: certifications and project statuses must match real achievements.

## Features

- Dark theme by default, with a fully designed light theme (saved in `localStorage`, follows system preference on first visit)
- Responsive, mobile-first layout (320px to 1440px+)
- Keyboard accessible: skip link, visible focus, accessible menu, filter buttons, and theme toggle
- Project cards generated from an editable data list, with working category filters
- Repository links only appear when a real URL is provided
- Subtle scroll reveals that respect `prefers-reduced-motion`
- Content stays readable if JavaScript is disabled
- No external fonts, libraries, or trackers

## Technologies

HTML5, CSS3 (custom properties, Grid, Flexbox), JavaScript ES6+.

## Folder structure

```text
cybersecurity-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── README.md
├── LICENSE
└── .nojekyll
```

`.nojekyll` tells GitHub Pages to serve the files as they are without running Jekyll processing. It is harmless and optional for this site.

## Run locally (Windows)

1. Unzip the project to a folder, for example `C:\Users\YourName\cybersecurity-portfolio`.
2. Double-click `index.html` to open it in your browser. That is enough, because everything uses relative paths.
3. Optional local server: open PowerShell in the folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Sign in to GitHub and click **New repository**.
2. Name it. Two options:
   - **Project site:** any name, such as `cybersecurity-portfolio`. The URL will be `https://prkrishnapriya468-wq.github.io/cybersecurity-portfolio/`.
   - **User site:** exactly `prkrishnapriya468-wq.github.io`. The URL will be `https://prkrishnapriya468-wq.github.io/`.
3. Set it to **Public** and create it (you can skip the README option because this project has one).
4. Upload the files: on the new repository page click **uploading an existing file**, drag in everything from the project folder (keep the `css` and `js` folders), and click **Commit changes**.
   - Alternative with Git: install Git for Windows, then in PowerShell inside the folder run:
     ```powershell
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/prkrishnapriya468-wq/YOUR-REPO-NAME.git
     git push -u origin main
     ```
5. In the repository open **Settings**, then **Pages**.
6. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
7. Wait one to three minutes. Refresh the Pages settings to see the published URL.
8. Open the URL on your computer and phone to verify.

### Updating the site later

Edit a file on GitHub (pencil icon) or change it locally, then commit and push. Pages redeploys automatically within a couple of minutes.

### Troubleshooting

| Problem | Likely fix |
|---|---|
| 404 page | Pages not enabled yet, wrong branch/folder, or `index.html` is not in the repository root. Wait a few minutes and re-check Settings, Pages. |
| Page has no styling or scripts | The `css` and `js` folders were not uploaded, or folder names have different capitalisation. GitHub is case-sensitive. |
| Works locally, not online | Check that paths in `index.html` stay relative (`./css/style.css`), not `C:\...` or `/css/...`. |
| Old version still showing | Hard refresh with Ctrl+F5. |

## How to edit content

All edits are in `index.html` unless noted.

- **About:** edit the paragraphs inside `<section id="about">`.
- **Skills:** edit the `<li>` rows inside `<section id="skills">`. Each row has a name and a label (`Fundamentals`, `Beginner`, `Learning`). Keep labels honest.
- **Add a project:** open `js/script.js` and add an object to the `PROJECTS` array (copy an existing one). Use `category` `"blue-team"` or `"forensics"`. For a new category, also add a filter button in `index.html` (`data-filter="your-category"`) and a label in `CATEGORY_LABELS`.
- **Update a project status:** change `status` in `PROJECTS` to `"planned"`, `"in-progress"`, or `"complete"`. Only use `"complete"` when it is true.
- **Add a repository link:** set `repoUrl` to the full `https://github.com/...` URL. A "View on GitHub" button appears automatically. While empty, the card shows "Repository link coming soon".
- **Add a screenshot:** put an image in `assets/images/` (create the folder), set `image: "./assets/images/name.png"` and a meaningful `imageAlt`. Compress images first.
- **Add LinkedIn:** in the Contact section of `index.html`, find the commented-out LinkedIn `<li>`, remove the comment markers, replace `YOUR-PROFILE` with your real profile path, and delete the `hidden` attribute.
- **Contact details:** change the `mailto:` and GitHub links in the hero, Contact section, and footer.
- **Certifications:** none are listed. Add a section only when you hold real credentials.
- **Colors:** edit the CSS variables at the top of `css/style.css` (`:root[data-theme="dark"]` and `:root[data-theme="light"]`).
- **SEO metadata:** edit the `<title>`, `description`, and Open Graph tags in `<head>`. After deploying, uncomment the canonical and `og:url` lines and set your real URL. Add `og:image` only when you have a real preview image.

## Manual test checklist

Mark each as you test it yourself. None are pre-checked.

| Test | Steps | Expected | Pass / Fail |
|---|---|---|---|
| Navigation | Click each nav link | Page scrolls to the matching section | |
| Mobile menu | Narrow window below 1024px, click the menu button | Menu opens and closes; closes after choosing a link | |
| Escape key | Open mobile menu, press Esc | Menu closes and focus returns to the button | |
| Theme toggle | Click the theme button, reload | Theme switches and is remembered | |
| Project filters | Click Blue Team, Digital Forensics, All | Only matching cards show; selected button has a check mark | |
| GitHub link | Click GitHub links | Opens `github.com/prkrishnapriya468-wq` in a new tab | |
| Email link | Click Email me | Mail app opens addressed to `krishnakpriya24@gmail.com` | |
| Missing repo links | Look at project cards | "Repository link coming soon" text, no link | |
| Footer year | Check the footer | Shows the current year | |
| Back to top | Click Back to top | Scrolls to the top | |
| Responsive | Check at 320, 375, 768, 1024, 1440px | No horizontal scrolling, readable layout | |
| Keyboard only | Tab through the whole page | Logical order, visible focus ring on every control | |
| Reduced motion | Enable the OS reduce-motion setting | No fades or smooth scrolling | |
| No JavaScript | Disable JS and reload | All content and links visible; project cards still shown | |
| Console | Open developer tools | No errors; all assets load | |

## License

MIT, see `LICENSE`. This is a common permissive license: others may reuse and modify your code as long as the license notice is kept, and there is no warranty. It has not been legally reviewed. If you would rather keep the code all-rights-reserved, delete `LICENSE`.

## Placeholders to update before publishing

- Repository name in the live-site URL above
- Canonical URL and `og:url` in `index.html` (after deploying)
- Real repository links and statuses for each project
- LinkedIn URL (optional)
- Copyright name in `LICENSE`, if you want a different form
