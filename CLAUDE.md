# ZLJS Component Library - Agent Configuration

> **Extends:** `../agents/frontend.md`, `../agents/testing.md`

---

## ⚠️ IMPORTANT: Read These Files First

**AI agents MUST read ALL files in `../agents/*.md` at the start of every session before doing any work.**

Then read this file (`AGENTS.md`) for project-specific configuration.

**Startup confirmation:** After reading all rules, print this exact line once:
`ZLJS RULES READ ✅ Thanks for reading—now let's ship clean, calm code.`

**Commit Rules:**

- Follow conventional commits format (see `../agents/git.md`)
- NO co-author lines
- NO "Generated with Claude Code" footers
- Clean, simple commit messages only
- Always use `git add .` to stage ALL files (including new files) before committing

---

## Project Overview

React TypeScript UI component library built with accessibility-first approach using Radix UI primitives.

- **Framework:** React 19 + TypeScript
- **UI Primitives:** Radix UI (when needed)
- **Styling:** Tailwind CSS v4 + tailwind-variants
- **Icons:** lucide-react (UI) + react-icons/si (brands)
- **Package Manager:** PNPM
- **Documentation:** Storybook 10.x (CSF3 format, `@storybook/react-vite`)
- **Testing:** Vitest + React Testing Library
- **Package type:** ES Module (`"type": "module"` in package.json)

## **Sibling Project:** `zl-quality-kit` - Provides linting/formatting configuration

## Library Philosophy

**Enterprise-focused component library** designed for teams building business applications.

### Core Principles

1. **Strict APIs over flexibility** - Components have predictable, limited props
2. **Developers focus on business logic** - Not UI implementation details
3. **Opinionated by design** - Fewer choices = fewer mistakes = consistent UI
4. **Type-safe everything** - Props are strictly typed, no `any` or `ReactNode` where avoidable

### What zljs is NOT

- Not a flexible "build anything" library
- Not for developers who want full control over markup
- Not competing with shadcn/ui or Radix primitives

### Target Users

Enterprise developers who need to:

- Build pages quickly with consistent UI
- Focus on business logic, not styling decisions
- Ship reliable, accessible interfaces

---

## API Design Rules

### Rule 1: `children` is for text only

```tsx
// ✅ Correct
interface ButtonProps {
  children: string; // Text only
}
<Button>Save</Button>;

// ❌ Wrong
interface ButtonProps {
  children: React.ReactNode; // Too flexible
}
<Button>
  <Icon /> Save
</Button>; // Not allowed
```

### Rule 2: Icons are props, not children

```tsx
// ✅ Correct
<Button icon="save">Save</Button>
<Button icon="download" iconPosition="right">Download</Button>

// ❌ Wrong
<Button><SaveIcon /> Save</Button>
```

### Rule 3: Variants are predefined, not customizable

```tsx
// ✅ Correct - use predefined variants
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>

// ❌ Wrong - no custom styling escape hatches
<Button className="bg-custom-color">Save</Button>
```

### Rule 4: All props are typed with literal unions

```tsx
// ✅ Correct
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconName; // Union of valid icon names
}

// ❌ Wrong
interface ButtonProps {
  variant?: string; // Too loose
  icon?: string; // Not type-safe
}
```

---

## Project Structure

```
zljs/
├── .github/workflows/             # CI/CD
│   ├── ci.yml                    # Runs on PR (lint, test, commitlint)
│   ├── deploy.yml                # Runs on push to main (Storybook deploy)
│   └── release.yml               # Runs on merge to main (version bump + tag + GH Release + npm publish)
├── .husky/pre-commit              # Runs lint-staged
├── .storybook/
│   ├── main.ts                   # Stories config + next/link alias
│   ├── preview.ts                # Imports storybook.css
│   ├── storybook.css             # @import "tailwindcss" + core styles
│   └── mocks/next-link.tsx       # Next.js Link mock for Storybook
├── core/                          # Component library
│   ├── index.ts                  # Barrel export (all components + types)
│   ├── styles.css                # Global styles (scrollbar, AG Grid theme)
│   └── [component-name]/
│       ├── index.ts              # Component + type exports
│       ├── [component].tsx       # Implementation
│       ├── [component].interface.ts # TypeScript interfaces
│       ├── [component].styles.ts # tailwind-variants styles
│       ├── [component].test.tsx  # Tests (100% coverage required)
│       └── [component].stories.tsx # Storybook stories (CSF3)
├── commitlint.config.cjs         # Must be .cjs (package is type: module)
├── vitest.config.ts              # Vitest config (jsdom environment)
├── vitest.setup.ts               # Test setup
├── tsconfig.json
└── package.json
```

