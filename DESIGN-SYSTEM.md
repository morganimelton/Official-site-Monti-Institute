# Monti Institute Global Design System

## Purpose
This file is the source of truth for rebuilding the Monti Institute of Neuro Aesthetics website from scratch. The current website may be used only for approved clinical/provider content. Do not copy its layout, visual structure, or information architecture.

Before building individual pages, use the global tokens, shell, and reusable components already defined in:

- `css/variables.css`
- `css/global.css`
- `css/components.css`
- `css/pages.css`
- `js/navigation.js`
- `js/accordion.js`
- `js/carousel.js`
- `js/animations.js`

## Brand Feeling
Monti should feel like modern medical editorial design: premium, physician-led, clinical, calm, sophisticated, and highly professional.

Never:
- generic med spa
- hospital template
- wellness retreat
- AI-generated template
- overly feminine beauty brand
- flashy luxury
- excessive metallic gold
- excessive rounded cards
- icon-heavy layouts
- fake booking or insurance functionality

## Color System
Core palette:

- Deep Monti navy: `#071a33`
- Midnight navy: `#020b16`
- Soft navy: `#123052`
- Warm cream: `#f4efe5`
- Ivory: `#fffdf8`
- Soft white: `#ffffff`
- Restrained warm gold: `#c7a15a`
- Body text charcoal/navy: `#17212f`
- Muted text: `#64707f`
- Fine divider: `#ded6c8`

Dark sections should use layered navy gradients, not large flat navy blocks. Gold is used sparingly for small rules, labels, borders, arrows, and accents.

## Typography
Major headings use an elegant classical/editorial serif inspired by the Monti wordmark. Body copy, navigation, buttons, clinical information, forms, labels, and utility text use a clean modern sans-serif.

Type should feel professional and restrained. Use fluid `clamp()` sizing, but do not scale fonts directly with viewport width alone.

## Layout
Use editorial composition, generous whitespace, photography, thin dividers, and asymmetry where appropriate. Avoid decorative blobs, pills, floating UI, excessive shadows, and generic med-spa card grids.

Global layout rules:

- Maximum content width: `1280px`
- Reading width: `760px`
- Small radius: `4px`
- Large radius: `8px`
- Desktop sections are spacious.
- Mobile sections are substantially more compact.
- Images use controlled aspect ratios and `object-fit: cover`.
- Desktop image heights must not become full-screen-height mobile images.

## Responsive Standards
Every component needs deliberate desktop, tablet, and mobile behavior.

Test target widths:

- `1440px`
- `1024px`
- `768px`
- `430px`
- `390px`
- `375px`

Primary breakpoints are tokenized in CSS comments and media queries:

- Desktop: default
- Small desktop/tablet: `1100px`
- Tablet: `900px`
- Mobile: `680px`
- Narrow mobile: `430px`
- Small mobile: `390px`

## Navigation Architecture
Main navigation:

- Care
- About
- Providers
- The Experience
- Memberships
- Patient Resources
- Request Appointment

Care contains:

- Neurology & Migraine
- Aesthetic Medicine / Aesthetics & Injectables
- Skin & Laser
- Body & Hair Reduction
- Infusions & Wellness

The appointment destination is not confirmed. Use `TODO: confirm Monti booking destination` until the correct Boulevard destination is supplied.

## Business Rules
Do not show individual treatment prices on the main website.

Memberships and packages should be strongly supported throughout the site once finalized.

Do not create fake insurance-verification functionality. Insurance CTAs should lead to an internal Insurance & Billing information page once that page is created.

## Information Architecture
Do not create a separate page for every individual treatment. Major care pages should contain most treatment information directly. Use expandable treatment rows or accordions where appropriate. Create dedicated treatment pages only when explicitly requested later.

## Reusable Component Inventory
Already established:

- Header
- Desktop navigation
- Care dropdown
- Mobile navigation
- Footer
- Primary CTA
- Secondary CTA
- Editorial section heading
- Navy gradient section
- Care/category tile
- Treatment accordion
- Provider card
- Horizontal provider carousel with arrows and swipe support
- Insurance information band
- Process/steps section
- Membership CTA section
- Responsive image component
- Responsive video/moving-image placeholder component
- Page context/breadcrumb component

Keep these components reusable. Do not duplicate styling page-by-page.

## Photography And Media
Temporary Monti interior mock images may be used as placeholders until real photography is supplied. Build image and media components so real assets can replace placeholders without layout changes.

Future video will mainly use short, silent, slow panning clips. Media containers must support either an image or muted looping video later.

## Future Page Build Order
After this system is approved:

1. Homepage visual benchmark
2. About
3. Providers
4. The Experience
5. Memberships
6. Patient Resources
7. Major care pages

Do not create dedicated treatment pages unless explicitly requested.
