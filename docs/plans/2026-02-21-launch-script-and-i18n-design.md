# Launch Script + i18n (English/Spanish) Design

**Date:** 2026-02-21
**Status:** Approved

## Feature 1: Launch Script

### Problem
`npm start` runs `next start` which is for server-rendered Next.js apps. This site uses `output: 'export'` (static HTML). Need a single command that builds, serves locally, and tunnels through ngrok.

### Solution
- `launch.sh` script: builds the site, serves the `out/` directory on port 3000, starts ngrok tunnel
- New npm script: `"serve": "bash launch.sh"`
- User needs to claim a free static ngrok domain first

### Files
- `launch.sh` (new)
- `package.json` (modify — add serve script)

## Feature 2: i18n (English + Spanish)

### Problem
Targeting Spanish-speaking business owners in the area. Site is English-only. Google Translate popup is a poor experience.

### Solution
Client-side i18n with React Context. Auto-detect browser language, store preference in localStorage, set `<html lang="">` dynamically.

### Architecture
- `lib/i18n/translations/en.ts` — all English text extracted from components
- `lib/i18n/translations/es.ts` — Spanish translations
- `lib/i18n/LanguageContext.tsx` — React Context provider with detection + persistence
- `lib/i18n/useTranslation.ts` — hook returning `t('key.path')` function

### Language Toggle
- `EN | ES` switcher in Navbar (desktop: before CTA, mobile: in mobile menu)

### Components Modified
- `layout.tsx` — dynamic lang attribute via context
- `Navbar.tsx` — translated links + language toggle
- `Hero.tsx` — headlines, descriptions, before/after labels
- `TrustBar.tsx` — industry labels, tagline
- `Services.tsx` — section heading, 9 service titles/descriptions
- `Demo.tsx` — section heading, 5 demo tabs with titles/descriptions/features
- `HowItWorks.tsx` — section heading, 3 steps with bullets
- `Support.tsx` — heading, stats, testimonial
- `CaseStudy.tsx` — section heading, 10 case studies
- `Contact.tsx` — form labels, placeholders, options, messages
- `Footer.tsx` — links, copyright text

### What stays the same
- URLs/routes (single page)
- Component structure and animations
- Styling and design
- Formspree integration
