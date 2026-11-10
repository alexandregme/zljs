# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

A change that needs action in an app has a **Migration** note. When updating, read every version newer than the one the app has, oldest first. This file ships with the package, in `node_modules/@alexandregme/zljs/CHANGELOG.md`. Versions before 1.8.0 are in the [GitHub Releases](https://github.com/alexandregme/zljs/releases).

## [Unreleased]

### Added

- Modals on `useAppStore`: `openModal`, `openModalWithPayload`, `closeModal`, `isModalOpen` and `getModalPayload`, each by the id of the modal, which is unique in the app. `modals` has the open ones, by id

### Changed

- `ConnectedModal` reads `useAppStore`, the same store as `Loader`. It works as before

### Removed

- `useModalStore` and the types `ModalState` and `ModalEntry`. The modals are on `useAppStore`

#### Migration

Search the app for `useModalStore`. Replace it with `useAppStore`, `isOpen` with `isModalOpen` and `getPayload` with `getModalPayload`. `openModal`, `openModalWithPayload` and `closeModal` keep their names. `modals` is no longer a list: it is an object with the open modals by id, so code that reads it directly uses `isModalOpen`.

## [2.3.0] - 2026-11-10

### Added

- `ZustandProviders`, with every provider of zljs that needs neither Redux nor a framework: `Loader` and `Toaster`, always on. It works in any React app

### Changed

- `AppProviders` renders `ZustandProviders` inside the Redux store. It renders the same as before
- `Loader`, `Toaster`, `toast`, `useAppStore` and `useToastStore` moved to `features/`, the components that come with their own state. The exports are the same

## [2.2.0] - 2026-11-10

### Added

- `Card`, a surface with a border, rounded corners and a soft shadow, which groups what belongs together. `title`, `titleLevel` and `message` show a header above the children, and `color` sets the border, a light background and the shadow from the theme. It takes the width of its parent

## [2.1.2] - 2026-11-04

### Fixed

- `WhatsAppButton` opens `whatsapp://send` on a phone, the scheme in Meta's iOS docs. It opened `whatsapp-business://send`, which is in no official doc: on an iPhone with WhatsApp Business installed, Safari said the address was invalid. On Android, a phone with both apps asks which one to use; on an iPhone, iOS picks one of them

## [2.1.0] - 2026-11-03

### Added

- `aria-label` on `DataGrid`, to name the grid for screen readers. It defaults to `Tabela de dados`
- `@ag-grid-community/locale` as a dependency, for the AG Grid texts

### Changed

- AG Grid moved from 35 to 36 (`ag-grid-community`, `ag-grid-react` and `@ag-grid-community/locale` 36.2.0). In Chrome, 35 rendered a `DataGrid` blank (header collapsed, rows at 0px until a window resize) when a grid was destroyed and another created in the same task, such as a route change between two pages with a grid or a Storybook story switch; 36 fixes it. AG Grid 36 also renamed its DOM classes: `ag-body-viewport` is now `ag-grid-scrolling-container`, and `ag-pinned-left-header` is now `.ag-header .ag-grid-pinned-left-cells`
- `DataGrid` has a minimum height of 320px, so its rows show in a parent with no height. A parent with a height smaller than that now overflows
- The AG Grid texts in `DataGrid` are in Brazilian Portuguese, such as `Aplicar` and `Sem linhas para mostrar`
- The accent color of `DataGrid` follows `--color-zl-primary`
- `Limpar todos` in `DataGrid` also clears the search

### Fixed

- The status bar of `DataGrid` holds 4.5:1 on its text, and its filters are separated from the count by a border instead of a `|` that screen readers read out
- The row count of `DataGrid` is a `role="status"` with a name, so it is announced when it changes, and it no longer shows `0 / N` before the grid is ready
- Each remove button of an active filter in `DataGrid` is named after its column, such as `Remover filtro Nome`. They all had the same name
- The buttons of the column filter in `DataGrid` hold 4.5:1, and its controls and the column headers draw a real focus outline, which also shows in forced colors mode
- `width` on a `DataGrid` column is respected. Fitting the columns to their content replaced it
- A filter tag in `DataGrid` shows its value for a number of 0, a range, a date, a filter with no value and combined conditions. These showed raw JSON

### Removed

- The `.ag-theme-alpine` rules in `styles.css`. `DataGrid` never rendered that class, so they had no effect on it

#### Migration

Only for an app that renders its own AG Grid with the `ag-theme-alpine` class and relied on these rules: search for `ag-theme-alpine`, and copy the rules it needs. `DataGrid` needs nothing.

An app that lists `ag-grid-community` or `ag-grid-react` in its own `package.json` must move them to `^36.2.0` too, so a single copy of AG Grid is installed: two copies register their modules twice and warn. Search for `ag-grid` in `package.json`. An app with its own CSS or tests on the AG Grid DOM (`ag-body-viewport`, `ag-center-cols-container`, `ag-pinned-left-header`) must follow the [AG Grid 36 upgrade guide](https://www.ag-grid.com/react-data-grid/upgrading-to-ag-grid-36/). An app that uses only `DataGrid` changes nothing.

## [2.0.1] - 2026-11-03

### Changed

- The colored toasts of `Toaster` follow the `--color-zl-*` theme values: the text is the `-strong` value, the background is the color at 15% over white and the border is the color at 30%. `error` uses `danger`

### Fixed

- `Toaster` holds 4.5:1 on the text of each toast type. The rich colors of Sonner stayed under it on their light backgrounds
- A toast from `useToastStore` no longer replaces a toast from `toast()` that is showing. Both numbered their toasts from 1
- A toast and its close button draw a real focus outline in the text color. Their `box-shadow` ring was about 1.6:1 and disappeared in forced colors mode

## [2.0.0] - 2026-11-03

### Added

- Auxiliary colors `orange`, `pink` and `purple`, with the `AuxiliaryColor` type and the `--color-zl-<color>` and `--color-zl-<color>-strong` theme values. They have no meaning of their own and only `Tag` takes them
- `TagColor` type, and `Tag` takes `primary`, `success`, `danger`, `warning`, `info` and `muted`
- `removeLabel` on `Tag`, to name the remove button when several tags show at once. It defaults to `Remover`

### Changed

- `Tag` follows the `--color-zl-*` theme values: its background is the color at 15% and its text is the `-strong` value. Its default color is `primary`, no longer `blue`
- The remove button of `Tag` takes the text color of the `Tag`, for its icon and its focus outline

### Removed

- The `blue`, `green`, `red`, `yellow` and `gray` colors of `Tag`. `orange` stays. `StatsCard` and `DataColor` keep them

#### Migration

Search the app for `<Tag` and read its props, which can sit on the next lines (`grep -rn -A3 "<Tag"`). Replace `color`: `blue` → `primary`, `green` → `success`, `red` → `danger`, `yellow` → `warning`, `gray` → `muted`. A variable typed `DataColor` that reaches a `Tag` becomes `TagColor`. A test that asserts `bg-*-100` or `text-*-700` on a `Tag` moves to `bg-zl-<color>/15` and `text-zl-<color>-strong`. Don't change `StatsCard`.

## [1.19.1] - 2026-11-03

### Changed

- Collapsed `Sidebar` shows only the logout button in its footer. The avatar, name and email come back when it expands, and the footer and the collapse button keep their height in both states, at 64px and 56px
- The collapse button of `Sidebar` is named by `collapseLabel` while expanded, no longer `Collapse sidebar`, and shows only its icon when collapsed
- `Sidebar` links have fewer elements and look the same: the `Icon` is a direct child of the link, and the home link has no empty `span` when there is no `homeLabel`

#### Migration

Search the app's tests for `Collapse sidebar` and replace it with the value the app passes in `collapseLabel`. `Expand sidebar` stays.

### Fixed

- Collapsed `Sidebar` can log out with a mouse. The button sat outside the visible area, and focusing it with the keyboard scrolled the sidebar sideways, out of view
- `Sidebar` links draw their own focus outline in the text color. They relied on the browser's default, which was 2.53:1 in Chromium
- The active home link of `Sidebar` has `aria-current="page"`, its link is styled like the others, and the avatar initials are hidden from screen readers
- A long email in `Sidebar` is cut with an ellipsis. It ran under the logout button
- The icon of the `Sidebar` collapse button lines up with the link icons, so it is centered when collapsed and doesn't move on toggle. It sat 4px to the right

## [1.19.0] - 2026-11-02

### Added

- `label` on `Spinner`: the name screen readers announce, `Loading` by default

### Changed

- `Spinner` is a status with a name (`role="status"`) and has no color of its own. It was always white, and now inherits the color from around it
- `Loader` draws its spinner in the `primary` color, which holds 3:1 over the overlay on a white page. It was white, at 1.6:1. The `status` role moved from the overlay to the spinner, which takes the `label`

#### Migration

Search the app for `<Spinner`. On a dark surface, set a light text color around it, such as `text-white`. Remove a `role="status"` the app put around a `Spinner`, so there aren't two. `Loader` needs no change.

### Fixed

- `Loader` covers the whole page. It had no position of its own, so it started where it was rendered, below anything before it

## [1.18.1] - 2026-11-02

### Removed

- Parameters in the hash, in `splitURLasPath` and the `query` of `useRouterStore`: `/orders#id=7` now returns `{}`

#### Migration

Search the app for `splitURLasPath` and `setRoute`. A URL with its parameters after `#` now reads them from `window.location.hash`.

### Fixed

- `splitURLasPath` and the `query` of `useRouterStore` lost the query when the URL also had a hash: `/orders?id=7#top` returned `{ top: "" }` and now returns `{ id: "7" }`

## [1.18.0] - 2026-11-02

### Added

- `AppProviders` in `@alexandregme/zljs/next`: the app's global configuration, with the Redux store, `Loader`, `Toaster` and the route in `useRouterStore`. It takes `children`, `reducers`, `coreReducers`, `middlewares` and `preloadedState`
- `PageConfig` in `@alexandregme/zljs/next`: a feature's state configuration, with `title`, `reducers` and `initPage`. It renders only its children

### Changed

- `ReduxProvider` creates a store per mount. It was a single store in the module, which on the server was shared between requests. Props changed after the first render no longer change the reducers. A page's reducers still change with `setDynamicReducers`, which is now required on `ReduxStore`
- `InitPageFunction` moved to `@alexandregme/zljs/next`. Its `dispatch` accepts thunks

### Removed

- `AppWrapper` and `AppWrapperProps`. The route it synced never ran on the App Router, because `next/compat/router` returns `null` there
- `PageWrapper` and `PageWrapperProps`
- `DocumentWrapper` and `DocumentWrapperProps`
- `next-auth` from the peer dependencies. An app that uses it keeps it in its own `package.json`

#### Migration

Search the app for `AppWrapper`, `PageWrapper`, `InitPageFunction` and `DocumentWrapper` imported from `@alexandregme/zljs`. A local component with the same name, as in `ruralissima-diagnostico`, stays.

- `AppWrapper`: use `AppProviders` from `@alexandregme/zljs/next`, with the same `reducers`, `middlewares` and `coreReducers`, in a `'use client'` file of the app, because a Server Component can't pass a function. An app that used the session adds `SessionProvider` from `next-auth/react` around it, and installs `next-auth` if it isn't in its `package.json`
- `PageWrapper`: use `PageConfig` from `@alexandregme/zljs/next`, with the same `title`, `reducers` and `initPage`, and start the file that renders it with `'use client'`
- `InitPageFunction`: import it from `@alexandregme/zljs/next`
- `DocumentWrapper`: write `<html lang="…">` and `<body>` directly in `app/layout.tsx`

## [1.17.0] - 2026-11-02

### Added

- `ReduxProvider`, the new name of `GlobalState`, with the types `ReduxProviderProps` and `ReduxStore`. It behaves the same

### Removed

- `GlobalState`, `GlobalStateProps` and `ExtendedStore`

#### Migration

Search the app for `GlobalState`, `GlobalStateProps` and `ExtendedStore` imported from `@alexandregme/zljs`, and replace them with `ReduxProvider`, `ReduxProviderProps` and `ReduxStore`. The props don't change.

## [1.16.0] - 2026-11-02

### Added

- `Link` in `@alexandregme/zljs/next`: navigates with `next/link` and takes `children`, `href` and `color`, with the `SemanticColor` values. It is always underlined, inherits the font size around it and has a 44px touch target, so keep at least 20px between stacked links
- `NotFound` takes `backLabel`. "Go back home" was fixed, so an app in another language couldn't translate it

### Changed

- `RootLayout` takes the height of the visible screen, with `min-h-dvh` instead of `min-h-screen`, so it doesn't scroll on a phone
- `NotFound` is built with `Heading`, `Text` and `Link`: the title goes from `text-2xl` semibold to `text-3xl` bold, the message uses the theme's `muted`, and the link follows the theme and is always underlined. It navigates with `next/link` instead of reloading the page
- `NotFound` takes the height of the visible screen, with `min-h-dvh` instead of `min-h-screen`, so it doesn't scroll on a phone

### Fixed

- The `404` of `NotFound` had 1.47:1 contrast on white with `text-gray-300`. It now uses the theme's `muted`, which is 4.84:1

## [1.15.0] - 2026-11-02

### Added

- `Icon` takes `color`, with the same `SemanticColor` values as `Text` and `Heading`. With no `color`, or with `none`, it still inherits the color around it

## [1.14.0] - 2026-11-02

### Changed

- The box of a `Checkbox` with `variant="card"` is centered on the height of its content, instead of sitting at the top. With several lines, it is no longer beside the first one

### Fixed

- A checked `Checkbox` uses the theme's `primary` color. It had `text-blue-600`, which does nothing on a native checkbox, so it kept the browser's own color, and an app's theme only reached the border of a `card`

#### Migration

Every `Checkbox` with `variant="card"` looks different, so check those screens. Code only needs a change if it forces the alignment from outside, or if a test asserts `items-start` on the card. To find them, run the commands below from the app's root. The first also finds other components named `Checkbox` and any `variant`, and the last also finds `items-start` set by the app, and those stay as they are:

```sh
grep -rnE -A6 "<Checkbox([[:space:]/>]|$)" . --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next | grep -E "variant="
grep -rnE "\[&_label\]:items-" . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next
grep -rnE "items-start" . --include='*.test.*' --exclude-dir=node_modules --exclude-dir=.next
```

Remove a wrapper that only sets `[&_label]:items-center`, and the test that asserts it. In tests, replace `items-start` with `items-center`.

## [1.13.0] - 2026-11-02

### Added

- `Radio` takes `aria-label`, `required`, `onBlur`, `onKeyDown` and `ref`, as `Input` does, so it works with `register` from `react-hook-form`

### Changed

- `Radio` requires `label` or `aria-label` in its type, instead of always `label`
- `Radio` input now sits inside its `<label>`, as on `Checkbox`, so the gap between the circle and the text is clickable too
- `Radio` draws a real `focus-visible` outline in the theme's `primary` color instead of a `focus:ring`, so focus stays visible in forced colors mode

### Fixed

- A checked `Radio` uses the theme's `primary` color. It had `text-blue-600` and `border-gray-300`, which do nothing on a native radio, so it kept the browser's own color
- The label of a disabled `Radio` shows the `not-allowed` cursor instead of `pointer`

#### Migration

Only code that extends `RadioProps`, and tests or selectors that rely on the old structure or classes, need a change. To find them, run the commands below from the app's root. The second also finds other uses of these classes, and those stay as they are:

```sh
grep -rnE "\bRadioProps\b" . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next
grep -rnE "text-blue-600|focus:ring-blue-500|nextSibling|previousSibling" . --include='*.test.*' --exclude-dir=node_modules --exclude-dir=.next
```

Replace `interface X extends RadioProps` with `type X = RadioProps & { ... }`, because `RadioProps` is now a union. In tests, replace those classes with `accent-zl-primary` and `focus-visible:outline-zl-primary`, and find the radio by role instead of by its position next to the label.

## [1.12.0] - 2026-11-02

### Added

- `TextArea` takes `aria-label`, `name`, `autoComplete`, `required`, `onBlur`, `onKeyDown` and `ref`, as `Input` and `Select` do, so it works with `register` from `react-hook-form`

### Changed

- `TextArea` requires `label` or `aria-label` in its type, instead of always `label`
- `TextArea` draws a real `focus-visible` outline in the theme's `primary` color instead of a `focus:ring`, so focus stays visible in forced colors mode, and an app's own color reaches it
- `TextArea` border is now `gray-500` instead of `gray-300`, for 3:1 contrast, and its placeholder is `gray-500`, for 4.5:1

### Fixed

- `TextArea` with `error` sets `aria-invalid` and points `aria-describedby` to the message, so a screen reader announces both
- `TextArea` uses `resize-y`. It had a class that doesn't exist in Tailwind, so it only resized vertically in apps with Tailwind's base styles

#### Migration

Only code that extends `TextAreaProps` and tests that assert its old classes need a change. To find them, run the commands below from the app's root:

```sh
grep -rnE "\bTextAreaProps\b" . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next
grep -rnE "border-gray-300|focus:ring-blue-500|focus:border-transparent|resize-vertical" . --include='*.test.*' --exclude-dir=node_modules --exclude-dir=.next
```

Replace `interface X extends TextAreaProps` with `type X = TextAreaProps & { ... }`, because `TextAreaProps` is now a union. In tests, replace those classes with `focus-visible:outline-zl-primary`, `border-gray-500` and `resize-y`.

## [1.11.0] - 2026-11-02

### Added

- `Select` takes `aria-label`, `name`, `autoComplete`, `required`, `onBlur` and `onKeyDown`, and forwards `ref`, as `Input` does, so it works with `register` from `react-hook-form`

### Changed

- `Select` requires `label` or `aria-label` in its type, instead of always `label`
- `Select` draws a real `focus-visible` outline in the theme's `primary` color instead of a `focus:ring`, so focus stays visible in forced colors mode, and an app's own color reaches it
- `Select` border is now `gray-500` instead of `gray-300`, for 3:1 contrast

### Fixed

- `Select` shows its `placeholder` when there is no `value`. It used to start on the first option, so the `placeholder` never showed
- `Select` with `error` sets `aria-invalid` and points `aria-describedby` to the message, so a screen reader announces both

#### Migration

Only a `Select` with a `placeholder` and no `value`, code that extends `SelectProps`, and tests that assert its old classes need a change. To find them, run the commands below from the app's root. The first also finds other components named `Select`, and those stay as they are:

```sh
grep -rnE -A6 "<Select([[:space:]/>]|$)" . --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next | grep -E "placeholder"
grep -rnE "\bSelectProps\b" . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next
grep -rnE "border-gray-300|focus:ring-blue-500|focus:border-transparent" . --include='*.test.*' --exclude-dir=node_modules --exclude-dir=.next
```

That `Select` now starts empty, so `onChange` runs only after the user picks an option. If the app counted on the first option being selected, pass it as `value`. Replace `interface X extends SelectProps` with `type X = SelectProps & { ... }`, because `SelectProps` is now a union. In tests, replace those classes with `focus-visible:outline-zl-primary` and `border-gray-500`.

## [1.10.0] - 2026-11-02

### Added

- `Input` takes `autoComplete` and `required`

### Changed

- `Input` requires `label` or `aria-label` in its type, so a field can't be left without a name
- `Input` draws a real `focus-visible` outline in the theme's `primary` color instead of a `focus:ring`, so focus stays visible in forced colors mode, and an app's own color reaches it
- `Input` border is now `gray-500` instead of `gray-300`, for 3:1 contrast, and its placeholder is `gray-500`, for 4.5:1

### Fixed

- `Input` with `error` sets `aria-invalid` and points `aria-describedby` to the message, so a screen reader announces both

#### Migration

Only an `Input` with neither `label` nor `aria-label`, code that extends `InputProps`, and tests that assert its old classes need a change. To find them, run the commands below from the app's root. The first also finds other components named `Input`, and those stay as they are:

```sh
grep -rnE "<Input([[:space:]/>]|$)|\bInputProps\b" . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.next
grep -rnE "border-gray-300|focus:ring-blue-500|focus:border-transparent" . --include='*.test.*' --exclude-dir=node_modules --exclude-dir=.next
```

Give each field a `label`, or an `aria-label` when the context already says what it is. Replace `interface X extends InputProps` with `type X = InputProps & { ... }`, because `InputProps` is now a union. In tests, replace those classes with `focus-visible:outline-zl-primary` and `border-gray-500`.

`FormInput` already requires `label`, so it doesn't change.

## [1.9.0] - 2026-11-02

### Added

- `CHANGELOG.md` now ships with the package, and has a `Foundations/Changelog` page in Storybook

## [1.8.0] - 2026-11-01

### Added

- Theme values for the semantic colors. Apps work with no setup, and can use their own colors by redefining `--color-zl-<color>` after importing the styles. See `Colors` in the README. Only the defaults are checked for contrast
- `Foundations/Colors` page in Storybook

### Changed

- `Button`, `Heading`, `Text`, `Error` and the `Checkbox` card use theme classes such as `text-zl-success` instead of Tailwind shades such as `text-green-700`
- `info` on `Heading` and `Text` is now `cyan-700` instead of `sky-700`
- `Button` and link hovers are now derived from their color, so they are slightly different

#### Migration

Only tests that assert a shade on a zljs component need a change. To find them, run the command below. It also finds classes the app sets itself, and those stay as they are:

```sh
grep -rnE "(hover:)?(text|bg)-(blue|green|red|yellow|sky|cyan|gray)-(\\\\d|[0-9])" src --include='*.test.*'
```

Replace the shade with the class of the `color` being tested, for example `/(^|\s)text-green-\d+/` with `/(^|\s)text-zl-success(\s|$)/`. Then run the app's tests.

| `color`   | `Text`, `Heading`, `link` | Link hover                     | `Button` background | `Button` hover              |
| --------- | ------------------------- | ------------------------------ | ------------------- | --------------------------- |
| `primary` | `text-zl-primary`         | `hover:text-zl-primary-strong` | `bg-zl-primary-bg`  | `hover:bg-zl-primary-hover` |
| `success` | `text-zl-success`         | `hover:text-zl-success-strong` | `bg-zl-success-bg`  | `hover:bg-zl-success-hover` |
| `danger`  | `text-zl-danger`          | `hover:text-zl-danger-strong`  | `bg-zl-danger-bg`   | `hover:bg-zl-danger-hover`  |
| `warning` | `text-zl-warning`         | `hover:text-zl-warning-strong` | `bg-zl-warning-bg`  | `hover:bg-zl-warning-hover` |
| `info`    | `text-zl-info`            | `hover:text-zl-info-strong`    | `bg-zl-info-bg`     | `hover:bg-zl-info-hover`    |
| `muted`   | `text-zl-muted`           | `hover:text-zl-muted-strong`   | `bg-zl-muted-bg`    | `hover:bg-zl-muted-hover`   |

The message of `Error` is `text-zl-danger`. `none` and `ghost` didn't change.

[Unreleased]: https://github.com/alexandregme/zljs/compare/v2.3.0...HEAD
[2.3.0]: https://github.com/alexandregme/zljs/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/alexandregme/zljs/compare/v2.1.2...v2.2.0
[2.1.2]: https://github.com/alexandregme/zljs/compare/v2.1.0...v2.1.2
[2.1.0]: https://github.com/alexandregme/zljs/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/alexandregme/zljs/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/alexandregme/zljs/compare/v1.19.1...v2.0.0
[1.19.1]: https://github.com/alexandregme/zljs/compare/v1.19.0...v1.19.1
[1.19.0]: https://github.com/alexandregme/zljs/compare/v1.18.1...v1.19.0
[1.18.1]: https://github.com/alexandregme/zljs/compare/v1.18.0...v1.18.1
[1.18.0]: https://github.com/alexandregme/zljs/compare/v1.17.0...v1.18.0
[1.17.0]: https://github.com/alexandregme/zljs/compare/v1.16.0...v1.17.0
[1.16.0]: https://github.com/alexandregme/zljs/compare/v1.15.0...v1.16.0
[1.15.0]: https://github.com/alexandregme/zljs/compare/v1.14.0...v1.15.0
[1.14.0]: https://github.com/alexandregme/zljs/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/alexandregme/zljs/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/alexandregme/zljs/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/alexandregme/zljs/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/alexandregme/zljs/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/alexandregme/zljs/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/alexandregme/zljs/compare/v1.7.0...v1.8.0
