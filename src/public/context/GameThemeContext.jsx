import { createContext, useContext, useEffect } from "react";

/**
 * GameThemeContext
 * ─────────────────
 * Provides per-game color theming by writing CSS custom properties
 * directly to document.documentElement so all game post sections
 * can consume them via var(--gp-*) without prop drilling.
 *
 * The theme object shape:
 * {
 *   primary:      hex string   (main accent, e.g. "#e53935")
 *   primaryDark:  hex string   (darker shade e.g. "#c62828")
 *   primaryLight: hex string   (lighter shade e.g. "#ef5350")
 *   bgPage:       hex string   (page background e.g. "#fff5f5")
 *   bgSection:    hex string   (section bg e.g. "#ffebee")
 *   border:       hex string   (border color e.g. "#ffcdd2")
 *   textHeading:  hex string   (heading text e.g. "#c62828")
 * }
 *
 * When backend is wired up, these values come from the admin hero
 * image color picker stored in the game_posts table.
 */

const GameThemeContext = createContext(null);

export function GameThemeProvider({ theme, children }) {
    useEffect(() => {
        if (!theme) return;

        const root = document.documentElement;

        // Map theme object keys to CSS variable names
        const vars = {
            "--gp-primary": theme.primary,
            "--gp-primary-dark": theme.primaryDark || shadeColor(theme.primary, -20),
            "--gp-primary-light": theme.primaryLight || shadeColor(theme.primary, 20),
            "--gp-primary-alpha": hexToAlpha(theme.primary, 0.12),
            "--gp-bg-page": theme.bgPage || lighten(theme.primary, 0.95),
            "--gp-bg-section": theme.bgSection || lighten(theme.primary, 0.90),
            "--gp-bg-card": "#ffffff",
            "--gp-bg-card-alt": lighten(theme.primary, 0.97),
            "--gp-border": theme.border || lighten(theme.primary, 0.80),
            "--gp-border-strong": lighten(theme.primary, 0.65),
            "--gp-text-heading": theme.textHeading || shadeColor(theme.primary, -20),
            "--gp-text-body": "#1f2937",
            "--gp-text-muted": "#6b7280",
            "--gp-text-on-accent": "#ffffff",
            "--gp-tag-bg": hexToAlpha(theme.primary, 0.10),
            "--gp-tag-border": theme.primary,
            "--gp-tag-text": theme.primary,
            "--gp-table-header": theme.primary,
            "--gp-table-text": "#ffffff",
            "--gp-btn-bg": theme.primary,
            "--gp-btn-hover": shadeColor(theme.primary, -20),
            "--gp-btn-outline-border": theme.primary,
            "--gp-btn-outline-text": theme.primary,
            "--gp-btn-outline-hover-bg": theme.primary,
            "--gp-quote-bg": theme.primary,
            "--gp-icon-circle-bg": lighten(theme.primary, 0.90),
            "--gp-icon-circle-fg": theme.primary,
            "--gp-cta-gradient": `linear-gradient(135deg, ${theme.primary} 0%, ${shadeColor(theme.primary, -20)} 100%)`,
            "--gp-hero-overlay": "rgba(0, 0, 0, 0.60)",
            "--gp-accent-bar": `3px solid ${theme.primary}`,
        };

        Object.entries(vars).forEach(([k, v]) => {
            if (v) root.style.setProperty(k, v);
        });

        // Cleanup: restore defaults when component unmounts (navigating away)
        return () => {
            Object.keys(vars).forEach(k => root.style.removeProperty(k));
        };
    }, [theme]);

    return (
        <GameThemeContext.Provider value={theme}>
            {children}
        </GameThemeContext.Provider>
    );
}

export function useGameTheme() {
    return useContext(GameThemeContext);
}

// ── Utilities ──────────────────────────────────────────────────

/** Lighten a hex color by mixing with white; amount 0–1 = 0%–100% white */
function lighten(hex, amount) {
    const { r, g, b } = hexToRgb(hex);
    const mix = v => Math.round(v + (255 - v) * amount);
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Darken/lighten by percentage: positive = lighter, negative = darker */
function shadeColor(hex, pct) {
    const { r, g, b } = hexToRgb(hex);
    const clamp = v => Math.max(0, Math.min(255, Math.round(v + (v * pct) / 100)));
    return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}

function hexToAlpha(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3
        ? clean.split("").map(c => c + c).join("")
        : clean;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
