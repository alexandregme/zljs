import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AuxiliaryColor, SemanticColor, Theme } from "@zljs/core";
import {
  Button,
  Card,
  Heading,
  Icon,
  Input,
  setTheme,
  Tag,
  Text,
} from "@zljs/core";
import { colorContrast, textContrast } from "@test-utils";
import { expect } from "storybook/test";

export default {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta;

const colors = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
] as const satisfies readonly SemanticColor[];

const values = [
  { suffix: "", use: "Text, focus outline and Tag background, at 15%" },
  { suffix: "-strong", use: "Link hover and Tag text" },
  { suffix: "-bg", use: "Button background" },
  { suffix: "-hover", use: "Button hover" },
  { suffix: "-on", use: "Text on the background" },
];

const auxiliaryColors = [
  "orange",
  "pink",
  "purple",
] as const satisfies readonly AuxiliaryColor[];

const auxiliaryValues = [
  { suffix: "", use: "Tag background, at 15%" },
  { suffix: "-strong", use: "Tag text" },
];

const neutralValues = [
  { suffix: "page", use: "The page, behind everything, and a tab at rest" },
  { suffix: "surface", use: "What sits on the page: card, modal, field" },
  {
    suffix: "surface-muted",
    use: "A surface that recedes: disabled field, neutral button",
  },
  { suffix: "surface-hover", use: "Hover of the neutral button" },
  { suffix: "border", use: "A line between surfaces" },
  { suffix: "border-strong", use: "The border of a field" },
  { suffix: "text", use: "Text" },
  { suffix: "text-soft", use: "A label or a description" },
];

// The two sides of every value. `system` is one of them, picked by the device.
const fixedThemes = ["light", "dark"] as const satisfies readonly Theme[];

const TEXT_MINIMUM = 4.5;
const OUTLINE_MINIMUM = 3;

const themeSnippet = `@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";

@theme {
  --color-zl-primary: light-dark(#2e7d32, #81c784);
}`;

const titleOf = (color: string) =>
  color.charAt(0).toUpperCase() + color.slice(1);

const tokenOf = (color: string, suffix = "") => `--color-zl-${color}${suffix}`;

const readColor = (token: string) => {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();

  return color;
};

const measure = (color: string) => {
  const read = (suffix = "") => readColor(tokenOf(color, suffix));
  const surface = readColor("--color-zl-surface");

  return [
    {
      label: "Text on surface",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read(), surface),
    },
    {
      label: "Text on page",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read(), readColor("--color-zl-page")),
    },
    {
      label: "Text on surface-muted",
      ratio: colorContrast(read(), readColor("--color-zl-surface-muted")),
    },
    {
      label: "Link hover on surface",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read("-strong"), surface),
    },
    {
      label: "Text on the background",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read("-on"), read("-bg")),
    },
    {
      label: "Text on hover",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read("-on"), read("-hover")),
    },
    {
      label: "Focus outline on surface",
      minimum: OUTLINE_MINIMUM,
      ratio: colorContrast(read(), surface),
    },
  ];
};

// The neutral values against each other: text on each surface, and the border
// of a field, which needs 3:1, on the surfaces a field sits on.
const measureNeutrals = () => {
  const read = (name: string) => readColor(`--color-zl-${name}`);
  const pairs = [
    ["text", "page", TEXT_MINIMUM],
    ["text", "surface", TEXT_MINIMUM],
    ["text", "surface-muted", TEXT_MINIMUM],
    ["text", "surface-hover", TEXT_MINIMUM],
    ["text-soft", "page", TEXT_MINIMUM],
    ["text-soft", "surface", TEXT_MINIMUM],
    ["text-soft", "surface-muted", TEXT_MINIMUM],
    ["border-strong", "page", OUTLINE_MINIMUM],
    ["border-strong", "surface", OUTLINE_MINIMUM],
  ] as const;

  return pairs.map(([first, second, minimum]) => ({
    label: `${first} on ${second}`,
    minimum,
    ratio: colorContrast(read(first), read(second)),
  }));
};

// Runs a check in the light theme and in the dark one, and gives the page back
// to the system. Each failure says which theme it is from.
const inEachTheme = (check: () => string[]) => {
  const failures = fixedThemes.flatMap((theme) => {
    setTheme(theme);

    return check().map((failure) => `${theme}: ${failure}`);
  });

  setTheme("system");

  return failures;
};

const missingTokens = (
  names: readonly string[],
  tokens: { suffix: string }[],
) => {
  const root = getComputedStyle(document.documentElement);

  return names
    .flatMap((color) => tokens.map(({ suffix }) => tokenOf(color, suffix)))
    .filter((token) => !root.getPropertyValue(token));
};

