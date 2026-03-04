# GzoneSphere Frontend (v1.0)

Welcome to the **GzoneSphere** frontend codebase. This is a modern, high-performance web application built for gamers, by gamers.

## 🚀 Tech Stack

- **Core:** [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables (Hybrid Design System)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Context API:** Custom providers for Theming, Toast Notifications, and Game State

## 📂 Project Structure

```bash
src/
├── admin/          # Admin dashboards (SuperAdmin & GamesAdmin)
├── assets/         # Static assets (images, svgs)
├── public/
│   ├── components/ # Reusable UI components (Navbar, Footer, Toast, etc.)
│   ├── context/    # React Context providers
│   ├── data/       # Mock data and services
│   └── pages/      # Main application pages
└── styles/         # Global styles and theme definitions
```

## 🛠️ Design System

We use a **Hybrid Design System**:
1. **Plain CSS Variables:** Defined in `src/styles/theme.css`. These handle the "identity" (colors, fonts, etc.).
2. **Tailwind CSS:** Used for layout (flex, grid, padding), responsive utilities, and micro-interactions.
3. **Theming:** Activated by applying `.theme-*` classes to the `<html>` or container elements.

### Key Themes:
- `.theme-esports`
- `.theme-blog`
- `.theme-profile`
- `.theme-gamepost` (with dynamic game-specific overrides)

## 🏗️ Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🛡️ Best Practices

- **Theming:** Use `usePageTheme('variant')` in your page components.
- **Variables:** Always prefer `var(--theme-*)` over hardcoded hex codes.
- **Notifications:** Use `useToast()` instead of native `alert()`.
- **Aliases:** Benefit from Vite aliases like `@components`, `@context`, `@data`, etc.

---

Built with ❤️ by the GzoneSphere Team.