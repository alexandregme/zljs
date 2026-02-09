# zljs Agent

An AI-powered conversational interface for generating production-ready UI screens.

## How It Works

1. **Describe** — Type a natural language description of the UI you want
2. **Generate** — AI generates clean HTML + Tailwind CSS code in real time
3. **Preview** — See the generated UI rendered live in the browser

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- An Anthropic API key

### Setup

```bash
# From the repo root
pnpm install

# Create your .env file in agent/
cp agent/.env.example agent/.env
# Edit agent/.env and add your API key
```

### Development

```bash
# From repo root
pnpm agent:dev

# Or from agent/ directory
pnpm dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

### Environment Variables

| Variable           | Description                                                    | Required |
| ------------------ | -------------------------------------------------------------- | -------- |
| `AI_API_KEY`       | Anthropic API key (server-side only, never exposed to browser) | Yes      |
| `VITE_AI_PROVIDER` | AI provider (`anthropic`)                                      | No       |

## Architecture

- **Frontend:** React 19 + TypeScript + Tailwind CSS v4 + Vite
- **AI Proxy:** Vite dev server proxy (dev) / Vercel Edge Function (prod)
- **Preview:** iframe with `srcdoc` + Tailwind CDN for isolated rendering
- **Streaming:** Native fetch + ReadableStream SSE parsing (no SDK dependency)

## Part of the zljs Ecosystem

This agent is a workspace package in the [zljs monorepo](https://github.com/alexandregme/zljs). The core component library is documented at [zljs.vercel.app](https://zljs.vercel.app).
