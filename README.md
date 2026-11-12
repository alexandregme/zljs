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
  --color-zl-primary: #2e7d32;
}
```

`primary`, `success`, `danger`, `warning`, `info` and `muted` each take one value (`--color-zl-<color>`), used for text and the focus outline. The others follow it, and you can redefine them too:

| Value                       | Used for                | Default                                    |
| --------------------------- | ----------------------- | ------------------------------------------ |
| `--color-zl-<color>-strong` | Link hover and Tag text | 30% darker                                 |
| `--color-zl-<color>-bg`     | Button background       | The color itself (`warning`: `yellow-500`) |
| `--color-zl-<color>-hover`  | Button hover            | The background, 15% darker                 |
| `--color-zl-<color>-on`     | Text on the background  | White (`warning`: `gray-900`)              |

A `Tag` also takes the auxiliary colors `orange`, `pink` and `purple`, which have no meaning of their own: use them to tell categories apart. Each has only `--color-zl-<color>` and `--color-zl-<color>-strong`. The first, at 15%, is the `Tag` background, and the second is its text.

Only the defaults are checked for contrast. Check your own choice: 4.5:1 for text, on `--color-zl-<color>` against the page and on `-on` against `-bg`, and 3:1 for the focus outline. A value set on a nested element doesn't reach the values derived from it, so set them in `@theme` or `:root`.

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
