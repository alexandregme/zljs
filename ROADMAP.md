# zljs Roadmap

This list tracks potential improvements. Agents must review and update it when new ideas are discussed or implemented.

1. Design tokens export (`tokens` object with typed colors/spacing/radii)
2. Layout primitives (`Stack`, `Inline`, `Grid`, `Spacer`)
3. DataGrid extensions (valueFormatter, typed cellRenderer, loading/empty states)
4. Form feedback primitives (`Label`, `HelperText`, `Field` wrappers)
5. Modal enhancements (size prop, footer slot, closeOnOverlayClick)
6. Notification hooks (`useToast` with typed variants + preset `Toaster`)
7. `RadioGroup` (`label`, `name`, `error` and `options` as on `Select`), so an error shows once and is linked to the whole group. Until then `Radio` has no `error`: apps use `fieldset`, `legend` and `Error`

---

## Forms

1. Shared type for `label` or `aria-label`: `InputName`, `SelectName`, `TextAreaName` and `RadioName` are four copies of it
2. Decide whether `label` and `aria-label` can go together. Accepting only one makes it impossible for `aria-label` to leave out the visible text, and it changes the public API
3. `FormInput` doesn't pass `autoComplete` or `required` on to `Input`
4. `FormSelect`, `FormTextArea` and `FormRadio`, with a permanent test of `register`: so far it was only checked with temporary tests
5. `Foundations/Changelog`: version titles (`h2`) and `Migration` (`h4`) aren't bold, because Tailwind's reset removes the weight and Storybook only sets it back on `h1` and `h3`. Needs a rule in `.storybook/storybook.css`, which reaches every docs page
6. `Error` hides JavaScript's `Error` in any file that imports it, so `throw new Error()` would use the component there. Renaming it (`FieldError`) changes the public API, so it waits for a major
7. `Error`: check on a real screen reader whether `role="alert"` plus `aria-describedby` announces the message twice, and how several errors at once sound

Form components still missing, decided from the web platform and not from what the apps use today, in the suggested order:

1. `Fieldset` (`fieldset` + `legend`), then `RadioGroup` (see the list at the top) and `CheckboxGroup`, which solve the error of a group once
2. `Label` and `HelperText` (see "Form feedback primitives" at the top), before the new fields, because each field repeats its own label today
3. More `Input` types: `number`, `tel`, `url` and `search` first, then `date`, `time`, `datetime-local`, `month` and `week`
4. `Switch` (a checkbox with `role="switch"`), `FileInput` (`type="file"`), `Slider` (`type="range"`) and `ColorInput` (`type="color"`)
5. `Select`: `optgroup`, and `multiple`, which changes the type of `value`
6. `Combobox` (select with search, as `datalist` is limited) and `DatePicker` (own calendar, as `type="date"` already covers many cases). They are the largest and need a stable base
7. Code field (OTP), a more specific case
8. `Progress` and `Meter`, which are native too but only show data

---

## Layout

`PageContent` was proposed and left out of the `PageConfig` change, to come back as its own proposal: the content of a page with `title` (`<h1>`), `description`, `actions`, `footer`, spacing and padding, and no landmark. It is what repeats in the pages of `ruralissima-entregas` (pedidos, detalhes, produtos and rota). A page with no title or padding, like a full-screen map, wouldn't use it. An `AppShell` for the tab frame also waits: `RootLayout` would put its header and nav inside `<main>`.

## Tooling

1. Lint rule requiring tests to import components from `@zljs/core`: `no-restricted-imports` regex `^\./[^.]+$` on `*.test.tsx`, ignoring components outside the barrel (`data-grid-status-bar`, `data-grid-toolbar`, `next/`, `rhf/examples/`). Turn it on after every test has been switched, one component at a time
2. Release: publish to npm before pushing the tag and creating the GitHub Release, so a failed publish doesn't leave a version without a package (v1.2.0). Don't use "Re-run" on a failed release: it bumps the version again
3. Run `pnpm test:storybook` in the `project-check` skill
4. Chromatic: send a first build with `pnpm test:visual`, then decide whether it runs in CI (needs the `CHROMATIC_PROJECT_TOKEN` secret and uses snapshot quota)

---

## Accessibility rollout

Goal: every story passes axe with `a11y.test: "error"`. `Icon`, `Input`, `Select`, `TextArea`, `Radio` and `Error` are done. The fixes for the components below exist as uncommitted changes in the working tree: review each with `component-check`, then open one PR per component.

1. `Button` (checked, focus outline and story descriptions fixed)
   - Decide whether the type should require `aria-label` on icon-only buttons (changes the public API)
2. `Checkbox` (next): `border-gray-300` does nothing on a native control, and it needs a real focus outline and the props of `Input`. `accent-zl-primary` is already in
3. Not checked yet: `Heading`, `Tag`, `Spinner`, `Loader`, `Toaster`, `Sidebar`, `DataGrid`
4. In each PR: bring the tests and stories to the current `component-tests` and `component-check` shape
5. Last PR: switch `a11y.test` to `"error"` in `.storybook/preview.ts` and turn on the lint rule above