const ThemeSample = ({ theme }: { theme: (typeof fixedThemes)[number] }) => (
  <section
    className="flex flex-1 flex-col gap-4 bg-zl-page p-4 text-zl-text"
    style={{ colorScheme: theme }}
  >
    <Heading level={2}>{titleOf(theme)}</Heading>
    <Card title="Card" titleLevel={3} message="A surface on the page">
      <Input label={`Field in ${theme}`} placeholder="Placeholder" />
      <div className="flex flex-wrap items-center gap-2">
        <Button>Primary</Button>
        <Button color="none">Neutral</Button>
        <Button variant="link">Link</Button>
        <Tag color="success">Tag</Tag>
        <Text color="danger">Danger</Text>
        <Text color="muted">Muted</Text>
      </div>
    </Card>
  </section>
);

const Swatches = ({
  color,
  tokens,
}: {
  color: string;
  tokens: { suffix: string; use: string }[];
}) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
    {tokens.map(({ suffix, use }) => (
      <div key={suffix} className="flex flex-col gap-1">
        <div
          className="h-12 rounded-md border border-zl-border-strong"
          style={{ backgroundColor: `var(${tokenOf(color, suffix)})` }}
        />
        <code className="text-xs">{tokenOf(color, suffix)}</code>
        <Text as="span" variant="caption">
          {use}
        </Text>
      </div>
    ))}
  </div>
);

