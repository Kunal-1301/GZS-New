# CSS Architecture & Styling Guide

GzoneSphere utilizes a **Hybrid Styling Approach** combining the utility-first power of **Tailwind CSS v4** with the themeability of **Vanilla CSS Variables**.

## 1. Core Principles

- **Layout & Spacing:** Handled exclusively by Tailwind CSS (`flex`, `grid`, `p-4`, `m-2`, `w-full`, etc.).
- **Colors, Typography, & Identity:** Handled by CSS Variables defined in `src/styles/theme.css` and applied via custom Tailwind classes (if configured) or direct style mappings.
- **Component Targeting:** We avoid deep nesting or complex SCSS. We rely on clear, descriptive class names when utilities are insufficient.

---

## 2. Directory Structure

All global styling logic resides in `src/styles/`:

```bash
src/styles/
├── theme.css            # The Master Theme definitions (Root variables)
├── index.css            # (or main.css) Tailwind directives and base setups
├── variables/           # Breakdowns of specific variables if needed
│   ├── colors.css       
│   ├── typography.css
│   └── spacing.css
└── modules/             # Standardized, non-Tailwind specific animations or generic utilities
    └── animations.css
```

---

## 3. The Theming System

The most critical aspect of the CSS architecture is the Page Theme System. The website dynamically switches color palettes and layouts based on the active section (e.g., Esports vs. Blog vs. Profile).

### A. How it Works
We apply a specific CSS class (e.g., `.theme-esports`) to the parent container of the page wrapper. This class redefines the core CSS variables.

**Example from `theme.css`:**

```css
/* Base / Default Theme */
:root {
  --color-primary: #1D4ED8; /* Default Blue */
  --color-background: #0F172A; /* Dark Slate */
  --color-text: #F8FAFC;
}

/* Esports Theme Override */
.theme-esports {
  --color-primary: #DC2626; /* Aggressive Red */
  --color-background: #000000; /* Pitch Black */
}

/* Profile Theme Override */
.theme-profile {
  --color-primary: #10B981; /* Success Green */
  /* Keeps default background */
}
```

### B. Usage in React Components
Whenever you create a new component, you must consume the CSS Variables. **Do not hardcode hex values.**

```jsx
// Bad (Hardcoded Tailwind)
<button className="bg-red-600 text-white rounded">Submit</button>

// Good (Using CSS Variables)
<button 
  className="rounded px-4 py-2" 
  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}
>
  Submit
</button>
```
*Note: We can also configure `tailwind.config.js` to map `bg-primary` directly to `var(--color-primary)` for cleaner utility usage.*

---

## 4. UI Components and AI Ready Placeholders

When building new UI components (especially those that will eventually host AI-generated content), use standard Tailwind rounded borders and subtle background opacities to denote interactive areas.

- **AI Highlight Color:** Reserve a specific variable (e.g., `--color-ai-accent`) for components that are driven by AI, so users immediately recognize algorithmic output vs human curation.