Known problems:

1. Flaky story: DataGrid `Single Column` sometimes fails axe in the full suite, on a half-built grid. CI has no retry, so fix it before `a11y.test` becomes `"error"`
2. Collapsed `Sidebar`: the Logout button is clipped but still takes keyboard focus. The layout needs a decision
3. `Loader` mounts only while loading, and some screen readers don't announce a `role="status"` inserted that way
4. No stories, so no axe coverage: `ConnectedModal`, `FormInput`, `FormProvider`
5. `Checkbox` and `Modal` still use a `box-shadow` focus ring, which disappears in forced colors mode and has no contrast check. Move them to a real `focus-visible` outline and check it with `focusOutlineContrast` from `test-utils/contrast.ts`, as `Button` and `Input` do. Hover is only checked on `Button`: add `hoverTextContrast` to the others that change color on hover
6. `Button` colored outlines are checked on a white page only: on a dark surface, `primary` and the others can fall under 3:1
7. After the color tokens PR: the `DataGrid` status bar still hardcodes `blue-600`, and the focus outlines should use `outline-zl-primary`
8. The border of an unchecked `Radio` is drawn by the browser, so no story can check its contrast
9. `Button` with `variant="link"` has the same 44px touch target as `Link`, and its story doesn't say that stacked ones need 20px between them. Not measured on `Button`: it was measured on `Link`, where a tap on the lower 10px of a link opens the one below

Skills (`zl-ai-toolkit`, `component-check` and `component-tests` still uncommitted):

1. Open the PR for both skills: the rules on required props, grouping, test order and the `Styles` block only exist locally
2. Say whether an explicit `variant` on an icon-only button needs a story
3. Both skills cite `zl:create-component`, which doesn't exist
4. `component-tests`: drop `toBeInTheDocument` after a `getByRole`, which already fails when the element is missing, and keep `not.toThrow` only for components that call the callback themselves

To review later:

1. Go back to the contrast helpers in `test-utils/contrast.ts`, to understand how they work and where they run
   - `colorContrast`: two CSS colors. Used in `Foundations/Colors` `Contrast` (`core/types/colors/colors.stories.tsx`), and `Input` `States` (border) and `Placeholders`
   - `textContrast`: an element's text against the background behind it, blending translucent layers. Used in `Foundations/Colors` `Usage`
   - `hoverTextContrast`: the same, after applying the `:hover` rules read from the stylesheets, because `userEvent.hover` doesn't turn `:hover` on. It throws if it finds no rule. Used in `Button` `Colors`
   - `focusOutlineContrast`: focuses the element and compares its outline with the background. Used in `Button` `Colors` and `Input` `States`
   - They run in a real browser through `pnpm test:storybook`, inside each story's `play`, and not in `pnpm test`: jsdom has no CSS
2. Go back to everything about axe: what it checks, how it runs on the stories (`a11y.test` in `.storybook/preview.ts`) and what it can't see
3. Go back to everything about colors: the theme in `core/styles/colors.css`, the `Foundations/Colors` page and the color rules in the `component-check` skill

---

## Shared Backend Components (chat-core)

1. Mongo connection module (shared Mongoose config + connection health)
2. Config module (typed env loading + validation)
3. Logger module (structured logs + request correlation id)
4. Request context (per-request metadata, trace ids)
5. Base repository helpers (pagination, soft delete, common filters)
6. Error handling layer (domain errors + HTTP mapping)
7. HTTP client wrapper (timeouts, retries, circuit breaker)
8. Webhook verification utility (signature validation + timestamp)
9. Queue/worker module (background jobs + retries)
10. Rate limiting guard/interceptor
11. Health check endpoints (DB, external APIs)
12. Audit trail service (who/when/what changes)

---

## Shared Frontend Components (dashboard apps)

1. Page shell layout (header, breadcrumb, action bar)
2. Empty/Loading/State views (standardized UX)
3. DataGrid wrappers (filters, column presets, export)
4. Form sections (FieldGroup + validation summary)
5. Status badges (stages, health, severity)
6. KPI cards (stats variants + trend indicators)
7. Modal variants (confirm, form, detail)
8. Side panel/drawer (details + quick actions)
9. Notification banner (global alerts)
10. Contact actions (WhatsApp/chat/call buttons)

---

## Shared Backend Components (API services)

1. Auth module (JWT + roles + permissions)
2. Config module (typed env + validation)
3. Logger module (structured logs + correlation id)
4. Error handling (domain errors + HTTP mapping)
5. Database module (connection + health checks)
6. Cache layer (Redis client + helpers)
7. File storage adapter (S3/local abstraction)
8. Webhook utilities (signature validation + retries)
9. HTTP client wrapper (timeouts + retries)
10. Audit trail (who/when/what changes)
