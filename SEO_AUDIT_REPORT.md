# SEO, AEO, and Geo Audit Report
**Project:** Fix-It Build-It Colorado LLC

## 1. Current State: What We Are Doing Well

### A. Technical SEO
- **Next.js Metadata API:** Properly utilized in `app/layout.tsx` to set global titles, descriptions, OpenGraph tags, and canonical URLs.
- **Per-Page Metadata:** Key pages (`/about`, `/funding`, `/packages`, etc.) have specific titles and descriptions exported to ensure unique SERP snippets.
- **Robots.txt:** Correctly configured (`app/robots.ts`) to allow crawling of the main site while blocking private routes like `/api/` and `/admin/`.
- **Performance/Core Web Vitals:** Font preloading is active. Cloudflare Pages edge deployment ensures fast global delivery.

### B. Geo (Local SEO)
- **LocalBusiness Schema:** `app/layout.tsx` includes `HomeAndConstructionBusiness` structured data.
- **Service Areas Explicitly Defined:** `areaServed` property correctly targets "Denver Metro Area", "Arvada", "Lakewood", "Aurora", "Centennial", etc., which is excellent for local map pack rankings.
- **VCard Schema:** `app/vcard/layout.tsx` implements robust local schema specifically for the digital business card, including a `PostalAddress`.

### C. AEO (Answer Engine Optimization)
- **Entities Context:** The schema includes the `knowsAbout` property with highly specific entities ("Environmental Accessibility Adaptations", "Winnie Dunn Sensory Framework", "Specialty Code 677"). This gives AI Answer Engines (ChatGPT, Perplexity, Gemini) deep context about your specialized domain.

---

## 2. Gaps & Opportunities: What We Need to Do to Hit 100%

### High Priority (Critical Fixes)
1. **Sitemap is Missing Core Pages:** `app/sitemap.ts` currently only lists the homepage, `/vcard`, and legal policies. It is entirely missing the highest-value conversion and content pages: `/about`, `/services`, `/sensory-wizard`, `/funding`, `/packages`, and `/unmet-needs`. Search engines might not index these properly.
2. **Main Schema Missing Address (NAP):** The global schema in `app/layout.tsx` has `areaServed` but lacks a direct `address` (`PostalAddress`). Consistent NAP (Name, Address, Phone) is a top ranking factor for Geo Local SEO. (Google Rich Results test usually throws a warning if `address` or `priceRange` is missing).

### Medium Priority (AEO & Social Enhancements)
3. **Missing FAQ Schema (AEO Boost):** Answer Engines thrive on Q&A formats. Pages like `/funding` and `/unmet-needs` answer complex questions. Adding `FAQPage` JSON-LD schema to these will dramatically increase chances of appearing as AI overviews or rich snippets.
4. **Twitter Cards & Advanced OG:** We have basic OpenGraph, but are missing Twitter Card metadata (`twitter:card` set to `summary_large_image`) in `app/layout.tsx`.
5. **Generic Image Alt Text:** Images in `HeroSection.tsx` use a hardcoded generic alt text (`alt="Project by Fix-It Build-It..."`). Better AEO and Image SEO requires descriptive alt text.

### Low Priority
6. **Canonical Tags on Subpages:** `app/layout.tsx` hardcodes the canonical to `/`. Next.js 14+ usually handles this automatically if metadataBase is set, but it's worth verifying that subpages don't accidentally declare their canonical as the homepage.

---

## 3. Recommended Action Plan

To get the repository to a 100% optimized state, we should implement the following steps:

1. **Update Sitemap:** Add `/about`, `/services`, `/sensory-wizard`, `/funding`, `/packages`, and `/unmet-needs` to `app/sitemap.ts`.
2. **Enhance Global Schema:** Inject the `address` from `vcardData` into the `HomeAndConstructionBusiness` schema in `app/layout.tsx`.
3. **Add Social Meta Tags:** Add Twitter card metadata to `app/layout.tsx`.
4. **Fix Canonical tags:** Remove hardcoded canonical tags from layout file.
5. **Implement FAQ Schema:** Create a reusable `FAQSchema` component and inject relevant Q&A structured data into `/funding` and `/unmet-needs`.