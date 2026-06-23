# Handoff: Simon Parker — Engineer Portfolio (3 pages)

## Overview
A personal portfolio site for Simon Parker — a Systems & Cloud / MSP support engineer
based in Melbourne, AU. Three pages: **Home** (hero + certifications + connect), **About**
(background + career timeline), and **Projects** (AWS builds + homelab). Dark, editorial,
terminal-influenced aesthetic aimed at hiring managers and engineers.

## About the Design Files
The files in `designs/` are **design references created in HTML** — prototypes that show the
intended look, layout, copy and behavior. They are **not** production code to copy verbatim.
Each `*.dc.html` references a `support.js` runtime that is **only** the prototyping harness —
ignore it; it is not part of the real site.

Your task is to **recreate these designs in the target repo's existing environment** (e.g.
Next.js/React, Astro, plain Vite, etc.) using its established conventions, component patterns,
and styling approach. If the repo has no front-end yet, pick the most appropriate framework for
a small static portfolio (Astro or Next.js static export are both good fits) and implement there.
Convert the inline-styled HTML into the repo's idiom (CSS modules, Tailwind, styled-components —
whatever the repo already uses). Keep the design tokens below exact.

## Fidelity
**High-fidelity.** Colors, typography, spacing and layout are final — reproduce them precisely.
The values in this README are the source of truth; the HTML files are the visual reference.

## Theme note
The prototype was explored in three color variants — **Obsidian** (warm brown/sand, the
canonical/selected direction documented here), **Void** (cool/neutral dark), and **Warm**.
Only the **Obsidian** theme is bundled in `designs/`. Build the site so the palette is centralized
(CSS variables / theme tokens) — that's how the variants were produced and makes future reskins trivial.

---

## Design Tokens

### Colors (Obsidian theme)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#16120B` | Page background (near-black warm brown) |
| `--surface` | `#1E1810` | Card / panel background |
| `--surface-2` | `#241D13` | Nested item background (connect links) |
| `--text` | `#F0E7D7` | Primary body text |
| `--text-bright` | `#F4ECDD` | Headings |
| `--text-muted` | `#CDBFA6` / `#D8CCB4` | Secondary paragraph text |
| `--text-dim` | `#9E927C` | Tertiary / de-emphasized text |
| `--text-faint` | `#8A7B62` | Mono labels, nav inactive, captions |
| `--text-soft` | `#B8A98F` | Mono brand text, tag text |
| `--accent-sand` | `#DDC29A` | Primary accent (eyebrows, numbers, dots glow) |
| `--accent-bronze` | `#BC9163` | Borders/markers, accent rules, card top-borders |
| `--accent-teal` | `#4A8B7F` | Primary button fill |
| `--accent-teal-bright` | `#6FB3A6` | Links, icon strokes, teal button text |
| `--border` | `rgba(221,194,154,0.14)` | Hairline dividers (also `0.16` for cards) |
| `--border-strong` | `rgba(221,194,154,0.18)` | Tag/pill borders |
| `--accent-wash` | `rgba(188,145,99,0.08)` | Tinted footer/callout fills |
| selection | `rgba(221,194,154,0.26)` | `::selection` highlight |

### Typography
- **Display / UI:** `Archivo` (Google Fonts), weights 400–900. Headings 700–800,
  letter-spacing `-0.02em` to `-0.035em`. Body 400, 17–19px, line-height ~1.6–1.65.
- **Mono / labels:** `IBM Plex Mono`, weights 400–500. Used for eyebrows, section numbers,
  captions, tags, status lines. Uppercase eyebrows use `letter-spacing: 0.1em–0.22em`.
- Type scale seen: H1 `80px/0.96` (home) & `60px/1.0` (subpages); H2 `28px`; H3 `18–22px`;
  body `17–19px`; mono labels `10–13px`.

### Spacing / layout
- Content max-width: **1240px**, horizontal padding **44px**, centered.
- Section vertical rhythm: ~44–64px padding, separated by 1px `--border` top rules.
- Card padding: 24–32px. Card radius: **6px**. Button/tag/logo radius: **3px**.
- Featured cards carry a **2px `--accent-bronze` top border**; the "current" timeline card uses
  a 1.5px bronze border + `box-shadow: 0 0 0 4px rgba(188,145,99,0.10)`.
- Glowing status dot: `box-shadow: 0 0 8px rgba(221,194,154,0.7)`.

---

## Screens / Views

### 1. Home (`designs/Home.dc.html`)
- **Nav** (shared, all pages): left = `SP` logo box (34px, 1.5px bronze border) + `simon parker`
  mono wordmark; right = Home / About / Projects links (active = `--text`, inactive = `--text-faint`)
  + `Melbourne, AU` mono tag with left divider. 22px×44px padding, bottom hairline.