---

## Component Pattern

### Structure

```typescript
// core/button/button.tsx
interface ButtonProps {
  children: string;                              // Text only, not ReactNode
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  // Add more props on demand via TDD
}

export const Button = ({
  children,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
```

### File Organization

- **`.interface.ts`** - TypeScript interfaces and types
- **`.styles.ts`** - Styles using `tailwind-variants` (`tv`)
- **`.tsx`** - Component implementation (imports from interface + styles)

### Rules

- **children is `string`** - Text only, not ReactNode (enforces strict API)
- **Props added on demand** - Only add props when tests require them
- **Interfaces in `.interface.ts`** - Separate file for types
- **Styles in `.styles.ts`** - Use `tv()` from tailwind-variants
- **Named exports only** - `export const Button`, not `export default`
- **No className prop** - Styling is controlled by the library, not consumers

---

## Component Testing

### Test File Structure

```typescript
// core/button/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("<Button /> - Default Props", () => {
  it("renders Button correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("renders Button with type button by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
  });
});

describe("<Button /> - Custom Props", () => {
  it("renders Button with type submit", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders Button with type reset", () => {
    render(<Button type="reset">Reset</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "reset");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Pattern Rules

- **Two describe blocks**: `Default Props` and `Custom Props`
- **Default Props**: Test with minimal required props only
- **Custom Props**: Test overriding defaults and interactions
- **Use `screen.getByRole`**: Prefer accessible queries
- **One assertion focus**: Each test verifies one behavior

---

## Commands

```bash
pnpm test            # Run tests with coverage (vitest run --coverage)
pnpm test:watch      # Run tests in watch mode
pnpm lint            # Run tsc --noEmit + eslint + prettier
pnpm storybook       # Start Storybook dev server (port 6006)
pnpm build           # Build static Storybook
pnpm fresh           # Clean reinstall (rm node_modules + pnpm-lock.yaml)
```

---

## Storybook Documentation (CSF3)

Stories use CSF3 format (Component Story Format 3):

```typescript
// core/button/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"], // Auto-generate docs
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Submit: Story = {
  args: {
    children: "Submit",
    type: "submit",
  },
};
```

### Story Rules

- **Use CSF3 format** - `StoryObj` type, `args` object
- **Add `tags: ["autodocs"]`** - Auto-generates documentation
- **One story per variant** - Default, Submit, Reset, WithOnClick, etc.
- **Stories created after component is stable** - Not during TDD

---

## Creating New Components (TDD Flow)

### Step 1: Create folder structure

```bash
mkdir -p core/[component-name]
touch core/[component-name]/index.ts
touch core/[component-name]/[component].tsx
touch core/[component-name]/[component].interface.ts
touch core/[component-name]/[component].styles.ts
touch core/[component-name]/[component].test.tsx
touch core/[component-name]/[component].stories.tsx
```

### Step 2: Write test first (RED)

```typescript
// core/chip/chip.test.tsx
import { render, screen } from "@testing-library/react";
import { Chip } from "./chip";

describe("<Chip /> - Default Props", () => {
  it("renders Chip correctly", () => {
    render(<Chip>Label</Chip>);
    // ... assertions
  });
});
```

### Step 3: Create placeholder (still RED)

```typescript
// core/chip/chip.tsx
export const Chip = () => {
  return <h1>chip</h1>;  // Placeholder - tests will fail
};
```

### Step 4: Run tests - verify RED

```bash
pnpm test  # Should fail
```

### Step 5: Implement minimum to pass (GREEN)

```typescript
// core/chip/chip.tsx
interface ChipProps {
  children: string;
}

