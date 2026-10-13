# Dogseye Studio website

The official site of Dogseye Studio, an indie game studio in Madrid: https://dogseye-studio.github.io/

It's a plain static site (HTML + CSS + a little JavaScript) served by GitHub Pages. There's no build step and nothing to install.

## Structure

```
index.html            The page (all text lives here)
css/styles.css        Styles; design tokens are at the top in :root
js/main.js            Mobile menu, active-section highlight, scroll reveal, copy-email button
assets/               Original logo files (source artwork, not loaded by the page)
assets/img/           Web-ready images generated from the originals
web.html              Old URL, redirects to the homepage
```

## Preview locally

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Brand colors

Sampled from the official logo (`assets/logo1_sinFondo.png`):

| Token        | Hex       | From the logo         | Used for                                  |
|--------------|-----------|-----------------------|-------------------------------------------|
| `--purple`   | `#8440B5` | Dog body, "DOGS"      | Headline highlight, links, accents        |
| `--magenta`  | `#FF00D0` | "EYE", third eye      | Primary buttons, pixel stars, badges      |
| `--pink`     | `#F38CE0` | Cheeks                | Cards, icons on dark                      |
| `--lavender` | `#C9A1F2` | Ears                  | Cards, rings around the hero logo         |
| `--plum`     | `#362E3D` | Muzzle                | Basis for the dark game section           |
| `--ink`      | `#19141F` | Black disc / outlines | Text, borders, "sticker" shadows          |

The logo is drawn for light backgrounds (its black disc disappears on dark ones), so the logo always sits on the light `--paper` background.

## Updating content

- **Text:** edit `index.html` directly.
- **Social links:** each link appears in up to three places (hero, Socials section, footer). Search for the URL to update them all.
- **Logo images:** `assets/img/` holds cropped, resized copies of the original logos. If the logo changes, regenerate them at the same sizes: `logo-full.png` (720px wide), `logo-full-480.png` (480px), `logo-mark.png` (192px wide), `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` (180px on `#FBF8FD`) and `og-image.png` (1200×630 on `#FBF8FD`).
- **Screenshots / game title:** none are on the site yet. When the team has official material, the "Our game" section (`#game`) is the place for it.

## Fonts

Fredoka (headings) and Silkscreen (pixel labels) load from Google Fonts. If they fail to load, the page falls back to system fonts. To avoid the external request, download the font files into the repo and replace the Google Fonts `<link>` in `index.html` with `@font-face` rules.
