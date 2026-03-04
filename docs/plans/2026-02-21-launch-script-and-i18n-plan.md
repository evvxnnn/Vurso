# Launch Script + i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add auto-detecting English/Spanish translation to the TW Solutions site, plus a one-command launch script with ngrok.

**Architecture:** Client-side i18n using React Context + custom hook. All translatable text extracted into per-locale TypeScript objects. Browser language detected on first visit, stored in localStorage. Language toggle in Navbar. Launch script orchestrates `serve` + `ngrok` in one command.

**Tech Stack:** React Context, TypeScript, Next.js static export, ngrok CLI, `serve` (npx)

**Note:** This project has no test framework. Verification is done via `next build` (TypeScript compilation) and `next dev` (visual check). Adding a test framework for a marketing site would be over-engineering.

---

### Task 1: Create English translations file

**Files:**
- Create: `lib/i18n/translations/en.ts`

**Step 1: Create directory structure**

```bash
mkdir -p lib/i18n/translations
```

**Step 2: Create `lib/i18n/translations/en.ts`**

Extract ALL text from every component into a structured object. Keys organized by component name. This file is the single source of truth for all English text.

The object must cover: nav, hero, trustBar, services, demo, howItWorks, support, caseStudy, contact, footer.

**Step 3: Verify file compiles**

```bash
npx tsc --noEmit lib/i18n/translations/en.ts 2>&1 || echo "Check for TS errors"
```

**Step 4: Commit**

```bash
git add lib/i18n/translations/en.ts
git commit -m "feat: add English translations file with all site text"
```

---

### Task 2: Create Spanish translations file

**Files:**
- Create: `lib/i18n/translations/es.ts`

**Step 1: Create `lib/i18n/translations/es.ts`**

Must have the EXACT same structure and keys as `en.ts`. Every key in `en.ts` must have a corresponding key in `es.ts`. Translate all text to natural, professional Spanish appropriate for local business owners.

Key translation notes:
- "Custom Software. Real Support." → "Software a Medida. Soporte Real."
- "Free Assessment" → "Evaluacion Gratuita"
- Keep brand name "TW Solutions" untranslated
- Keep dollar amounts and numbers as-is
- Keep phone numbers, emails, addresses as-is
- Translate form labels and placeholders

**Step 2: Verify file compiles and matches structure**

```bash
npx tsc --noEmit lib/i18n/translations/es.ts 2>&1 || echo "Check for TS errors"
```

**Step 3: Commit**

```bash
git add lib/i18n/translations/es.ts
git commit -m "feat: add Spanish translations file"
```

---

### Task 3: Create translation type and index

**Files:**
- Create: `lib/i18n/translations/index.ts`

**Step 1: Create `lib/i18n/translations/index.ts`**

Export a `Translations` type derived from `en.ts` (using `typeof`), plus a `translations` map keyed by locale string (`'en' | 'es'`).

```typescript
import en from './en'
import es from './es'

export type Translations = typeof en
export type Locale = 'en' | 'es'

export const translations: Record<Locale, Translations> = { en, es }
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'es']
```

**Step 2: Commit**

```bash
git add lib/i18n/translations/index.ts
git commit -m "feat: add translation types and locale index"
```

---

### Task 4: Create LanguageContext provider

**Files:**
- Create: `lib/i18n/LanguageContext.tsx`

**Step 1: Create `lib/i18n/LanguageContext.tsx`**

React Context provider that:
1. On mount, checks `localStorage` for saved locale preference
2. If none saved, detects `navigator.language` (check for `es` prefix)
3. Falls back to `'en'`
4. Provides `locale`, `setLocale`, and `t` function via context
5. When locale changes: updates `localStorage`, updates `document.documentElement.lang`
6. The `t` function takes a dot-path key string and returns the translated string by walking the translations object

Must be a `'use client'` component.

**Step 2: Verify build**

```bash
cd "/home/evxn/big test/TWS" && npx next build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add lib/i18n/LanguageContext.tsx
git commit -m "feat: add language context provider with auto-detection"
```

---

### Task 5: Create useTranslation hook

**Files:**
- Create: `lib/i18n/useTranslation.ts`

**Step 1: Create `lib/i18n/useTranslation.ts`**

Simple hook that calls `useContext(LanguageContext)` and returns `{ t, locale, setLocale }`. Throws if used outside provider.

```typescript
'use client'
import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider')
  }
  return context
}
```

**Step 2: Commit**

```bash
git add lib/i18n/useTranslation.ts
git commit -m "feat: add useTranslation hook"
```

---

### Task 6: Wire up LanguageProvider in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Modify `app/layout.tsx`**

- Import `LanguageProvider` from `@/lib/i18n/LanguageContext`
- Wrap `{children}` with `<LanguageProvider>`
- Remove the static `lang="en"` from `<html>` tag (the provider sets it dynamically)
- Make this a client component layout OR create a separate client wrapper component

