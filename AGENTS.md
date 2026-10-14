# Monti Institute Website Agent Guide

This file is the permanent project instruction guide for future Codex sessions working on the Monti Institute website. Read it before making changes, especially small text, image, link, or layout updates.

## 1. Project Overview

- Website: Monti Institute of Neuro Aesthetics
- Live domain: <https://www.monti-institute.com/>
- Repository remote: `git@github.com:morganimelton/Official-site-Monti-Institute.git`
- Current branch: `main`
- Custom domain file: `CNAME` contains `monti-institute.com`
- Site type: static HTML/CSS/JavaScript site. There is no package manager, build step, or framework config in the repository.
- Practice focus: medical practice combining neurology, migraine care, aesthetic medicine, skin and laser treatments, body and hair reduction, infusion therapy, wellness, and restorative care.
- Design direction: premium, professional, elegant, welcoming, medically credible, editorial, and calm.

## 2. Brand Identity

### Color Tokens

Use the existing CSS variables from `css/variables.css`. Do not invent nearby color values.

- `--monti-navy: #071a33`
- `--monti-midnight: #020b16`
- `--monti-navy-soft: #123052`
- `--monti-navy-mist: #e7ebef`
- `--monti-gold: #c7a15a`
- `--monti-gold-soft: #e1c990`
- `--monti-cream: #f4efe5`
- `--monti-ivory: #fffdf8`
- `--monti-white: #ffffff`
- `--monti-line: #ded6c8`
- `--monti-line-dark: rgba(255, 255, 255, 0.16)`
- `--monti-text: #17212f`
- `--monti-muted: #64707f`
- `--monti-text-on-dark: #f8f4ec`
- `--monti-charcoal: #24303d`

### Gradients

The site uses layered navy gradients and restrained gold accents:

```css
--gradient-navy:
  radial-gradient(circle at 18% 0%, rgba(199, 161, 90, 0.13), transparent 34%),
  linear-gradient(135deg, var(--monti-navy), var(--monti-midnight) 74%);

--gradient-navy-soft:
  linear-gradient(145deg, rgba(7, 26, 51, 0.96), rgba(18, 48, 82, 0.92)),
  radial-gradient(circle at 82% 12%, rgba(199, 161, 90, 0.11), transparent 32%);
```

Header and button gradients also live in `css/components.css`. Preserve the navy header, cream-to-navy logo background treatment, gold appointment button, and thin navy construction notice unless explicitly asked to change them.

### Typography

Typography tokens from `css/variables.css`:

