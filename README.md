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

Peer dependencies: `react@19`, `react-dom@19`, `next@>=16`, `next-auth@4`, `@reduxjs/toolkit@2`, `react-redux@9`.

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