**Important:** Since `layout.tsx` currently exports `metadata` (server-only), we need to either:
- (a) Create a `ClientLayout.tsx` wrapper that is `'use client'` and contains the provider, OR
- (b) Move metadata to a `generateMetadata` approach

**Recommended:** Create `components/ClientLayout.tsx` as a `'use client'` component that wraps children in `<LanguageProvider>` and handles the dynamic `lang` attribute. Keep `layout.tsx` as a server component for metadata.

**Step 2: Verify build**

```bash
cd "/home/evxn/big test/TWS" && npx next build 2>&1 | tail -10
```

**Step 3: Commit**

```bash
git add app/layout.tsx components/ClientLayout.tsx
git commit -m "feat: wire up LanguageProvider in app layout"
```

---

### Task 7: Add language toggle to Navbar

**Files:**
- Modify: `components/Navbar.tsx`

**Step 1: Update Navbar.tsx**

- Import `useTranslation` from `@/lib/i18n/useTranslation`
- Replace hardcoded `navLinks` labels with `t('nav.services')`, `t('nav.howItWorks')`, etc.
- Replace "Free Assessment" CTA text with `t('nav.cta')`
- Add language toggle button between desktop nav links and CTA:
  - Style: small pill with `EN | ES`, active language highlighted in accent-blue
  - onClick: calls `setLocale('en')` or `setLocale('es')`
- Add language toggle in mobile menu too (above the CTA button)

**Toggle design:**
```tsx
<div className="flex items-center bg-light-gray dark:bg-slate-800 rounded-full p-1">
  <button
    onClick={() => setLocale('en')}
    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
      locale === 'en' ? 'bg-accent-blue text-white' : 'text-dark-gray'
    }`}
  >EN</button>
  <button
    onClick={() => setLocale('es')}
    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
      locale === 'es' ? 'bg-accent-blue text-white' : 'text-dark-gray'
    }`}
  >ES</button>
</div>
```

**Step 2: Verify build + visual check**

```bash
cd "/home/evxn/big test/TWS" && npx next build 2>&1 | tail -5
```

Then run `npm run dev` and verify the toggle appears and switches languages.

**Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add language toggle to Navbar with translated links"
```

---

### Task 8: Update Hero component

**Files:**
- Modify: `components/Hero.tsx`

**Step 1: Update Hero.tsx**

- Import `useTranslation`
- Replace all hardcoded text with `t()` calls:
  - "Custom Software." → `t('hero.title')`
  - "Real Support." → `t('hero.titleAccent')`
  - "We replace your expensive SaaS stack..." → `t('hero.subtitle')`
  - "See How It Works" → `t('hero.ctaSecondary')`
  - "Get a Free Assessment" → `t('hero.ctaPrimary')`
  - "Before" / "After" labels → `t('hero.before')` / `t('hero.after')`
  - All SaaS tool names, prices, and summary text
  - "TW Solutions", "One Custom System", "Save ~$300/month" etc.

**Step 2: Verify build**

**Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: translate Hero component"
```

---

### Task 9: Update TrustBar component

**Files:**
- Modify: `components/TrustBar.tsx`

**Step 1: Update TrustBar.tsx**

- Import `useTranslation`
- Replace "Trusted by local businesses across industries" → `t('trustBar.tagline')`
- Replace industry names with `t('trustBar.industries.localRetail')`, etc.

**Step 2: Commit**

```bash
git add components/TrustBar.tsx
git commit -m "feat: translate TrustBar component"
```

---

### Task 10: Update Services component

**Files:**
- Modify: `components/Services.tsx`

**Step 1: Update Services.tsx**

- Import `useTranslation`
- Replace "What We Do" heading → `t('services.heading')`
- Replace subtitle → `t('services.subtitle')`
- Replace "Swipe to navigate" → `t('services.swipe')`
- Services array: move into the component body (or use useMemo) so `t()` is available. Map each service's `title` and `description` through translation keys like `t('services.items.customSoftware.title')` and `t('services.items.customSoftware.description')`

**Step 2: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: translate Services component"
```

---

### Task 11: Update Demo component

**Files:**
- Modify: `components/Demo.tsx`

**Step 1: Update Demo.tsx**

- Import `useTranslation`
- Replace section heading "See It In Action" → `t('demo.heading')`
- Replace subtitle → `t('demo.subtitle')`
- Each demo tab: translate label, title, subtitle, description, features array, placeholder text
- "Screenshot coming soon" → `t('demo.screenshotComingSoon')`
- "Visit the live store" → `t('demo.liveStoreLink')`
- "Ember & Wick..." → `t('demo.liveStoreDescription')`
- "Swipe to navigate" → `t('demo.swipe')`

**Step 2: Commit**

```bash
git add components/Demo.tsx
git commit -m "feat: translate Demo component"
```

---

### Task 12: Update HowItWorks component

**Files:**
- Modify: `components/HowItWorks.tsx`

**Step 1: Update HowItWorks.tsx**

- Import `useTranslation`
- Heading "How It Works" → `t('howItWorks.heading')`
- Subtitle → `t('howItWorks.subtitle')`
- Each step: translate title, description, and bullet points

**Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: translate HowItWorks component"
```

