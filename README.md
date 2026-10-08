# Research project pages

Published with GitHub Pages at **https://sagileo.github.io/**.

| Page | URL | Source |
| --- | --- | --- |
| Project index | https://sagileo.github.io/ | `index.html` |
| JointLight | https://sagileo.github.io/JointLight/ | `JointLight/index.html` |
| GSHeadRelight | https://sagileo.github.io/GSHeadRelight/ | `GSHeadRelight/index.html` |

URLs without a trailing slash redirect to the corresponding directory page. Old URLs under `projects/` redirect to the new canonical project URLs.

## GitHub Pages

In **Settings → Pages**, use **Deploy from a branch**, branch **main**, folder **/(root)**. This repository is a static site with `.nojekyll`; no build command or dependencies are required. A push to `main` updates the website after the Pages deployment finishes.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ and follow the project links. Keep each project's assets together with its `index.html`; internal paths are relative to the project folder.

## Editing

- `index.html` and `site.css`: root project index.
- `JointLight/`: bilingual JointLight page, local videos, figures and paper.
- `GSHeadRelight/`: GSHeadRelight page and its local images/videos.
- `projects/*/index.html`: redirects for links to the old directories.
- `404.html`: project navigation for missing pages.

GSHeadRelight paper/arXiv links are currently marked “coming soon” because the supplied page did not contain destinations.
