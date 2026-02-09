# zljs — Enterprise Frontend Framework

A modern, TypeScript-based, open-source frontend framework for building scalable web applications.

## Packages

| Package  | Description                                                  | Links                                |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
| `core/`  | Component library — Button, DataGrid, Forms, Modal, and more | [Storybook](https://zljs.vercel.app) |
| `agent/` | AI-powered UI generation agent                               | [README](./agent/README.md)          |

## AI Roadmap

- [x] Conversational UI Generation (`agent/`)
- [ ] AI-Powered Testing Automation (via zl-quality-kit)
- [ ] Intelligent Component Recommendations
- [ ] Predictive Quality Gates
- [ ] Accessibility Validation via AI

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