- Heading font: `Georgia, "Times New Roman", serif`
- Body/UI font: `Inter, Avenir, "Avenir Next", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Global heading styles are in `css/global.css`:

- `h1`, `h2`, `h3`, `h4` use the heading font, navy color, weight `500`, and `letter-spacing: 0`.
- Body copy uses the body font, `16px`, `line-height: 1.62`, and `--monti-text`.
- Eyebrow labels use gold, uppercase, small sans-serif type with wide letter spacing.

### Spacing, Layout, Radius, Motion

Core layout tokens:

- `--container-width: 1280px`
- `--reading-width: 760px`
- `--narrow-width: 620px`
- `--gutter: clamp(20px, 4vw, 56px)`
- `--header-height: 84px` desktop, `72px` mobile
- `--space-2xs: 6px`
- `--space-xs: 10px`
- `--space-sm: 16px`
- `--space-md: 24px`
- `--space-lg: 36px`
- `--space-xl: 56px`
- `--space-2xl: 84px`
- `--section-space: clamp(84px, 8vw, 124px)`
- `--section-space-compact: clamp(58px, 6vw, 82px)`
- `--radius-sm: 4px`
- `--radius-md: 8px`
- `--shadow-soft: 0 18px 48px rgba(7, 26, 51, 0.1)`
- `--focus-ring: 0 0 0 3px rgba(199, 161, 90, 0.38)`
- `--transition-fast: 160ms ease`
- `--transition-base: 220ms ease`

Responsive breakpoints are implemented directly in CSS. Common breakpoints include `1280px`, `1100px`, `1024px`, `767px`, `680px`, `430px`, and `390px`.

### Design Patterns

- The visual system is navy, cream, ivory, white, and restrained gold.
- Use real Monti photography from `assets/images/`; do not replace real business photography with stock images, placeholders, or generated images unless explicitly instructed.
- Page sections alternate warm cream/ivory surfaces, navy editorial breaks, and photo-led layouts.
- Images generally use controlled aspect ratios and `object-fit: cover`.
- Cards use small radii (`4px` to `8px`) and subtle borders. Avoid excessive shadows or rounded-pill styling.
- Accordions use `.treatment-row`, `.treatment-row__trigger`, `.treatment-row__panel`, and `js/accordion.js`.
- Reveals use the `.reveal` class and `js/animations.js`.
- Horizontal carousels use `[data-carousel]`, `.provider-track`, and `js/carousel.js`.

### Header, Navigation, and Footer

Shared header/footer markup is duplicated in every HTML file rather than templated. A header change usually requires updating every page.

Primary nav:

- Care
- About
- Providers
- Memberships
- Patient Resources
- Request Appointment

Care dropdown links:

- `neurology-migraine.html`
- `aesthetics.html`
- `skin-laser.html`
- `body-hair.html`
- `infusions-wellness.html`

Header behavior:

- Fixed header using `.site-header`.
- Temporary construction notice is created by `js/announcement.js`.
- Mobile menu behavior is controlled by `js/navigation.js`.
- Desktop Care dropdown is controlled by CSS plus `js/navigation.js`.

Footer:

- Shared footer appears on all pages.
- Footer includes care links, site links, patient resources/insurance links, request appointment link, and contact/location text.
- The footer currently lists `2440 Vassar Street, Suite 3, Reno, NV 89502`; `patient-resources.html` visit details and map link use `89503`. Do not “fix” either value unless specifically instructed.

## 3. Website Structure

### Global Files

- `css/variables.css`: design tokens.
- `css/global.css`: reset/base type, containers, section color utilities, focus styles, global responsive type.
- `css/components.css`: header, nav, Care dropdown, mobile nav, buttons, text links, care tiles, accordions, provider cards/carousel, media frames, insurance/member bands, process grid, footer, reveal animations, responsive shared components.
- `css/pages.css`: homepage and shared page-level/homepage sections.
- `js/site.js`: module entry importing `announcement.js`, `navigation.js`, `accordion.js`, `carousel.js`, and `animations.js`.
- `js/announcement.js`: temporary construction notice.
- `js/navigation.js`: fixed header scroll state, desktop Care dropdown, mobile nav open/close.
- `js/accordion.js`: treatment accordion behavior.
- `js/carousel.js`: horizontal carousel buttons, drag, keyboard arrow support.
- `js/animations.js`: IntersectionObserver reveal animations.
- `js/about-gallery.js`: About page drag-scroll gallery and lightbox.

### Pages

- `index.html`
  - Purpose: homepage.
  - CSS: `css/pages.css`.
  - Sections: hero, navy brand statement, “Comprehensive care. Thoughtfully delivered.” care showcase, difference section, memberships feature, Monti Experience feature, provider carousel, final CTA.
  - Notes: homepage provider “View Profile” links point to provider anchors on `providers.html`.

- `about.html`
  - Purpose: About Monti Institute, founder story, interior gallery.
  - CSS: `css/pages.css`, `css/about.css`.
  - JS: `js/site.js`, `js/about-gallery.js?v=inside-monti`.
  - Sections: exterior-photo hero, philosophy, founder, “Inside the Institute” gallery, lightbox, navy final CTA.
  - Gallery uses real Monti photography and must remain curated/editorial.

- `providers.html`
  - Purpose: provider profiles and credentials.
  - CSS: `css/pages.css`, `css/providers.css`.
  - Sections: editorial hero with provider portrait collage, provider directory, final CTA.
  - Provider section anchors:
    - `#provider-ryan-monti`
    - `#provider-zack-ballingham`
    - `#provider-sean-kump`
    - `#provider-morgan-melton`
    - `#provider-megan-phares`
    - `#provider-addison-jensen`
    - `#provider-ty-petty`
    - `#provider-sydney-stansell`
    - `#provider-paul-leason`
  - Do not invent or modify provider credentials/bios unless explicitly asked.

