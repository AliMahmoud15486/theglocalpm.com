# MEMORY.md — TheGlocalPM site

> Living log of what's been built and what's next on **TheGlocalPM** (Ali Mahmoud's Senior PM portfolio).
> Update this file whenever a feature ships or a decision changes — it's the handoff doc for future work sessions.

---

## 0. Snapshot

- **Brand:** TheGlocalPM (Ali Mahmoud, Senior Product Manager)
- **Production domain:** **LIVE** at `https://theglocalpm.com/` (HTTPS enforced, Let's Encrypt cert valid through 2026-08-23, auto-renews)
- **Hosting:** GitHub Pages, repo `github.com/AliMahmoud15486/theglocalpm.com` (public), `main` branch / root. Push to `main` deploys in ~30–60s — no CI config files.
- **DNS:** Namecheap BasicDNS — apex A records to `185.199.108-111.153`, `www` CNAME to `alimahmoud15486.github.io.`
- **Local dev:** `python3 -m http.server 8765` from `site/`, opens at `http://localhost:8765/`
- **Tagline:** Build with chaos, lead with logic.
- **Contact email (in schema + mailto):** `ali@theglocalpm.com`
- **Booking:** `https://cal.com/alim-datajar/coffeechat`
- **LinkedIn:** `https://www.linkedin.com/in/alimahmoud1986/`
- **Resume PDF:** `assets/pdfs/Ali_TheGlocalPM_Resume.pdf`
- **GitHub (agents):** `https://github.com/AliMahmoud15486`

---

## 1. Stack

- Vanilla HTML5
- Tailwind CSS — **CDN** (`cdn.tailwindcss.com`); custom theme in `js/tailwind-config.js` (Plus Jakarta Sans, brutalist color palette)
- Vanilla JS — `js/main.js` (header, footer, resume modal, Cal.com embed, mobile menu)
- Cal.com booking — popup embed
- No framework, no build step, no CMS

**Design system:** Neo-brutalist — heavy `#1A1A1A` borders, `neo-shadow` (4px / 8px offset shadows), `tilt-1` rotations, `tilted-underline` headings, hover-untilt micro-interactions.

**Color palette (Tailwind tokens):**
- `coral` `#FF6B35` (primary accent)
- `brand-purple` `#8069BF`
- `accent-yellow` `#ffdf93`
- `accent-rose` `#ffdad6`
- `primary` `#5B6EF5` (blue)
- `primary-fixed` `#dfe0ff` (lavender)
- `secondary-container` `#fe6a34` (orange-red)
- `error-red` `#ba1a1a`
- `surface-cream` `#fdf7ff` (off-white)
- `#1A1A1A` (universal dark)

---

## 2. File layout

```
site/
├── index.html                       # Home
├── case-studies.html                # 3-card case study listing
├── case-study.html                  # GetHalal deep dive (8-section)
├── case-study-everstox.html         # Everstox deep dive (9-section)
├── case-study-flightright.html      # Flightright deep dive (OLD 3-column template — pending rewrite)
├── skills.html                      # 6 PM competencies + The Skills Library (LIVE in navbar since 2026-07-20)
├── skills/                          # Downloadable Claude Skill files (.md) served by The Skills Library
│   ├── prd-writer.md
│   ├── discovery-plan.md
│   └── job-application.md
├── toolkit.html                     # PM toolkit + FAQ
├── point-of-view.html               # Essay index (5 cards, newest-first)
├── blog-post.html                   # ⚠️ deprecated original — no longer linked from point-of-view;
│                                    #    still referenced by index.html, sitemap.xml, llms.txt, llms-full.txt (cleanup pending)
├── blog-pm-llm-wiki.html                           # AI Tooling · July 2026 (7 min) — PM Wiki launch essay
├── blog-evals-pm-quality-gate.html                 # AI Craft · July 2026 — evals as the PM's quality gate
├── blog-qcommerce-subscriptions-vs-discounts.html  # Q-Commerce · May 2026 (9 min)
├── blog-inventory-intelligence.html                # E-Commerce · May 2026 (8 min)
├── blog-future-of-ai-in-pm.html                    # Innovation · May 2026 (6 min)
├── blog-scaling-marketplace-growth.html            # Growth · April 2025 (5 min)
├── blog-building-with-empathy.html                 # Design Thinking · February 2025 (5 min)
├── agent-lab.html                   # 3 AI agents (PM Disco / Travel Agent / PNT)
├── 404.html                         # Custom not-found, noindex
├── sitemap.xml                      # 10 URLs
├── robots.txt                       # 15 AI/answer-engine crawlers allowed
├── llms.txt                         # Short llmstxt.org index for AI crawlers
├── llms-full.txt                    # Long-form AI-readable site doc
├── humans.txt                       # Credits + standards
├── MEMORY.md                        # ← this file
├── css/styles.css                   # Brutalist utilities (shadows, tilts, underlines, grid bg)
├── js/main.js                       # Shared header/footer/modal, Cal.com embed
├── js/tailwind-config.js            # Tailwind CDN theme extension
└── assets/
    ├── case-studies/gethalal-case.png
    ├── blog/                        # Per-post chart assets (one subfolder per post topic)
    │   ├── AI-logitics/             # (reserved for future post)
    │   ├── Inventory-intel/         # inventory_distortion_vs_improvement.png, ai_forecasting_adoption_gap.png
    │   └── subs-habits/             # grocery_promo_pressure_europe_2026.png, qcommerce_subscription_loyalty_signals.png
    ├── favicon/                     # Full favicon set (.ico, .svg, 96px, 180px apple-touch, manifest)
    ├── logos/                       # yassir, datajar, gethalal, fgs, flightright, theglocalpm
    ├── portraits/ali-smiling.png    # 1124x1399 hero portrait
    └── pdfs/Ali_TheGlocalPM_Resume.pdf
```

---

## 3. Done — implementations shipped

### SEO / AEO / GEO foundation
- Per-page `<title>`, meta description, keywords, canonical, robots, theme-color on all 11 pages
- Open Graph (8 props) + Twitter Card (4–5 props) per page
- Full favicon set + `site.webmanifest`
- JSON-LD on every page: `WebSite`, `Person`, `ProfessionalService`, `WebPage`, `CollectionPage`, `Article`, `BlogPosting`, `Blog`, `BreadcrumbList`, `ItemList`, `FAQPage`, `SoftwareApplication`, `DefinedTerm`
- `sitemap.xml` with 10 URLs (excludes 404 + noindex)
- `robots.txt` explicitly allowing: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot, cohere-ai, Meta-ExternalAgent, Meta-ExternalFetcher, DuckAssistBot
- `llms.txt` (short index) + `llms-full.txt` (long-form: bio, page index, FAQs, glossary, citation guidance)
- `humans.txt`
- Custom `404.html` with `noindex` and helpful navigation
- `<noscript>` header + footer fallback on every page (so JS-off crawlers like GPTBot still see the nav + contact links)

### Performance
- `<link rel="preload" as="image" fetchpriority="high">` for the home hero portrait
- `width` / `height` on all home + case-studies images (prevents CLS)
- `loading="lazy"` + `decoding="async"` on below-fold images
- `fetchpriority="high"` on hero images

### Accessibility
- `role="banner" / contentinfo`, `aria-label` on nav blocks
- `aria-current="page"` on active nav link
- `sr-only` label + `autocomplete="email"` on newsletter input
- `aria-disabled="true"` + `role="link"` on the disabled Skills nav item
- Descriptive alt text on images

### Homepage (`index.html`)
- Hero with portrait, "Open My Resume" button (opens modal), "Book a Call" button
- **GEO summary block** — "In Short / Best For / Proof in Numbers" three-card row, citation-ready
- **What I Do** — 6 cards: AI Product Management · Product Strategy & Vision · Emerging Market Products · Product Discovery & User Research · Data & Analytics · 0-to-1 & GTM Execution
- **Proof of Impact** — single GetHalal card (image: `assets/case-studies/gethalal-case.png`) with reduced height (10% smaller from original), CTA "View All Case Studies →"
- **Agent Lab teaser** — 3 cards (PM Disco / Travel Agent / PNT), each with a `Get Agent` link to its GitHub repo (`pm-disco`, `travel-orchestrator`, `Product_nature_tagging`). CTA "View All Agents →"
- **Toolkit teaser** — 3 download cards (Emerging Market PM Playbook · AI Product Discovery Canvas · 0-to-1 Launch Checklist), CTA "View All Tools →"
- **Point of View teaser** — single essay card, CTA "View All Essays →"
- **Office Hours** — Cal.com booking + portrait
- **FAQ** — 5 Q&A `<details>` accordion (matches FAQPage JSON-LD 1:1 for AEO)
- **Newsletter signup** — accessible form (currently fake submit; no backend)

### Case studies
- **`case-studies.html`** — 3 split cards (GetHalal yellow / Everstox pink / Flightright blue), each card 30% smaller after recent resize. JSON-LD ItemList URLs updated to point to the 3 individual deep dives.
- **`case-study.html` (GetHalal)** — 8-section deep dive: Header · Metrics (4) · The Problem · Discovery (3 steps + callout) · Execution (4 phases) · Team Built · Key Learnings · Tags
- **`case-study-everstox.html`** — 9-section deep dive: Header · Metrics (3) · The Challenge (+ warning callout) · Discovery Process (6 steps + highlight callout) · Top Problem Identified · Solution & Delivery (4 phases) · Success KPIs · Key Outcomes · Tags
- **`case-study-flightright.html`** — still using the **older 3-column hero / Problem-Process-Proof / Bento template**. Pending rewrite (see §4)

### Other pages
- **`agent-lab.html`** — 3-card grid, all three cards link to their GitHub repos (PM Disco → `pm-disco`, Travel Agent → `travel-orchestrator`, PNT → `Product_nature_tagging`). JSON-LD `SoftwareApplication` entries each carry a `url` field. Subtitle: "AI agents built to solve real product and operational problems — from discovery to execution"
- **`toolkit.html`** — 3 PDF download cards + **PM Wiki featured section** (open-source, links to `github.com/AliMahmoud15486/pm-llm-wiki` + `blog-pm-llm-wiki.html`) + "Mastering the Art of No" featured PDF + 4-Q FAQ (incl. "What is an LLM wiki for product managers?", mirrored in FAQPage JSON-LD)
- **`skills.html`** — **Skills-Library-only page** (the general "6 PM competencies" showcase + its "What does a Senior PM do?" lede/FAQ were REMOVED 2026-07-23 per Ali — that soft-skills content is out for now, will be rebuilt later). Now: intro reframed around downloadable Claude Skills → **The Skills Library** (3 Toolkit-style bento cards `prd-writer` / `discovery-plan` / `job-application`, each downloading a `.md` from `skills/`, plus a `bg-primary-fixed` "How to use one" install panel showing `~/.claude/skills/<name>/SKILL.md`) → FAQ (3 `<details>`: "How does AI change the PM skill stack?", "What is a Claude Skill…", "Why write your own skills…"). JSON-LD: single `ItemList` (3 × `SoftwareSourceCode`) + FAQPage (3 Q). **Enabled in the navbar 2026-07-20.** Canonical source of the skill files is `TheGlocalPM/SKILLS/<name>/SKILL.md`, copied here flat as `skills/<name>.md`. Requires `.nojekyll` at site root so the `.md` files serve raw (added 2026-07-23 — GitHub Pages/Jekyll was converting them to HTML and 404ing the downloads)
- **`imprint.html`** — legal disclosure / provider identification. Operator is **Ventureland OÜ** (Estonian Osaühing; registry code 17040268; VAT EE102763355; Pärnu mnt 139b, 11317 Tallinn, Estonia; represented by Ali Mahmoud, board member; email ali@theglocalpm.com — phone deliberately NOT published per owner request 2026-07-20). Sections: Service Provider · Represented By · Contact · VAT · Responsible for Content (§ 18 MStV) · Consumer Dispute Resolution (notes EU ODR platform closed 2025-07-20) · Liability & Copyright. Linked from the shared footer (`buildFooter()` in `js/main.js`); in `sitemap.xml` (priority 0.3). Org data mirrored in page JSON-LD (Organization address/vatID/identifier/telephone). English-only. `data-page="imprint"` (no nav highlight)
- **`point-of-view.html`** — 7 essay cards, newest-first, alternating image-left / image-right layouts; per-card category badge + (for non-featured cards) "Month YYYY" date label below the badge; Load More button removed; embedded HTML comment documents the rules for adding new posts (naming, routing, date label, order, alternation, JSON-LD upkeep)
- **Blog system (7 individual essay files)** — each essay lives in its own `blog-[short-kebab-title].html` file with full nav/footer, hero, featured image/chart, article body, author block, and Read Next cards cross-linking the two next-most-recent posts. Per-post JSON-LD includes `BlogPosting` + `BreadcrumbList`; long-form posts add a `citation` array. Posts referencing charts load PNGs from `assets/blog/<topic>/` inside cream-bordered figure containers with italic muted captions
- **`blog-post.html`** — original "Future of AI in PM" essay; **deprecated** (replaced by `blog-future-of-ai-in-pm.html` and no longer linked from `point-of-view.html`). Still referenced by `index.html` teaser, `sitemap.xml`, `llms.txt`, `llms-full.txt` — pending repoint/cleanup

### Header (rendered by `js/main.js`)
- Logo links home
- Nav items: Work / Case Studies / Agent Lab / Skills / The Toolkit / Point of View — all live (the Skills "SOON" pill and its `SOON_PILL` constant were removed 2026-07-20)
- "Book a call" CTA (Cal.com popup)
- Mobile hamburger menu with same items
- `aria-current="page"` on active link

### Footer (rendered by `js/main.js`)
- Newsletter · LinkedIn · Book a call · Contact (mailto:ali@theglocalpm.com) · Resume PDF
- Dynamic copyright year (2024–current)

---

## 4. In progress / planned

### High priority
1. **Rewrite `case-study-flightright.html`** to the 9-section format (matching Everstox structure). Brief needed from owner.
2. **Real images for Everstox + Flightright** case study heroes (currently Unsplash placeholders). Drop into `assets/case-studies/` and swap.
3. **Dedicated 1200×630 OG social card** image (currently OG falls back to the portrait).
4. **Repoint or remove `blog-post.html` references** in `index.html` (Point of View teaser), `sitemap.xml`, `llms.txt`, `llms-full.txt`. The page now duplicates `blog-future-of-ai-in-pm.html`. Either repoint all references to the new file and delete `blog-post.html`, or keep it as a 301 redirect target (no server-side redirects on a static host, so deletion + reference update is cleaner). Also add the 5 new `blog-*.html` URLs to `sitemap.xml`.

### Medium priority
4. **About page** — dedicated trust-builder beyond the home FAQ + Person schema.
5. **Contact page** — currently just `mailto:` and Cal.com.
6. **Privacy + Terms** pages (required if newsletter form ever gets a real backend).
7. **Real testimonials with names + companies** — would unlock `Review`/`AggregateRating` schema.
8. **Tailwind production build** — replace the CDN with compiled CSS (Core Web Vitals win, removes console warning).

### Low priority / housekeeping
9. ~~**Restore Skills page link in navbar**~~ — done 2026-07-20 (Skills Library shipped; nav enabled, SOON pill removed).
10. ~~**`noscript` Skills link** dimming~~ — moot, Skills is live and the noscript links were already correct.
11. **Add more skills to the library** as they're authored. Candidates in `TheGlocalPM/SKILLS/README.md`: `user-story-slicer`, `prioritization`, `competitor-teardown`, `metrics-tree`, `interview-guide`, `feedback-synthesis`, `weekly-review`.
12. **Consider a Skills teaser on `index.html`**, matching the Toolkit / Agent Lab teaser pattern — currently the library is only reachable from the navbar.
13. **Submit `sitemap.xml`** to Google Search Console + Bing Webmaster Tools once live on production domain.

---

## 5. Conventions / decisions

- **Domain**: `https://theglocalpm.com/` (no trailing-slash variants in canonicals)
- **Email in schema + mailto links**: `ali@theglocalpm.com` (was previously `hello@theglocalpm.com` in some places — standardized)
- **Geo**: Remote / global — no city pin in schema or geo meta
- **Language**: English only, `lang="en"`, no hreflang needed
- **Case study URLs**: `case-study.html` is GetHalal (the original URL is preserved for SEO); new cases get suffixes (`case-study-everstox.html`, `case-study-flightright.html`)
- **Blog post URLs**: pattern is `blog-[short-title-in-kebab-case].html` — lowercase, hyphens only, under 5 words, no special characters. Never reuse a generic filename (`blog-post.html` is deprecated for this reason). One HTML file per essay.
- **Blog post chart assets**: one subfolder per post topic under `assets/blog/`. Folder name short and topical (e.g. `Inventory-intel/`, `subs-habits/`). Reference via relative path from the blog HTML, never a CDN.
- **Point of View card rules**: newest post always goes to the top; older cards shift down. Card layout alternates image-left ↔ image-right (`md:flex-row` + `tilt-1-reverse` ↔ `md:flex-row-reverse` + `tilt-1`). Card colors rotate through the accent palette (`bg-secondary-fixed`, `bg-primary-fixed`, `bg-white`, `bg-accent-yellow`, `bg-accent-rose`, …). Every card except the featured/top one shows a `Month YYYY` date label between the category badge and the title (`text-xs text-on-surface-variant opacity-60 font-bold`). Card wrapper `href` AND the "Read Essay →" link must both point to the same unique filename. The full ruleset is also embedded as an HTML comment above the card container in `point-of-view.html` — keep both in sync.
- **Blog post JSON-LD**: each new post requires its own `BlogPosting` + `BreadcrumbList` in `<head>`. The `point-of-view.html` `ItemList` must also be updated: bump `numberOfItems`, add a new `ListItem` at position 1, renumber the rest.
- **Internal-linking pattern**: each case study deep dive has a "Read next" section linking to the other two case studies. Each blog post's "Read Next" links to the two next-most-recent posts (not itself, not the older tail).
- **CTAs below sections**: standard pattern is `mt-12 md:mt-16 text-center` with muted helper line + outlined button. Helper text is `text-on-surface-variant` (dark sections) or `text-white/80` (purple/dark sections)
- **Disabled button style**: `bg-surface-container-high border-outline-variant text-outline opacity-50 cursor-not-allowed` (currently used only for the Skills "SOON" nav pill; PNT used this style until 2026-05-26 when it was activated and switched to a regular `Get Agent` link)
- **Skills Library sync**: the skill files are AUTHORED in `TheGlocalPM/SKILLS/<name>/SKILL.md` (that folder is the source of truth and is what gets symlinked into `~/.claude/skills/`). The site copy is flattened to `site/skills/<name>.md` so the download URL is readable. When a skill changes, re-copy it and update BOTH the card and the `SoftwareSourceCode` entry in the page JSON-LD. Adding a skill = new card (next tilt/color in rotation) + new `ListItem` + bump `numberOfItems` + a line in `llms-full.txt`
- **Schema-content parity**: when visible content changes, also update the matching JSON-LD on the same page (Google penalizes drift)
- **AEO mirror**: every FAQ section on a page has visible `<details>` markup matching the `FAQPage` JSON-LD 1:1

---

## 6. Where to edit common things

| What you want to change | Where |
|---|---|
| Add a nav item | `js/main.js` → `NAV_ITEMS` array |
| Disable a nav item | `js/main.js` → `buildHeader()`, see Skills handling |
| Change footer links / year | `js/main.js` → `buildFooter()` |
| Resume modal contents | `js/main.js` → `buildResumeModal()` |
| Tailwind colors / spacing | `js/tailwind-config.js` |
| Brutalist utility classes (`neo-shadow`, `tilt-1`, `tilted-underline`) | `css/styles.css` |
| Per-page metadata (title, description, OG, JSON-LD) | `<head>` of each page |
| Add a new blog post | (1) duplicate the newest `blog-*.html`, rename to `blog-[kebab-title].html`, replace content + JSON-LD; (2) drop chart PNGs into `assets/blog/<topic>/`; (3) add a card at the TOP of `point-of-view.html` cards container with the next-in-rotation color + opposite layout/tilt; (4) bump `ItemList.numberOfItems` and add a position-1 entry in the JSON-LD; (5) renumber the `<!-- Card N -->` comments; (6) add the new URL to `sitemap.xml`. See the embedded rules comment in `point-of-view.html` for the full checklist. |
| Cross-site facts for AI crawlers | `llms.txt` + `llms-full.txt` (keep in sync) |
| Add a page to the sitemap | `sitemap.xml` |
| Allow / block a crawler | `robots.txt` |

---

## 7. Validation commands

Run the local server first: `cd site && python3 -m http.server 8765`.

```sh
# All pages 200
for p in index case-studies case-study case-study-everstox case-study-flightright skills point-of-view blog-post blog-qcommerce-subscriptions-vs-discounts blog-inventory-intelligence blog-future-of-ai-in-pm blog-scaling-marketplace-growth blog-building-with-empathy toolkit agent-lab 404; do
  curl -s -o /dev/null -w "%{http_code}  $p.html\n" http://localhost:8765/$p.html
done

# JSON-LD parses on every page
for p in index case-studies case-study case-study-everstox case-study-flightright skills point-of-view blog-post blog-qcommerce-subscriptions-vs-discounts blog-inventory-intelligence blog-future-of-ai-in-pm blog-scaling-marketplace-growth blog-building-with-empathy toolkit agent-lab; do
  curl -s http://localhost:8765/$p.html | python3 -c "
import sys, re, json
m = re.search(r'<script type=\"application/ld\\+json\">(.+?)</script>', sys.stdin.read(), re.DOTALL)
data = json.loads(m.group(1))
print(f'{\"$p\":<28} graph={len(data.get(chr(64)+\"graph\", []))}')
"
done

# Sitemap is valid XML
curl -s http://localhost:8765/sitemap.xml | python3 -c "import sys,xml.etree.ElementTree as ET; print('OK', len(ET.fromstring(sys.stdin.read()).findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')), 'URLs')"
```

---

## 8. Owner-input items still pending

These are flagged but require owner action — not codeable autonomously:

- Production deploy + DNS for `theglocalpm.com`
- Real testimonials (with company permission)
- Verified certifications, awards, speaking engagements (only if real)
- Case study images for Everstox + Flightright
- Decision on whether newsletter form should be wired to a real CRM (currently fake submit)

---

*Update (2026-07-23): **Store Data Engine shipped across the site** (case study + Agent Lab entry + essay), sourced from the public `Super-scrap-llm-engine-public` repo (github.com/AliMahmoud15486/Super-scrap-llm-engine-public). New `case-study-store-data-engine.html` (MPB template: Article + BreadcrumbList JSON-LD, 4-metric row 697K/397/~$31/97.1%, Problem → 5-stage pipeline diagram → 4 failure cards → economics table → before/after proof → GitHub + "Book a Store Data Analysis" CTA). New `blog-llm-data-pipeline.html` ("18 Lessons from Enriching 697,000 Products for $31", Data & AI · July 2026, evals-style dark styled-panel hero — no stock image; Read Next → PM Wiki + Evals). `case-studies.html`: new featured card at top (bg-primary-fixed, dark 🕷️ panel on the LEFT to alternate vs MPB's right panel); ItemList fixed to 6 (also added the previously-missing MPB entry, positions renumbered). `agent-lab.html`: 7th card (bg-primary-fixed, tilt-1, badge "Data Pipeline", 🕷️), ItemList → 7. `point-of-view.html`: new top card (bg-secondary-fixed, image-right/tilt-1 to alternate vs PM Wiki's image-left/tilt-1-reverse, July 2026 date label; PM Wiki card got its date label on demotion), Card comments renumbered 1–8, ItemList → 8. `sitemap.xml` → 21 URLs (2 new + lastmod bumps on case-studies/point-of-view/agent-lab); `llms.txt` + `llms-full.txt` updated (new case study + essay entries, Agent Lab lines now mention Super Scrap, glossary six→seven agents). NOT committed or pushed. Known pre-existing issue left untouched: `assets/pdfs/Ali_TheGlocalPM_Resume.pdf` is still referenced site-wide (incl. the two new pages' noscript footers) but the file on disk is `Ali_Mahmoud_Resume.pdf` — part of Ali's in-progress asset swap.*

*Update (2026-07-20): **The Skills Library shipped and Skills went live in the navbar.** Three authored Claude Skills (`prd-writer`, `discovery-plan`, `job-application`) copied from `TheGlocalPM/SKILLS/` into new `site/skills/` and surfaced on `skills.html` as a Toolkit-style bento section below the existing 6 competency cards (non-destructive — the original competency content, its keywords, and its FAQ were all preserved). Added: install panel with the `~/.claude/skills/<name>/SKILL.md` path, 2 new FAQ entries, and 1 restored FAQ entry that had been schema-only since launch (FAQ parity was 3 schema / 2 visible — now 5 / 5). Second `ItemList` (3 × `SoftwareSourceCode`) added to JSON-LD. `js/main.js`: the `skills` special-case removed from both `buildHeader()` renderers and the now-unused `SOON_PILL` constant deleted — Skills renders as a normal nav link. Title/description/OG/Twitter broadened to cover both halves of the page. `sitemap.xml` lastmod bumped; `llms.txt` + `llms-full.txt` updated. Verified locally: all pages 200, all JSON-LD parses, 3 `.md` files serve, FAQ 1:1 parity restored. **Not yet committed or pushed** — working tree also still holds the older in-progress logo/resume asset swap (`assets/logos/logo.png`, `assets/pdfs/Ali_Mahmoud_Resume.pdf` untracked; old filenames deleted but still referenced in footer/schema), so a commit here needs care not to sweep that in half-done.*

*Update (2026-07-03): **PM Wiki (pm-llm-wiki) added across the site**, timed with the LinkedIn launch post — rebased on top of another session's 2026-07-01 push (evals essay `blog-evals-pm-quality-gate.html`, MPB case study, Agent Lab additions; those are NOT yet fully reflected in the older sections of this file). New essay `blog-pm-llm-wiki.html` (AI Tooling · July 2026 · 7 min, Unsplash library hero, JSON-LD BlogPosting + BreadcrumbList with Karpathy gist + repo citations, Read Next → evals + q-commerce). `point-of-view.html`: PM Wiki prepended as featured Card 1 (bg-primary-fixed, image-left), evals demoted to Card 2 with a July 2026 date label, existing cards otherwise untouched, ItemList bumped to 7. `toolkit.html`: PM Wiki featured section (bg-primary-fixed, GitHub CTA + essay link), lede/meta updated to four resources, ItemList numberOfItems=4 with a SoftwareSourceCode entry, 4th FAQ Q&A added (visible + JSON-LD). `index.html`: full-width PM Wiki banner card added under the Toolkit teaser grid; Point of View teaser repointed from the evals essay to the new (newer) essay. `sitemap.xml` → 18 URLs. `llms.txt` + `llms-full.txt` updated (essay entry, toolkit description, new FAQ, PM Wiki glossary term). Working tree also holds Ali's in-progress logo/resume asset swap (stashed during the rebase, restored after; old asset filenames still referenced in footer/schema — pending).*

*Last meaningful update (2026-05-26): **site shipped to production**. GitHub repo `AliMahmoud15486/theglocalpm.com` created public, Pages enabled on `main`/`/`, custom domain `theglocalpm.com` wired via Namecheap DNS (apex A records + www CNAME), Let's Encrypt cert provisioned, HTTPS enforced. Pre-launch the SEO/AEO/GEO audit was executed end-to-end: sitemap rewritten from 10 → 15 URLs with image extensions, `blog-post.html` deprecated (noindex + canonical to `blog-future-of-ai-in-pm.html`), `llms.txt` + `llms-full.txt` brought up to date with all 5 new essays and Freight Intel, `SearchAction` added to home WebSite schema, GitHub URL added to `Person.sameAs`, `wordCount` + `timeRequired` added to all 4 case-study Article schemas, `og:image` swapped to topical heroes on the 3 split blog files. Post-launch hotfix (commit `7c73680`): activated Product Nature Tagging (PNT) — both Agent Lab CTAs (home + `agent-lab.html`) now link to `github.com/AliMahmoud15486/Product_nature_tagging`; JSON-LD `SoftwareApplication` for PNT gained the `url` field and lost "Coming soon"; `llms.txt` + `llms-full.txt` references updated. Pending post-launch tasks: Google Search Console TXT verification on the apex + sitemap submission, Bing Webmaster Tools, Rich Results Test sweep, dedicated 1200×630 OG card image (still uses Unsplash placeholders on most pages), Twitter `twitter:site`/`twitter:creator` handles (deferred — no confirmed handle yet).*