- **Hero**: two-column grid `1fr / 380px`, 64px gap.
  - Left: bronze eyebrow rule + mono eyebrow "Cloud & Infrastructure Engineer"; H1 `Simon Parker`
    (80px, two lines); a mono "pharmacy → helpdesk → systems & cloud" path line (arrows in bronze);
    two paragraphs (primary + dim); CTA row pinned to bottom — teal-filled **View Projects**,
    outlined teal **About Me**.
  - Right: **Connect card** — `--surface` panel, 2px bronze top border. "CONNECT" mono label, then
    three link rows (LinkedIn, GitHub, Email) each = icon + mono label + value, `--surface-2` bg.
    Footer strip: glowing sand dot + "Open to cloud & platform roles · Melbourne, AEST".
- **Certifications (section 01)**: header row — mono `01` + H2 "Certifications" on the left,
  "13 credentials · 1 in progress" mono on the right. 4-column grid; each column = a bronze-dot
  category header (AWS / Microsoft & Azure / Security & Linux / Foundations & Automation) over a
  vertical list of credentials (name + mono code/level). The **in-progress** item (AWS SysOps
  `SOA-C02`) is dimmed with a sand status code.
- **Footer** (shared): `© 2026 Simon Parker` / `Melbourne · AEST`, mono, hairline top.

### 2. About (`designs/About.dc.html`)
- **Header**: bronze eyebrow rule + "About"; H1 "Background & direction" (60px).
- **Intro + traits**: `1fr / 380px` grid. Left = two paragraphs (note inline sand-highlighted
  keywords like "Linux"). Right = **traits panel** styled like a terminal: `$ simon --traits`
  prompt over key/value mono rows (curiosity → high, learning → continuous, etc.; sand values for
  the last two), with a "Current focus: AWS SysOps Administrator — in progress" footer strip.
- **Career path (section 02)**: a horizontal 3-node track (line + dots; the 3rd "present" node is a
  larger sand dot with a glow ring) above three **role cards** (Pharmacist 2017–2024 / Customer &
  Technical Support 2025 / Helpdesk Support Technician 2026–Present). Each card = mono date +
  uppercase category pill, H3 role title, description. The current card is highlighted (bronze border + shadow).
- **Footer**: `© 2026 Simon Parker` + "View projects →" teal link.

### 3. Projects (`designs/Projects.dc.html`)
- **Header**: `1fr / 480px` grid — left eyebrow "Selected work" + H1 "Cloud & infrastructure";
  right intro paragraph.
- **Featured AWS builds (section 01)**: 3-column grid of cards (2px bronze top border): AWS 3-Tier
  Platform, AWS Image Pipeline, ECS Fargate Golden Path. Each = bronze-dot mono category, H3 title,
  description, a row of mono tag chips (3px border), "View on GitHub →" teal link.
- **More builds & the lab (section 02)**: 3-column grid of smaller cards (Event-Driven Pipeline,
  SSM Fleet + Puppet, Pilot-Light DR) with mono category, H3, description, tag chips.
- **Homelab panel** (full-width card): `300px / 1fr` grid. Left = "Beelink SER8 Proxmox Hypervisor"
  with mono specs (Ryzen 7 8845HS, 32 GB DDR5 · 1 TB NVMe, 6 VMs) + tag chips. Right (bordered-left
  column) = numbered list of 5 VMs (Domain Controller, Samba file server, Vault PKI, OPNsense+WireGuard,
  Prometheus+Grafana).
- **Footer**: `© 2026 Simon Parker` + "github.com/Simodalstix →" teal link.

## Interactions & Behavior
- Mostly static. **Nav links** route between the three pages. CTAs route Home→Projects / Home→About.
- **External links** (`target="_blank" rel="noopener noreferrer"`): LinkedIn `in/simonparker-dev`,
  GitHub `github.com/Simodalstix`, email `mailto:lastpolar@gmail.com`.
- Suggested (not in prototype): subtle card hover (border brighten to `0.16`→`0.28`, or 1px lift).
  Add per the repo's interaction conventions; keep it restrained.
- Responsive: the prototype is desktop-width (1240px). For the real build, collapse the 4-col cert
  grid → 2 → 1, the 3-col card grids → 1, and the two-column hero/homelab → stacked, at standard
  breakpoints.

## State Management
None required — static content. All data (certs, roles, projects, homelab VMs) is hardcoded.
Recommend extracting it into typed data arrays/JSON so the lists render via map and stay editable.

## Assets
- **Fonts:** Archivo + IBM Plex Mono via Google Fonts (already linked in the HTML `<head>`).
- **Icons:** inline SVGs for LinkedIn, GitHub, and a mail glyph (in `Home.dc.html`). Reuse the repo's
  icon system if it has one; otherwise these inline paths are fine to lift.
- No raster images or logos beyond the `SP` text mark.

## Files
- `designs/Home.dc.html` — Home page reference
- `designs/About.dc.html` — About page reference
- `designs/Projects.dc.html` — Projects page reference
- `designs/support.js` — prototyping runtime only; **ignore / do not port**

> Open any `designs/*.dc.html` in a browser to view the intended result.
