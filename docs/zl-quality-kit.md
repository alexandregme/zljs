# ZL Quality Kit

This package provides a repeatable way to keep linting and formatting standards aligned across projects. It ships a CLI that copies read-only configuration templates (`.editorconfig`, `.eslintrc.js`, etc.) into your repository and makes sure the right npm scripts run on every install.

## Installation

```bash
pnpm add -D @alexandregme/zl_js_lint
```

> **Note:** the package is being renamed to `@alexandregme/zl-quality-sync`. Once that version is published, install it instead to keep naming consistent.

## First-Time Setup

1. Install the dependency (see above).
2. Run the sync command once:
   ```bash
   pnpm exec node ./node_modules/@alexandregme/zl_js_lint/bin/zl-quality-sync.mjs
   ```
   This copies the canonical configs into your project and injects useful npm scripts.

The sync step sets up:

- `.editorconfig`
- `.eslintrc.js` (re-exporting the toolkit's ESLint preset)
- `package.json` scripts:
  - `eslint`, `prettier`, `stylelint`, `lint`, `fresh`
  - `zl:sync` → re-runs the sync CLI
  - `postinstall` → runs the sync automatically after every install

These files are **read-only**. Any manual edits will be overwritten the next time the sync runs.

## Keeping Projects Up to Date

- After bumping the dependency version, run the sync again: `pnpm run zl:sync`.
- The `postinstall` script ensures the newest templates are applied automatically on each `pnpm install`.
- To force a refresh, delete the generated files and run the sync command; they will be recreated.

## Working Locally on the Toolkit

1. Clone the toolkit repository (future `@alexandregme/zl-quality-sync`).
2. In the toolkit repo run `pnpm install` and `pnpm build` if needed.
3. Link it globally: `pnpm link --global`.
4. In a consumer project run `pnpm link --global @alexandregme/zl-quality-sync` (or `@alexandregme/zl_js_lint` until it is renamed).

This makes local changes in the toolkit repo flow into your project. When you publish, remove the link using `pnpm unlink --global <package>` and reinstall from the registry.

## Custom Scripts

If your project already has a `postinstall` script, the sync command appends itself (`existing && node ./node_modules/.../zl-quality-sync.mjs`). If you need custom installation logic, ensure the sync command stays in the chain so the configs keep updating.

## Troubleshooting

- **Configs did not appear:** run `pnpm run zl:sync` manually to see any errors. The command must execute within the project root that contains `package.json`.
- **Changes are overwritten:** treat synced files as read-only. Fork the toolkit if you need different defaults.
- **pnpm install shows no sync logs:** make sure the `postinstall` script in `package.json` contains the `node ./node_modules/@alexandregme/zl_js_lint/bin/zl-quality-sync.mjs` command.

## Roadmap

- Publish the package under the new name.
- Add more templates (Stylelint, Prettier) as needed.
- Provide `extends`-friendly configs for projects that prefer not to copy files.
  "EOF"],
