# ZLJS Component Library - Agent Configuration

> **Extends:** `../agents/frontend.md`, `../agents/testing.md`

---

## ⚠️ IMPORTANT: Read These Files First

**AI agents MUST read ALL files in `../agents/*.md` at the start of every session before doing any work.**

Then read this file (`AGENTS.md`) for project-specific configuration.

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
- **Styling:** TBD
- **Package Manager:** PNPM
- **Documentation:** Storybook 10.x (CSF3 format)
- **Testing:** Jest + React Testing Library
- **Quality:** ZL Quality Kit (`@alexandregme/zl_js_lint`)

**Sibling Project:** `zl-quality-kit` - Provides linting/formatting configuration

---

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
│   ├── ci.yml                    # Runs on push/PR (lint, test, coverage)
│   └── release.yml               # Runs on tag push (creates GitHub release)
├── .storybook/                    # Storybook configuration
│   ├── main.ts                   # Stories config
│   └── preview.ts                # Preview config
├── core/                          # Component library
│   ├── index.ts                  # Barrel export (all components)
│   └── [component-name]/
│       ├── index.ts              # Component export
│       ├── [component].tsx       # Implementation
│       ├── [component].test.tsx  # Tests (100% coverage required)
│       └── [component].stories.tsx # Storybook stories (CSF3)
├── jest.config.js                 # Jest configuration
├── jest.setup.ts                  # Jest setup (imports jest-dom)
├── tsconfig.json                  # TypeScript configuration
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

### Rules

- **children is `string`** - Text only, not ReactNode (enforces strict API)
- **Props added on demand** - Only add props when tests require them
- **Interface defined in same file** - Keep it simple until complexity grows
- **Named exports only** - `export const Button`, not `export default`
- **No className prop** - Styling is controlled by the library, not consumers

---

## Component Testing

### Test File Structure

```typescript
// core/button/button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    const handleClick = jest.fn();
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
pnpm test            # Run tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Run tests with coverage (must be 100%)
pnpm lint            # Run all linting (eslint + prettier + stylelint)
pnpm storybook       # Start Storybook dev server (port 6006)
pnpm storybook:build # Build static Storybook
pnpm fresh           # Clean reinstall
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
touch core/[component-name]/[component].test.tsx
touch core/[component-name]/[component].stories.tsx
```

### Step 2: Write test first (RED)

```typescript
// core/chip/chip.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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

## Consumer Usage (Ruralissima)

This library is consumed by `ruralissima-diagnostico` via pnpm link:

```bash
# Link the library
pnpm link ../../zljs
```

```typescript
// In ruralissima-diagnostico next.config.js
transpilePackages: ["@zljs/core"];
```

```typescript
// Usage
import { Button } from '@zljs/core';

<Button onClick={handleClick}>Submit</Button>
```

## CI/CD Workflows

| Workflow      | Trigger              | Purpose                                |
| ------------- | -------------------- | -------------------------------------- |
| `ci.yml`      | Pull Request to main | Validate code (lint, test, commitlint) |
| `deploy.yml`  | Push to main         | Build Storybook & deploy               |
| `release.yml` | Tag push (v\*)       | Create GitHub Release                  |

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

# 6. Release when ready
git checkout main && git pull
npm version minor
git push origin main --follow-tags
```

---

## Instructions for AI Agents

1. **Read base agents first** - `../agents/frontend.md` and `../agents/testing.md`
2. **TDD required** - Write tests before implementation
3. **100% coverage** - All components must have full test coverage
4. **Accessibility first** - Use Radix UI for complex interactions
5. **Type everything** - Explicit interfaces for all props
6. **Never commit to main** - Always use feature branches and PRs
7. **Update this file** - Add new patterns as they emerge

---

_Last updated: 2025-12-10_