- `care.html`
  - Purpose: overview hub for care categories.
  - CSS: `css/pages.css`, `css/care.css`.
  - Sections: care hero and care category tiles linking to major service pages.

- `memberships.html`
  - Purpose: membership options, benefits, comparison, final membership CTA.
  - CSS: `css/pages.css`, `css/memberships.css`.
  - Sections: hero, membership cards, benefit detail panels, comparison grid, final CTA.
  - Do not invent prices, discounts, benefits, included services, or membership wording.

- `patient-resources.html`
  - Purpose: visit planning, appointments, insurance/payment, forms, FAQs, contact.
  - CSS: `css/pages.css`, `css/patient-resources.css`.
  - Sections: resources intro/jump links, visit section, appointment strip, insurance/payment, forms, FAQ accordion, contact strip.
  - Contains contact links, map directions, and Cherry financing link.
  - Do not invent insurance coverage or payment policies.

- `neurology-migraine.html`
  - Purpose: neurology and migraine care.
  - CSS: `css/pages.css`, `css/neurology.css`.
  - Sections: editorial hero, migraine management accordion, photo break, insurance/access navy section, acute migraine relief section, final CTA.
  - Do not rewrite medical/service information unless explicitly instructed.

- `aesthetics.html`
  - Purpose: Aesthetics & Injectables service page.
  - CSS: `css/pages.css`, `css/aesthetics.css`.
  - Sections: split/editorial hero, “Designed around you” treatment accordion, “Beauty, backed by medicine” navy/photo section, final CTA.

- `skin-laser.html`
  - Purpose: Skin & Laser service page.
  - CSS: `css/pages.css`, `css/skin-laser.css`.
  - Sections: hero, skin assessment/NuNAV/DermaSensor, technology accordion, support section, final CTA.

- `body-hair.html`
  - Purpose: Body treatments and laser hair reduction.
  - CSS: `css/pages.css`, `css/body-hair.css`.
  - Sections: hero, body treatments, hair reduction treatment areas, planning section, final CTA.

- `infusions-wellness.html`
  - Purpose: infusion therapy, wellness support, injections, massage/restorative care.
  - CSS: `css/pages.css`, `css/infusions-wellness.css`.
  - Sections: IV-room hero, infusion therapy grid and neurological infusion panel, targeted support, massage therapy, final CTA.

### Assets

- Logos:
  - `assets/logo/monti-institute-logo.png`
  - `assets/logo/monti-symbol-transparent.png`
  - `assets/img/official-logo.png`
- Provider portraits:
  - `assets/images/provider-*.png`
- Real Monti environment/service photography:
  - `assets/images/about-gallery-*.jpg`
  - `assets/images/home-*.png`
  - `assets/images/monti-*.png`
  - service-specific images such as `aesthetics-hero-real.png`, `skin-laser-hero-real.png`, `infusions-hero-iv-room.png`, `neurology-migraine-hero.png`.

Keep filenames and relative paths case-sensitive for GitHub Pages.

## 4. Important Website Links

Preserve existing functional links unless explicitly instructed otherwise.

### External Links

- Appointment booking: `https://www.joinblvd.com/b/monti-institute-of-neuro-aesthetics/widget#/visit-type`
  - Used across all pages.
- Membership booking: `https://www.joinblvd.com/b/monti-institute-of-neuro-aesthetics/widget#/cart/menu/Other%20Memberships`
  - Used on `memberships.html`.
