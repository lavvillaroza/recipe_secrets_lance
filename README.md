# Recipe Secrets — Restaurant Website

A 5-page static marketing site for **Recipe Secrets**, a modern Asian fusion restaurant. Plain HTML, CSS and vanilla JavaScript — no build step, no framework, no server code.

## File structure

```
/index.html        Home
/about.html        About (story, chef, philosophy, gallery)
/specials.html      This week's specials
/reservation.html   Reservation form (Formspree)
/contact.html        Address, hours, map, social links
/css/styles.css     Shared stylesheet (colors, type, layout)
/js/main.js          Mobile nav, scroll fade-ins, form validation + submit
/images/             Put your own photos here when you swap out Unsplash URLs
/favicon.svg         SVG favicon used by all pages
```

## Preview locally

No build step required. From this folder, run a static file server so relative paths and `fetch` work correctly (opening the HTML files directly with `file://` will break the form submission and some paths):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html` in your browser. Click through all five pages, resize the window (try 375px, 768px and 1440px), and open the reservation form to test validation.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to the `main` branch (the repo root should contain `index.html`, not a subfolder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save. GitHub will give you a URL like `https://yourusername.github.io/your-repo/` within a minute or two.
5. Because every link in this site uses relative paths, it will work whether it's served from the domain root or a subfolder — no changes needed.

## Deploy to Netlify

1. Log in to [netlify.com](https://netlify.com) and click **Add new site → Deploy manually** (or connect your GitHub repo for automatic deploys on push).
2. If deploying manually, drag this entire project folder onto the upload area.
3. Netlify will assign a random subdomain like `https://your-site-name.netlify.app`. You can rename it under **Site settings → Change site name**, or attach a custom domain under **Domain management**.
4. No build command or publish directory settings are needed — this is a static site, so the defaults work as-is.

## Set up Formspree (reservation form)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy its form ID (it looks like `https://formspree.io/f/abc12345`).
3. Open `reservation.html`, find the `<form>` tag near the top of the form section, and replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with your real ID.
4. Submit a test reservation from the live site — Formspree will ask you to confirm the first submission by email before it starts forwarding entries.
5. The form validates required fields, email format, phone format, date (no past dates) and party size client-side before it ever reaches Formspree, and shows an inline "thank you" message on success instead of redirecting.

## Placeholders to replace before launch

Search for `TODO` comments in the HTML files, or update these directly:

| Item | Current placeholder | Found in |
|---|---|---|
| Form ID | `YOUR_FORM_ID` in the form `action` | `reservation.html` |
| Street address | `482 NW Couch St, Portland, OR 97209` | `index.html`, `about.html`, `specials.html`, `reservation.html`, `contact.html` (footer on every page, plus the contact page body) |
| Phone number | `(503) 555-0142` | every page footer, `contact.html` |
| Email address | `hello@recipesecrets.com` | `contact.html` |
| Chef name & bio | "Chef Elena Park" | `about.html` |
| Chef photo | Unsplash stock photo | `about.html` |
| Opening hours | Tue–Sun sample hours | every footer, `contact.html`, `reservation.html` form note |
| Google Maps embed | Generic query-based embed for the sample address | `contact.html` |
| Social links | `instagram.com`, `facebook.com`, `twitter.com` (not pointed at real profiles) | every footer, `contact.html` |
| Specials menu & prices | Sample dishes/prices, refreshed weekly | `specials.html` |
| All photography | Unsplash stock photos (see URL list at the top of `css/styles.css`) | all pages |
| Copyright year/name | "© 2026 Recipe Secrets" | every footer |

## Notes

- All colors are defined as CSS custom properties in `:root` at the top of `css/styles.css` — change the palette there instead of hunting through individual rules.
- Scroll fade-ins use `IntersectionObserver` and respect `prefers-reduced-motion: reduce` (animations are disabled instantly for users who request it).
- The mobile hamburger menu, scroll animations, and reservation form logic all live in `js/main.js`.
- Every `<img>` has descriptive `alt` text, explicit `width`/`height`, and `loading="lazy"` except the home page hero image (loaded eagerly since it's above the fold).
