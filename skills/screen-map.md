---
name: screen-map
description: Build a clickable Screen Map of a product as a published HTML artifact — every screen as a card grouped by area, the main user path, MVP / later / staff status, the reusable layouts behind the screens, and (optionally) the project's design language — styled in that project's own design system. Use it for every product the user asks Claude to design or define. Trigger with "screen map", "how many screens", "show me the screens", "map the product", "illustrate the product", "visualise the app", "sitemap of the product", or whenever a product/app/tool is being designed or scoped and the user hasn't seen its screens yet.
version: 1.1.0
author: Ali Mahmoud (https://theglocalpm.com)
---

# Screen Map

A one-page, clickable picture of a whole product: **what screens exist, how a user moves through them, which
ones are in the MVP, and which few layouts they're built from.** Clicking any screen also shows a **complete,
copyable design prompt** for that screen, ready to paste into an AI design tool.

By Ali Mahmoud (TheGlocalPM), https://theglocalpm.com. Free to use and adapt.

- `template.html`: the engine. Fill only the `CONFIG` object and the design tokens. Don't rewrite the engine.
- `README.md`: a human guide to the skill and the `CONFIG` fields.

## When to use it

- The user asks to design, define, scope or plan a product, app, tool or module, **once the feature list exists**.
  Offer it (or build it if they have asked for visuals) before or right after the full feature spec.
- The user asks "how many screens?", "show me", "illustrate", "visualise".
- The screen set changed materially (new module, MVP decided): **update the existing map at the same URL**,
  don't create a new one.

## Process

1. **Find the source of truth.** Read the project's own docs: feature/module spec, design prompt, decisions
   log, CLAUDE.md. Every screen must trace to a spec section. Never invent features to fill the map; if the
   spec implies a screen that isn't written down (settings, login), include it and say so in its description.
2. **List the screens.** One card = one screen a user actually lands on. A panel inside another screen is
   not a screen (mention it in that screen's description instead). Typical 1-screen items that get
   forgotten: sign-up/login, onboarding, notifications, settings (users, billing, integrations), staff/admin.
3. **Group into areas** the way a user thinks about the product (not how the code is organised). 6–12
   areas. Give the second-language name (e.g., Arabic) when the product is bilingual.
4. **Find the layouts.** Assign every screen one of 5–9 reusable layouts (table, record page, step editor,
   wizard, feed, dashboard, decision cards, canvas…). Draw each as a tiny 120×80 SVG wireframe using CSS
   variables only. This is the strongest insight on the page: "60 screens, but only 8 things to build well".
5. **Status.** Use the project's real MVP decision if one exists. If not, mark "MVP candidate" per the
   recommended option and **say in the intro that it is a proposal**. Staff/admin screens get their own status.
6. **The main path.** 3–6 phases, each a short ordered list of screen names (must match card names exactly;
   the engine shows a red "Missing" lozenge if one doesn't).
7. **Style it with the project's design system.** Precedence: the user's words → the project's existing design
   system (tokens file, Design System artifact, design prompt) → a proposed one. Change token *values* in all
   three theme blocks (light, dark media query, `[data-theme="dark"]`), and swap the Google Fonts link. If
   no design system exists, propose one and fill `CONFIG.designLanguage` (colour roles, type specimen in
   every script the product uses, signature components, and a "what we borrow from global design systems"
   table: Carbon, Atlassian, Polaris, Lightning, Material 3, Linear, GOV.UK, etc. — principles only, never
   their branding). If a design system already exists, set `designLanguage: null` or show only a short
   reference.
8. **Write a design prompt for every screen (required).** Fill `CONFIG.brief` once and `CONFIG.specs` for
   **every** screen (the engine falls back to the one-line description, which is not good enough):
   - `brief.context`: what the product is, for whom, its core rule, the feeling it must give.
   - `brief.system`: the design language written out concretely (light + dark hex values by role, fonts and
     scale, spacing, radius, signature components, copy tone). Same source as step 7.
   - `brief.shell` / `brief.shellStaff`: sidebar items and top bar, and how the staff area differs.
   - `brief.rules`: realistic *fictional* sample data from the product's world (never lorem, never real
     people/companies presented as real), accessibility, language/RTL rules.
   - `layouts[k].pattern`: full layout guidance (what goes where), reused by every screen of that layout.
   - `specs[screen name]`: `who` uses it, `el` = every element on the screen with realistic sample data and
     the exact button labels, `states` specific to that screen, `m` (needs a 390px mobile layout), `rtl`
     (needs an RTL version).
   Check that every card name has a spec (a quick script comparing names vs spec keys), and read one full
   generated prompt end to end before publishing.
9. **Save and publish.** Save as `<project>/design/screen-map.html`, publish it with the Artifact tool if
   this environment has one (`icon: "map"`, one-sentence description) and give the user the link; otherwise
   give the user the file path to open in a browser. On later changes republish the same file
   path (same URL). Before publishing, obey the Artifact page contract (title ≤ 4 words: "<Project> Screen Map").
10. **Record it.** Put the URL and the counts (screens / areas / layouts / MVP) in the project's memory or
   state file so the next session can find and update it.

## Rules

- **Plain English** in every description: what the user *does* on the screen, one sentence.
- **Counts are computed** by the engine from the data: never hard-code numbers in the intro that the data
  can contradict. If the intro mentions counts, check them against the rendered page.
- Keep the engine's accessibility: real buttons, visible focus, `prefers-reduced-motion`, works at 400px.
- Amber/attention colour only for "a human must act"; staff colour only for operator screens.
- Private by default: remind the user the page must be shared from its Share menu before others can open it.
