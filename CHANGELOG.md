# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

A change that needs action in an app has a **Migration** note. When updating, read every version newer than the one the app has, oldest first. This file ships with the package, in `node_modules/@alexandregme/zljs/CHANGELOG.md`. Versions before 1.8.0 are in the [GitHub Releases](https://github.com/alexandregme/zljs/releases).

## [Unreleased]

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

[Unreleased]: https://github.com/alexandregme/zljs/compare/v1.11.0...HEAD
[1.11.0]: https://github.com/alexandregme/zljs/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/alexandregme/zljs/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/alexandregme/zljs/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/alexandregme/zljs/compare/v1.7.0...v1.8.0