- Google Maps directions: `https://www.google.com/maps/dir/?api=1&destination=2440%20Vassar%20Street%20Suite%203%2C%20Reno%2C%20NV%2089503`
  - Used on `patient-resources.html`.
- Phone: `tel:+13213766684`
  - Used on `patient-resources.html`.
- Email: `mailto:admin@monti-institute.com`
  - Used on `patient-resources.html`.
- Cherry financing: `https://pay.withcherry.com/monti-institute-of-neuro-aesthetics?utm_source=practice&utm_medium=email&m=92417`
  - Used on `patient-resources.html`.

### Common Internal Links

- Home: `index.html`
- Care hub: `care.html`
- About: `about.html`
- Providers: `providers.html`
- Memberships: `memberships.html`
- Patient Resources: `patient-resources.html`
- Insurance & Billing anchor: `patient-resources.html#insurance`
- Service pages:
  - `neurology-migraine.html`
  - `aesthetics.html`
  - `skin-laser.html`
  - `body-hair.html`
  - `infusions-wellness.html`

## 5. Rules for Future Updates

- Make only the changes explicitly requested.
- Never redesign unrelated sections.
- Preserve existing layouts, images, colors, typography, animations, spacing, links, and responsive behavior unless instructed otherwise.
- Never replace real Monti photography with stock images, placeholders, generated images, or unrelated assets.
- Never invent medical information, provider credentials, prices, membership benefits, insurance coverage, addresses, phone numbers, or policies.
- When changing text, search for duplicate references across the relevant page and across the whole site when appropriate.
- Preserve desktop, tablet, and mobile responsiveness.
- Do not modify unrelated pages or components.
- Do not remove existing functionality, ARIA attributes, accordions, carousels, lightboxes, nav behavior, form/link behavior, or external links unless explicitly requested.
- When editing shared header/footer/navigation, remember the markup is duplicated in every HTML page.
- When editing CSS, prefer existing variables and component patterns.
- When adding images, place them in the existing `assets/images/` or appropriate existing asset folder and use relative paths that work on GitHub Pages.
- Use `object-fit: cover` and intentional `object-position` for cropped photography.
- Keep dark overlays strong enough for readable white text, but do not bury real photography unless explicitly requested.
- For anchor targets below the fixed header, use CSS `scroll-margin-top` rather than JavaScript offsets.
- After completing a task, state which files changed and what was verified.

## 6. Deployment

This appears to be a static GitHub Pages deployment:

- Git remote: `git@github.com:morganimelton/Official-site-Monti-Institute.git`
- Branch configured for local work: `main`
- Custom domain file: `CNAME` with `monti-institute.com`
- Live domain provided for the site: <https://www.monti-institute.com/>
- No build configuration (`package.json`, bundler config, or CI workflow) is present in the repository.

Correct update process:

1. Make the requested edits locally.
2. Preview locally using the existing static server pattern when needed.
3. Verify affected desktop and mobile layouts.
4. Review `git diff` to ensure only intended files changed.
5. Commit the changes.
6. Push to `origin main` or open a PR, depending on the user's workflow preference.
7. GitHub Pages should serve the static files from the repository using the existing custom domain configuration.

Never change hosting, repository, branch, DNS, `CNAME`, custom domain settings, or GitHub Pages settings unless the user explicitly instructs you to do so.

## 7. Verification Checklist

For small text/link updates:

- Search the page for all duplicate references.
- Search the whole site if the term appears in shared content or navigation.
- Verify no unrelated files changed.

For visual updates:

- Check at least desktop and mobile widths.
- Confirm text does not overlap or hide under the fixed header.
- Confirm images remain intentional and not awkwardly cropped.
- Confirm no horizontal overflow.

For shared component updates:

- Check all HTML pages that include the component.
- Pay special attention to header, mobile nav, footer, Care dropdown, and appointment links.

