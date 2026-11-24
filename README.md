# zljs — React Component Library

An open-source, TypeScript React component library for enterprise web apps (Next.js, Tailwind CSS v4), plus an AI agent that generates UI screens.

## Packages

| Package  | Description                                                  | Links                                |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
| `core/`  | Component library — Button, DataGrid, Forms, Modal, and more | [Storybook](https://zljs.vercel.app) |
| `agent/` | AI agent that generates UI screens (HTML + Tailwind CSS)     | [README](./agent/README.md)          |

## AI Roadmap

Checked items exist today; unchecked items are planned, not implemented.

- [x] Conversational UI Generation (`agent/`)
- [ ] AI-Powered Testing Automation (via zl-quality-kit)
- [ ] Intelligent Component Recommendations
- [ ] Predictive Quality Gates
- [ ] Accessibility Validation via AI

## Install

```bash
pnpm add @alexandregme/zljs
```

Peer dependencies: `react@19`, `react-dom@19`, `next@>=16`, `@reduxjs/toolkit@2`, `react-redux@9`.

Import the global styles once (e.g. in your root layout). It already tells Tailwind CSS v4 to scan the library classes, so no `@source` is needed:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";
```

```tsx
import { Button } from "@alexandregme/zljs";
import { RootLayout } from "@alexandregme/zljs/next";
import { FormProvider, FormInput } from "@alexandregme/zljs/rhf";

<Button onClick={handleClick}>Submit</Button>;
```

`RootLayout` goes in the root layout of a Next.js app, around its content. It renders the page's `<main>` and counts the page views with [Vercel Web Analytics](https://vercel.com/docs/analytics), so the app installs nothing for it: enable Web Analytics in the project on Vercel and deploy.

```tsx
// app/layout.tsx
import { RootLayout } from "@alexandregme/zljs/next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
```

## Colors

The components work with no setup, using the default colors. To use your own, redefine the values you want after importing the styles:

```css
@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";

@theme {
  --color-zl-primary: light-dark(#2e7d32, #81c784);
}
```

Every value is a `light-dark()` pair: the first color is used in the light theme and the second in the dark one. A single color is used in both, and one dark enough for text on a light page is too dark on a dark one, so give a pair.

`primary`, `success`, `danger`, `warning`, `info` and `muted` each take one value (`--color-zl-<color>`), used for text and the focus outline. The others follow it, and you can redefine them too:

| Value                       | Used for                | Default                                                                   |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| `--color-zl-<color>-strong` | Link hover and Tag text | 30% further from the page: darker in the light theme, lighter in the dark |
| `--color-zl-<color>-bg`     | Button background       | The color itself (`warning`: `yellow-500`)                                |
| `--color-zl-<color>-hover`  | Button hover            | The background, 15% further from the page                                 |
| `--color-zl-<color>-on`     | Text on the background  | White, and near black in the dark theme (`warning`: `gray-900`)           |

A `Tag` also takes the auxiliary colors `orange`, `pink` and `purple`, which have no meaning of their own: use them to tell categories apart. Each has only `--color-zl-<color>` and `--color-zl-<color>-strong`. The first, at 15%, is the `Tag` background, and the second is its text.

The neutral values are the page and what sits on it. Use them in your own pages (`bg-zl-surface`, `text-zl-text-soft`, `border-zl-border`), so they follow the theme too:

| Value                      | Used for                                               | Light / dark               |
| -------------------------- | ------------------------------------------------------ | -------------------------- |
| `--color-zl-page`          | The page, behind everything. `RootLayout` paints it    | `gray-50` / `neutral-950`  |
| `--color-zl-surface`       | What sits on the page: card, modal, field              | White / `neutral-900`      |
| `--color-zl-surface-muted` | A surface that recedes: disabled field, neutral button | `gray-100` / `neutral-800` |
| `--color-zl-surface-hover` | Hover of the neutral button                            | `gray-200` / `neutral-700` |
| `--color-zl-border`        | A line between surfaces                                | `gray-200` / `neutral-700` |
| `--color-zl-border-strong` | The border of a field                                  | `gray-500` / `neutral-400` |
| `--color-zl-text`          | Text                                                   | `gray-900` / `neutral-100` |
| `--color-zl-text-soft`     | A label or a description                               | `gray-700` / `neutral-300` |

Only the defaults are checked for contrast. Check your own choice, in both themes: 4.5:1 for text, on `--color-zl-<color>` against the page and on `-on` against `-bg`, and 3:1 for the focus outline. A value set on a nested element doesn't reach the values derived from it, so set them in `@theme` or `:root`.

## Themes

The components have a light and a dark theme. With no setup an app follows the theme of the device, and the user changes it in the navigation: `Sidebar` and `TopNav` show a `ThemeToggle` over the share button, with the system, the light and the dark theme. The choice is kept in the browser (`localStorage`, under `zljs-theme`), and `RootLayout` applies it before the page is drawn.

```tsx
import { ThemeToggle, useTheme } from "@alexandregme/zljs";

<ThemeToggle label="Theme" />;

// Or your own control:
const { theme, setTheme } = useTheme(); // "system" | "light" | "dark"
```

An app whose own pages aren't ready for the dark theme keeps the system theme light, and the user can still choose the dark one:

```css
@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";

:root {
  color-scheme: light;
}
```

The themes use the CSS `light-dark()` function: Chrome 123, Safari 17.5 and Firefox 120, or newer.

## Updating

See [`CHANGELOG.md`](./CHANGELOG.md), in the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format. A change that needs action in an app has a **Migration** note, written so an agent can follow it. The file ships with the package, in `node_modules/@alexandregme/zljs/CHANGELOG.md`.

## Getting Started

```bash
pnpm install
pnpm storybook    # Component library docs
pnpm agent:dev    # AI agent
pnpm test         # Run tests
```

## Tech Stack

TypeScript, React 19, Tailwind CSS v4, Storybook 10, Radix UI, pnpm workspaces, GitHub Actions, Vercel

## License

MIT
