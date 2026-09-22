# Magnifier Brand Assets Reference

Source: Google Drive folder **Version 1.0 (08/23/2025)**.

This file is an implementation reference for the website. It records the current brand-system sources and the asset categories available for later use.

## Typography

Authoritative source: `2. Typography (Fonts here) / 0. Please Read This (Fonts Use) / 082325_Typography slide (how to use fonts).pdf`.

### Oregon LDO

Brand guidance:
- subtitles
- key messages
- emphasis
- Regular and Bold

Website mapping:
- display/headline family
- CSS/Tailwind token: `--font-display`
- local files are stored in `src/assets/fonts/`

### Century Gothic

Brand guidance:
- body text
- captions
- longer content
- Regular, Italic, Bold, Bold Italic

Website mapping:
- primary body/interface family
- CSS/Tailwind token: `--font-sans`
- local files are stored in `src/assets/fonts/`

## Colour system

Authoritative source: `3. Color System / 0. Please Read This (Color Codes) / 082325_Color Palette (with Color Codes).pdf`.

### Main taupe family

- `#a29990`
- `#c6c0ba`
- `#726e68`

The source identifies the taupe family as the main Magnifier brand colour family.

### Light grey family

- `#efefef`
- `#e5e5e5`
- `#d3d3d3`

Used as the refined neutral companion/background family.

### Dark family

- `#232323`
- `#4c4c4c`
- `#333333`

Used for depth, contrast, clarity and dark compositions.

### Premium green family

- `#5b6d57`
- `#8c9686`
- `#343d33`

The source reserves muted green for premium/high-end applications.

Website mapping:
- semantic light/dark tokens live in `src/styles/tokens.css`
- main accent = taupe
- premium green has dedicated `premium` tokens for selective use
- placeholder/material tones now use only brand colours

## Asset inventory

### 1. MD Logo Files

Available variants:
- full logo — icon + text
- icon-only
- full solid logo icon
- square social-media variants
- text-only / iconless logo

Available formats include SVG, PDF, JPEG and PNG depending on the variant.

Colour combinations include:
- black
- light grey
- taupe
- taupe on light grey
- light grey on taupe
- light grey on black
- light grey on premium green
- black on white

Prefer SVG for website usage.

### 2. Typography

Contains:
- Century Gothic font files
- Oregon LDO font files
- typography usage PDF

### 3. Color System

Contains the palette/code reference PDF used for website tokens.

### 4. Business Card Design

Contains:
- combined print-ready business-card PDF
- individual left/right aligned card variants
- lighter and complete versions

Useful as a reference for spacing, hierarchy and colour balance.

### 5. Graphic Patterns

Contains:
- individual/seamless component source
- regular black/white patterns
- logo-repeat pattern
- premium-green pattern variants
- transparent pattern variant

These are potential future background/detail assets; they should be used selectively rather than as default page decoration.

### 6. Custom Icons

A matching icon set is available in:
- black
- taupe
- white

Subjects include:
- architectural
- commercial
- completion
- consultation
- design development
- implementation
- interior property
- presentation
- renovation
- rulers
- share
- sofa/interior design
- thanks
- trade show

These can later replace generic UI symbols where the subject matches.

### 7. Letterhead & Envelope Design

Contains:
- letterhead PDFs and InDesign sources
- DL envelope designs
- greeting-envelope designs

Useful as a reference for editorial spacing and stationery composition.

### 8. Social Media Templates

Contains:
- background-image post templates
- vertical-image post templates
- example posts
- Instagram Highlights icons
- editable PSD/mockup sources

### 9. LinkedIn and Pinterest Banners

Contains:
- three LinkedIn cover directions
- two Pinterest cover directions
- mockups / use-ready JPEGs

### 10. Email Signature Design

Contains:
- light and dark versions
- single-phone variants
- PSD source
- later `09/12/25` logo-signature update

Use the later update when a conflict exists with the original August files.

### 11. Brand Guidelines Book (WIP)

Folder currently contains no files.

### 12. Presentation Template (WIP)

Folder currently contains no files.

### 13. Original Illustrator File

Contains the original Illustrator source combining:
- logo
- business card
- colours
- envelopes

Treat as a master editable source rather than a direct website asset.

### 14. InDesign Book Layout

Contains:
- InDesign source
- PDF export

Useful later as an editorial/layout reference.

## Current website implementation

- Geist has been removed.
- Century Gothic is loaded locally for body/interface copy.
- Oregon LDO is loaded locally for headings/display copy.
- The palette in `src/styles/tokens.css` is sourced only from the Version 1.0 colour system.
- Existing light/dark semantic tokens remain stable so sections do not need individual colour rewrites.
- The premium-green family is available as a separate semantic colour and should remain an intentional accent rather than a default site-wide colour.