export const Chip = ({ children }: ChipProps) => {
  return <span>{children}</span>;
};
```

### Step 6: Run tests - verify GREEN

```bash
pnpm test           # Should pass
pnpm test:coverage  # Must be 100%
```

### Step 7: Export

```typescript
// core/chip/index.ts
export { Chip } from "./chip";
```

### Step 8: Add more props on demand

Repeat RED → GREEN cycle for each new prop:

1. Write failing test for new prop
2. Add prop to interface
3. Implement in component
4. Verify tests pass

### Step 9: Add stories when stable

Only write stories after the component API is stable:

```typescript
// core/chip/chip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
```

### Step 10: Export from barrel

```typescript
// core/index.ts
export { Button } from "./button";
export { Chip } from "./chip"; // Add new component
```

**When is a component "stable"?**

- All required props are implemented
- API is unlikely to change
- Ready for consumers to use

---

## Versioning & Releases

### Release Process

Versioning is automatic and driven by the **PR title**. Never run `npm version` by hand.

1. The PR title must be a Conventional Commit (`feat: add chip component`). CI (`PR title` job) validates it with commitlint.
2. PRs are **squash-merged only**, so the PR title becomes the commit message on `main`.
3. On merge, `release.yml` reads that message via `scripts/bump-type.sh`, runs `npm version`, pushes the `chore(release): vX.Y.Z` commit + tag, and creates the GitHub Release.

| PR title                                      | Bump  | Example       |
| --------------------------------------------- | ----- | ------------- |
| `type!:` or `BREAKING CHANGE:` in the PR body | major | 0.3.0 → 1.0.0 |
| `feat:`                                       | minor | 0.3.0 → 0.4.0 |
| anything else (`fix`, `chore`, `docs`, `ci`…) | patch | 0.3.0 → 0.3.1 |

Every merged PR releases a new version and publishes it to npm (Trusted Publishing via OIDC, with provenance - no npm token secret).

### Consumer Setup

Published on **npmjs** as `@alexandregme/zljs` (public, no `.npmrc` needed):

```bash
pnpm add @alexandregme/zljs
```

**Styles** - import once and let Tailwind v4 scan the library classes:

```css
@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";
@source "../node_modules/@alexandregme/zljs/dist";
```

**Usage:**

```typescript
import { Button } from "@alexandregme/zljs";
import { RootLayout } from "@alexandregme/zljs/next";
import { FormProvider, FormInput } from "@alexandregme/zljs/rhf";

<Button onClick={handleClick}>Submit</Button>
```

### Library Build

`pnpm build:lib` (tsup, `tsup.config.ts`) compiles `core/` to `dist/` - ESM + `.d.ts`, entries `.`, `./next`, `./rhf`, plus `./styles.css`. Every output file starts with `"use client"` (Next.js App Router). `pnpm build` is still the Storybook build (Vercel).

---

## CI/CD Workflows

| Workflow      | Trigger              | Purpose                                                   |
| ------------- | -------------------- | --------------------------------------------------------- |
| `ci.yml`      | Pull Request to main | Validate PR title + code (lint, test, commitlint)         |
| `deploy.yml`  | Push to main         | Build Storybook & deploy                                  |
| `release.yml` | Push to main (merge) | Bump version from PR title, tag, GH Release & npm publish |

**IMPORTANT: Never commit directly to main. Always use feature branches and PRs.**

### Development Flow

```bash
# 1. Create feature branch
git checkout -b feat/add-chip-component

# 2. Develop with TDD, commit frequently
git commit -m "feat(chip): add chip component"

# 3. Push and create PR
git push -u origin feat/add-chip-component
gh pr create --title "feat(chip): add chip component"

# 4. Wait for CI to pass, get code review

# 5. Squash and merge via GitHub

# 6. Release when ready (see Release Process above)
```

---

## Consumer Patterns (Using zljs in Apps)

When using zljs components in consumer applications, organize by component type:

### Rule 1: Organize components by type

```
features/
└── [feature]/
    └── components/
        ├── index.ts           # Barrel exports
        ├── page/              # Page components (composition only)
        │   └── FeaturePage.tsx
        ├── grid/              # Grid components (self-contained)
        │   └── [listname]/
        │       ├── [listname].tsx           # Grid implementation
        │       ├── [listname].interface.tsx # Row type & props
        │       └── [listname].columns.tsx   # Column definitions
        └── modal/             # Modal components
            └── FeatureModal.tsx
```

### Rule 2: Page components - composition only, no domain logic

Pages only compose components. No data fetching, no transformations:

```typescript
// page/TinyCrmPage.tsx
import { useState } from "react";
import { Heading } from "@alexandregme/zljs";
import type { TinyCrmContact } from "../../types";
import { ContactsGrid } from "../grid/contacts/contacts";
import { ConversationsModal } from "../modal/ConversationsModal";

