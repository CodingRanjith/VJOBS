# Vinayaga Associates — Corporate Website

Premium multi-page static corporate website for **Vinayaga Associates**, an overseas manpower recruiting agency based in Chennai, Tamil Nadu.

Production domain referenced in brochure: [www.vajobs.in](https://www.vajobs.in)

## Project overview

This is a complete **10-page** HTML/CSS/Vanilla JavaScript website built from the company’s 20-page brochure. It is designed for direct deployment to cPanel, Apache, or any static host.

### Pages

1. `index.html` — Home
2. `about.html` — About Us
3. `services.html` — Our Services
4. `recruitment-process.html` — Recruitment Process
5. `job-categories.html` — Job Categories
6. `industries.html` — Industries We Serve
7. `clients.html` — Clients & Global Presence
8. `team.html` — Our Team
9. `compliance.html` — Documentation & Compliance
10. `contact.html` — Contact Us

Additional: `404.html`, `robots.txt`, `sitemap.xml`, `.htaccess`

## Tech stack

- HTML5 (semantic multi-page structure)
- CSS3 (custom design system + modular stylesheets)
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3 (CDN)
- Bootstrap Icons (CDN)
- AOS — Animate On Scroll (CDN)
- Swiper.js (CDN)
- Google Fonts — Montserrat + Source Sans 3

No React, Vite, Next.js, Angular, or SPA runtime is required.

## Local development

Because header/footer includes are loaded with `fetch`, open the site through a local web server (not `file://`).

### Option A — NPX serve

```bash
cd vinayaga-associates
npx --yes serve .
```

Then open the printed local URL (usually `http://localhost:3000`).

### Option B — Python (if installed)

```bash
cd vinayaga-associates
python -m http.server 8080
```

### Option C — VS Code / Cursor Live Server

Open `vinayaga-associates/` and start Live Server on `index.html`.

There is **no build step** and **no production bundler**. Deploy the folder as-is.

## Folder structure

```text
vinayaga-associates/
├── index.html
├── about.html
├── services.html
├── recruitment-process.html
├── job-categories.html
├── industries.html
├── clients.html
├── team.html
├── compliance.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── .htaccess
├── README.md
├── CONTENT-VERIFICATION.md
├── assets/
│   └── images/
│       ├── logo/
│       ├── team/
│       ├── clients/
│       ├── banners/
│       ├── industries/
│       ├── certificates/
│       └── office/
├── css/
│   ├── style.css
│   ├── pages.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── components.js
│   ├── navigation.js
│   ├── animations.js
│   ├── forms.js
│   └── main.js
└── includes/
    ├── header.html
    └── footer.html
```

## Design system

| Token | Value |
| --- | --- |
| Orange | `#FF851B` |
| Navy | `#12345A` |
| White | `#FFFFFF` |
| Light grey | `#F7F8FA` |
| Dark text | `#202938` |

## SEO implementation

- Unique title + meta description on every page
- Canonical URLs using `https://www.vajobs.in/`
- Open Graph + Twitter card tags
- JSON-LD Organization / EmploymentAgency + Breadcrumb / Service where applicable
- Semantic heading hierarchy
- Descriptive image alt text
- `sitemap.xml` and `robots.txt`
- Custom `404.html` + Apache `ErrorDocument` in `.htaccess`

Review `CONTENT-VERIFICATION.md` before indexing claims around licences, clients and experience wording.

## Deployment (cPanel / Apache / static host)

1. Upload the full `vinayaga-associates/` contents to `public_html` (or a subdomain folder).
2. Ensure `includes/`, `css/`, `js/` and `assets/` remain in place relative to the HTML files.
3. Confirm HTTPS and preferred host (`www` vs apex).
4. Submit `https://www.vajobs.in/sitemap.xml` in Google Search Console.
5. Test all 10 routes and the contact form messaging.

## Backend integration requirements

The contact form currently validates on the frontend only and shows a clear demo success state.

To go live, connect it to one of:

- PHP mail endpoint on cPanel
- Form backend (Formspree, Basin, Getform, etc.)
- Custom API that emails `infovajobs@gmail.com` / `ceo@vajobs.in`

Update `js/forms.js` to `fetch()` your endpoint after validation succeeds.

## Content source notes

Primary source of truth: company brochure PDF (20 pages).

Authentic brochure assets were rendered and cropped into `assets/images/`.

Do not invent testimonials, success statistics, WhatsApp numbers, social links, or unverified regulatory claims.

## License / ownership

Website content and brochure-derived assets belong to Vinayaga Associates. This repository packaging is for project delivery and deployment.