const ContrastTable = () => {
  const [rows, setRows] = useState<
    { color: string; cells: ReturnType<typeof measure> }[]
  >([]);

  useEffect(() => {
    setRows(colors.map((color) => ({ color, cells: measure(color) })));
  }, []);

  const headers = rows[0]?.cells ?? [];

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr>
          <th scope="col" className="p-2">
            Color
          </th>
          {headers.map(({ label, minimum }) => (
            <th key={label} scope="col" className="p-2">
              {minimum ? `${label} (min. ${minimum})` : `${label} (not held)`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ color, cells }) => (
          <tr key={color} className="border-t border-zl-border-strong">
            <th scope="row" className="p-2">
              {titleOf(color)}
            </th>
            {cells.map(({ label, ratio }) => (
              <td key={label} className="p-2 tabular-nums">
                {ratio.toFixed(2)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type Story = StoryObj;

export const Values: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each color has five values, and each value is a pair: one for the light theme and one for the dark. An app that wants its own color sets the first, and the others follow it: `-strong` is 30% further from the page, darker in the light theme and lighter in the dark one, `-bg` is the color itself, `-hover` is the background 15% further from the page and `-on` is white in the light theme and near black in the dark one, where the colors are lighter. `warning` is the exception, with a `yellow-500` background and `gray-900` text in both themes, because its text color is too dark for a button. The swatches show the theme in use: change it in the toolbar. This story fails if a value is missing from the theme, which would render no color without any other error.",
      },
    },
  },
  play: async () => {
    await expect(missingTokens(colors, values)).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {colors.map((color) => (
        <section key={color} className="flex flex-col gap-2">
          <Heading level={2}>{titleOf(color)}</Heading>
          <Swatches color={color} tokens={values} />
        </section>
      ))}
    </div>
  ),
};

export const Neutrals: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The neutral values are the page and what sits on it, and like the others each is a pair. `page` is behind everything, and `RootLayout` paints it. `surface` is what sits on the page, such as a `Card`, a `Modal` or a field, and `surface-muted` is a surface that recedes, such as a disabled field. `border` is a line between surfaces, and `border-strong` is the border of a field, which needs 3:1. `text` is the text, and `text-soft` is a label or a description. An app uses them in its own pages (`bg-zl-surface`, `text-zl-text-soft`, `border-zl-border`) so they follow the theme too. This story fails if a value is missing from the theme, or if a text falls under 4.5:1 or the border of a field under 3:1, in the light theme or in the dark one.",
      },
    },
  },
  play: async () => {
    const failures = inEachTheme(() =>
      measureNeutrals()
        .filter(({ minimum, ratio }) => ratio < minimum)
        .map(({ label, ratio }) => `${label} ${ratio.toFixed(2)}`),
    );

    await expect(missingTokens([""], neutralValues)).toEqual([]);
    await expect(failures).toEqual([]);
  },
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
      {neutralValues.map(({ suffix, use }) => (
        <div key={suffix} className="flex flex-col gap-1">
          <div
            className="h-12 rounded-md border border-zl-border-strong"
            style={{ backgroundColor: `var(--color-zl-${suffix})` }}
          />
          <code className="text-xs">{`--color-zl-${suffix}`}</code>
          <Text as="span" variant="caption">
            {use}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Themes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The components have a light and a dark theme, and with no setup an app follows the one of the device. `ThemeToggle`, which `Sidebar` and `TopNav` show, lets the user choose: the system, light or dark. The choice is kept in the browser. Every color is a `light-dark()` pair and `color-scheme` picks the side, so a component has one set of classes and no `dark:` variant. This story shows the same components in both themes, whatever the theme in use, so axe checks the dark one too.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 md:flex-row">
      {fixedThemes.map((theme) => (
        <ThemeSample key={theme} theme={theme} />
      ))}
    </div>
  ),
};

export const Auxiliary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`orange`, `pink` and `purple` have no meaning of their own: use them on a `Tag` to tell categories apart when `success`, `danger` and the others don't apply. Only `Tag` takes them, so each has two values: the color, shown at 15% as the background, and `-strong`, 30% further from the page, as the text. An app redefines them like any other color. This story fails if a value is missing from the theme or if the text of a `Tag` falls under 4.5:1, in the light theme or in the dark one.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = inEachTheme(() =>
      canvas
        .getAllByTestId("tag")
        .filter((tag) => textContrast(tag) < TEXT_MINIMUM)
        .map((tag) => tag.textContent ?? ""),
    );

    await expect(missingTokens(auxiliaryColors, auxiliaryValues)).toEqual([]);
    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {auxiliaryColors.map((color) => (
        <section key={color} className="flex flex-col gap-2">
          <Heading level={2}>{titleOf(color)}</Heading>
          <Swatches color={color} tokens={auxiliaryValues} />
          <div>
            <Tag color={color}>{titleOf(color)}</Tag>
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Usage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The same `color` prop on `Text`, `Heading`, `Icon` and `Button`. Text and icons use the color itself, and a `Button` uses its background and text values. `none` has no color of its own: as text it inherits the color around it, and a `Button` draws it with the neutral values. A `Tag` uses the color at 15% as its background and `-strong` as its text, and has no `none`. `StatsCard` uses `DataColor`, literal colors for data that don't change with the theme. This story holds `Text`, `Heading` and `Tag` to 4.5:1 at any size, in the light theme and in the dark one: axe accepts 3:1 on a large heading, but the same color also renders small.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = inEachTheme(() =>
      canvas
        .getAllByText(/^(Text|Heading|Tag)$/)
        .filter((element) => textContrast(element) < TEXT_MINIMUM)
        .map(
          (element) =>
            `${element.textContent} ${element.closest("section")?.querySelector("h2")?.textContent}`,
        ),
    );

    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {[...colors, "none" as const].map((color) => (
        <section key={color} className="flex flex-col gap-2">
          <Heading level={2}>{titleOf(color)}</Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Text color={color}>Text</Text>
            <Heading level={3} color={color}>
              Heading
            </Heading>
            <Icon name="Brain" size="lg" color={color} />
            <Button color={color}>Button</Button>
            <Button variant="link" color={color}>
              Link
            </Button>
            {color !== "none" && <Tag color={color}>Tag</Tag>}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Contrast: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Measured in the browser from the values in use, so it can't go stale. The table shows the theme in use, and the story measures both: it fails if a default falls under the minimum in the light theme or in the dark one, including hover and focus, which axe never sees. The defaults are for `surface` and `page`. On `surface-muted`, the column has no minimum because in the light theme `danger`, `muted`, `warning` and `success` fall under 4.5 there, so don't use them on it. The `Colors` story of `Button` checks the same on the real buttons, including `none` and `ghost`.",
      },
    },
  },
  play: async () => {
    const failures = inEachTheme(() =>
      colors.flatMap((color) =>
        measure(color)
          .filter(({ minimum, ratio }) => minimum && ratio < minimum)
          .map(({ label, ratio }) => `${color}: ${label} ${ratio.toFixed(2)}`),
      ),
    );

    await expect(failures).toEqual([]);
  },
  render: () => <ContrastTable />,
};

export const Theming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With nothing configured, an app gets the defaults. To use your own, redefine the values after importing the styles. The `zl` prefix keeps them apart from an app's own theme, so a `--color-primary` there changes nothing here. Give each color a `light-dark()` pair, the first for the light theme and the second for the dark: a single value is used in both, and a color dark enough for text on a light page is too dark on a dark one. Only the defaults are checked, so check your choice against the minimums in `Contrast`, in both themes. Set the values in `@theme` or `:root`: on a nested element, they don't reach the values derived from them.",
      },
    },
  },
  render: () => (
    <pre className="rounded-md border border-zl-border-strong p-4 text-sm">
      <code>{themeSnippet}</code>
    </pre>
  ),
};
