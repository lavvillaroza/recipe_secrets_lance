# Build: Recipe Secrets Restaurant website

## Goal
A polished, image-rich marketing website for **Recipe Secrets**, a [cuisine type, e.g. modern Asian fusion] restaurant in [city]. It should feel warm, upscale and appetizing, and make visitors want to book a table.

## Tech constraints
- **Plain static HTML, CSS and vanilla JavaScript only.** No frameworks, no build step, no server code.
- Must deploy as-is to free static hosting (GitHub Pages, Netlify or Cloudflare Pages). Every link must work when the site is served from a subfolder, so use relative paths.
- One shared `styles.css` and one small `main.js`. Header and footer markup is repeated on each page (no includes).
- Fonts from Google Fonts only. No other external dependencies except images.

## File structure
/index.html  /about.html  /specials.html  /reservation.html  /contact.html
/css/styles.css  /js/main.js  /images/  /README.md

## Pages (exactly 5)
1. **Home**: full-screen hero image with restaurant name, tagline and a "Reserve a Table" button. Short intro, 3 signature-dish cards with photos, a testimonials strip (3 quotes), and a closing call-to-action banner.
2. **About**: our story, the chef (photo plus a short bio), our philosophy and ingredients, and an interior photo gallery (6 images in a grid).
3. **Specials**: this week's specials as cards (photo, name, short description, price). Group them as Starters, Mains and Desserts, 2–3 items each. Add a "Chef's Pick" badge on one item.
4. **Reservation**: a form with name, email, phone, date, time (dropdown in 30-minute slots within opening hours), party size (1–10), and special requests. Include client-side validation: required fields, no past dates, valid email. Submit through **Formspree** (`action="https://formspree.io/f/YOUR_FORM_ID"`), and leave a clear `TODO` comment where I paste my form ID. Show a friendly success message after submitting.
5. **Contact**: address, phone, email, opening hours table, an embedded Google Maps iframe, and social media icon links (inline SVG).

## Design direction
- Palette: deep charcoal or espresso background sections, warm cream, and one accent (burnt orange or gold). Define every color as a CSS custom property in `:root`.
- Typography: an elegant serif for headings (e.g. Playfair Display) and a clean sans-serif for body text (e.g. Inter).
- Generous whitespace, large food photography, subtle hover effects on cards and buttons, and gentle fade-in on scroll using IntersectionObserver. Respect `prefers-reduced-motion`.
- Sticky header with logo text and navigation. The current page is highlighted. On mobile it collapses to a hamburger menu.
- Consistent footer on every page: hours, address, social links, copyright.

## Images
- Use high-quality free photos from Unsplash via direct `images.unsplash.com` URLs with size parameters (e.g. `?w=1600&q=80`). Choose real, relevant food, restaurant-interior and chef photos.
- Put every image URL in one comment block at the top of `styles.css` or in the README, so I can later swap them for my own photos in `/images/`.
- Every `<img>` needs descriptive `alt` text, `width`/`height` attributes, and `loading="lazy"` (except the hero).

## Content
Write realistic placeholder copy (not lorem ipsum) for everything. Wrap anything I must replace (address, phone, prices, chef name, form ID) so it's easy to find, and list all of those items in the README.

## Quality requirements
- Fully responsive at 375px, 768px and 1440px, with no horizontal scrolling.
- Semantic HTML, proper heading order, visible keyboard focus, form labels, and color contrast meeting WCAG AA.
- A unique `<title>` and meta description per page, Open Graph tags, and an SVG favicon.
- Lighthouse target: 90+ for performance, accessibility and SEO.

## Before you finish
1. Serve the site locally (`python3 -m http.server`) and open each page to check for broken links, missing images and console errors.
2. Test the reservation form validation and the mobile menu.
3. Write a README covering: how to preview locally, how to deploy to GitHub Pages and Netlify (step by step), how to set up Formspree, and the list of placeholders to replace.