---

### Task 13: Update Support component

**Files:**
- Modify: `components/Support.tsx`

**Step 1: Update Support.tsx**

- Import `useTranslation`
- Heading → `t('support.heading')` and `t('support.headingAccent')`
- Description paragraph → `t('support.description')`
- Testimonial text and attribution → `t('support.testimonial')` and `t('support.testimonialAuthor')`
- Stats: translate values and labels (e.g., "Average Response Time" → `t('support.stats.responseTime.label')`)

**Step 2: Commit**

```bash
git add components/Support.tsx
git commit -m "feat: translate Support component"
```

---

### Task 14: Update CaseStudy component

**Files:**
- Modify: `components/CaseStudy.tsx`

**Step 1: Update CaseStudy.tsx**

- Import `useTranslation`
- Heading "Real Results" → `t('caseStudy.heading')`
- Subtitle → `t('caseStudy.subtitle')`
- "Before" / "After" labels → `t('caseStudy.before')` / `t('caseStudy.after')`
- "Swipe to navigate" → `t('caseStudy.swipe')`
- Each case study: translate title, before, after, savings, description

**Step 2: Commit**

```bash
git add components/CaseStudy.tsx
git commit -m "feat: translate CaseStudy component"
```

---

### Task 15: Update Contact component

**Files:**
- Modify: `components/Contact.tsx`

**Step 1: Update Contact.tsx**

- Import `useTranslation`
- Heading → `t('contact.heading')` + `t('contact.headingAccent')`
- Description → `t('contact.description')`
- Contact info labels: "Call us directly", "Email us", "Based in"
- Form labels: "Your Name *", "Business Name", "Email Address *", "Phone Number *"
- Placeholders: "John Smith", "Your Business LLC", etc.
- Advanced toggle text
- Select option labels
- Success message: "Message Sent!" and "We'll get back to you within 24 hours."
- Button text: "Send Message" / "Sending..."

**Step 2: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: translate Contact component"
```

---

### Task 16: Update Footer component

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Update Footer.tsx**

- Import `useTranslation`
- Brand description → `t('footer.description')`
- "Services" heading → `t('footer.servicesHeading')`
- Service link labels → `t('footer.services.customSoftware')`, etc.
- "Company" heading → `t('footer.companyHeading')`
- Company link labels
- "Get In Touch" heading → `t('footer.contactHeading')`
- Copyright text → `t('footer.copyright')`
- "Privacy Policy" / "Terms of Service"

**Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: translate Footer component"
```

---

### Task 17: Create launch script

**Files:**
- Create: `launch.sh`
- Modify: `package.json`

**Step 1: Create `launch.sh`**

```bash
#!/bin/bash
# TW Solutions — Build, Serve, and Tunnel

set -e

echo "Building site..."
npm run build

echo "Starting local server on port 3000..."
npx serve out -p 3000 &
SERVER_PID=$!

echo "Starting ngrok tunnel..."
# Replace YOUR_DOMAIN with your static ngrok domain
~/.local/bin/ngrok http 3000 --domain=YOUR_DOMAIN &
NGROK_PID=$!

echo ""
echo "Site is live!"
echo "Local:  http://localhost:3000"
echo "Public: https://YOUR_DOMAIN"
echo ""
echo "Press Ctrl+C to stop."

trap "kill $SERVER_PID $NGROK_PID 2>/dev/null; exit" INT TERM
wait
```

**Step 2: Make executable**

```bash
chmod +x launch.sh
```

**Step 3: Add npm script to `package.json`**

Add to scripts: `"serve": "bash launch.sh"`

**Step 4: Commit**

```bash
git add launch.sh package.json
git commit -m "feat: add launch script with serve + ngrok"
```

---

### Task 18: Final build verification

**Step 1: Full build**

```bash
cd "/home/evxn/big test/TWS" && npx next build 2>&1
```

Must complete with zero errors.

**Step 2: Dev server visual check**

```bash
npm run dev
```

Verify:
- Language toggle appears in Navbar (desktop and mobile)
- Clicking ES switches all text to Spanish
- Clicking EN switches back
- Page reload remembers preference (localStorage)
- Opening in browser set to Spanish auto-detects
- `<html lang="...">` attribute updates correctly
- No Google Translate popup appears

**Step 3: Final commit if any fixes needed**

---

## Ngrok Static Domain Setup (Manual Step)

Before using the launch script, the user needs to:
1. Go to https://dashboard.ngrok.com/domains
2. Click "Create Domain" (one free static domain per account)
3. Copy the domain (e.g., `something.ngrok-free.app`)
4. Replace `YOUR_DOMAIN` in `launch.sh` with the actual domain