const TinyCrmPage = () => {
  const [selectedContact, setSelectedContact] = useState<TinyCrmContact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenConversations = (contact: TinyCrmContact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Heading level={2}>CRM</Heading>
      <ContactsGrid onOpenConversations={handleOpenConversations} />
      <ConversationsModal contact={selectedContact} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
```

### Rule 3: Grid folder - self-contained with own data logic

Each grid gets its own folder named after the list. The grid handles its own data:

```
grid/
└── contacts/                      # List name
    ├── contacts.tsx               # Grid implementation (fetches own data)
    ├── contacts.interface.tsx     # Row type & props interfaces
    └── contacts.columns.tsx       # Column definitions
```

**Grid implementation** - fetches and transforms its own data:

```typescript
// grid/contacts/contacts.tsx
import { useSelector } from "react-redux";
import { DataGrid } from "@alexandregme/zljs";
import { selectors } from "../../../store";
import type { ContactsRow, ContactsColumnsProps } from "./contacts.interface";
import { getContactsColumns } from "./contacts.columns";

export const ContactsGrid = ({ onOpenConversations }: ContactsColumnsProps) => {
  const contacts = useSelector(selectors.getContacts);

  const rows: ContactsRow[] = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    // ... transform data
  }));

  const columns = getContactsColumns({ onOpenConversations });

  return <DataGrid<ContactsRow> columns={columns} data={rows} />;
};
```

**Interface file** - types and interfaces:

```typescript
// grid/contacts/contacts.interface.tsx
import type { Contact } from "../../../types";

export interface ContactsRow {
  [key: string]: unknown;
  id: string;
  name: string;
  contactData: Contact;
}

export interface ContactsColumnsProps {
  onOpenConversations: (contact: Contact) => void;
}
```

**Columns file** - column definitions:

```typescript
// grid/contacts/contacts.columns.tsx
import { Button, type DataGridColumn } from "@alexandregme/zljs";
import type { ContactsRow, ContactsColumnsProps } from "./contacts.interface";

export const getContactsColumns = ({
  onOpenConversations,
}: ContactsColumnsProps): DataGridColumn<ContactsRow>[] => [
  { field: "name", headerName: "Name" },
  {
    field: "action",
    headerName: "Action",
    cellRenderer: ({ data }) =>
      data ? <Button onClick={() => onOpenConversations(data.contactData)}>Open</Button> : null,
  },
];
```

### Rule 4: State Management

**Current approach: Redux** (established, team familiar)

- Each feature has its own store slice in `[feature]/store/`
- Grids fetch their own data via `useSelector`
- Pages don't manage data state, only UI state (modal open/close)

```
features/
└── [feature]/
    ├── store/
    │   ├── index.ts        # exports actions, selectors, reducer
    │   ├── slice.ts        # Redux slice
    │   └── selectors.ts    # Memoized selectors
    └── components/
        └── grid/
            └── [listname]/
                └── [listname].tsx  # Uses useSelector internally
```

**Guidelines:**

- Don't switch to Zustand unless starting a new project with simpler needs
- Keep Redux for existing projects - migration cost not worth it
- Grids own their data fetching, not pages
- UI state (modals, tabs) can use local `useState`

### Rule 5: Modals in `modal/` folder

Modal components go in the `modal/` folder:

```typescript
// modal/CheckoutModal.tsx
import { Modal } from "@alexandregme/zljs";

interface CheckoutModalProps {
  data: CheckoutRow | null;
  open: boolean;
  onClose: () => void;
}

export const CheckoutModal = ({ data, open, onClose }: CheckoutModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Details">
      {data && <div>{data.customerName}</div>}
    </Modal>
  );
};
```

### Rule 5: Barrel exports from index.ts

```typescript
// components/index.ts
export { default as CheckoutList } from "./page/CheckoutList";
export { default as AbandonedPage } from "./AbandonedPage";
```

---

## Instructions for AI Agents

1. **Read base agents first** - `../agents/frontend.md` and `../agents/testing.md`
2. **TDD required** - Write tests before implementation
3. **100% coverage** - All components must have full test coverage
4. **Accessibility first** - Use Radix UI for complex interactions
5. **Type everything** - Explicit interfaces for all props
6. **Never commit to main** - Always use feature branches and PRs
7. **ALWAYS update this file** - This file is the source of truth. When new patterns emerge, rules change, or conventions are established during a session, update this file immediately. Do not wait until the end of the session.

### Source of Truth Policy

**This CLAUDE.md file and related agent files are the single source of truth for all project conventions.**

- If a pattern is not documented here, document it when you discover or create it
- If a rule changes, update it here first
- If you're unsure about a convention, check this file
- If you establish a new convention with the user, add it here before moving on
- Consumer patterns, component structures, and coding standards all belong here

---

_Last updated: 2026-02-12_

---

## zljs Roadmap (Agent-Tracked)

See `ROADMAP.md`. Agents must review and update it when new ideas are discussed or implemented.
