import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AuxiliaryColor, SemanticColor } from "@zljs/core";
import { Button, Heading, Icon, Tag, Text } from "@zljs/core";
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

const WHITE = "#fff";
const TEXT_MINIMUM = 4.5;
const OUTLINE_MINIMUM = 3;

const themeSnippet = `@import "tailwindcss";
@import "@alexandregme/zljs/styles.css";

@theme {
  --color-zl-primary: #2e7d32;
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

const readBackground = (className: string) => {
  const probe = document.createElement("div");
  probe.className = className;
  document.body.append(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();

  return color;
};

const measure = (color: string) => {
  const read = (suffix = "") => readColor(tokenOf(color, suffix));

  return [
    {
      label: "Text on white",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read(), WHITE),
    },
    {
      label: "Text on gray-50",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read(), readBackground("bg-gray-50")),
    },
    {
      label: "Text on gray-100",
      ratio: colorContrast(read(), readBackground("bg-gray-100")),
    },
    {
      label: "Link hover on white",
      minimum: TEXT_MINIMUM,
      ratio: colorContrast(read("-strong"), WHITE),
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
      label: "Focus outline on white",
      minimum: OUTLINE_MINIMUM,
      ratio: colorContrast(read(), WHITE),
    },
  ];
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
          className="h-12 rounded-md border border-gray-500"
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
          <tr key={color} className="border-t border-gray-500">
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
          "Each color has five values. An app that wants its own color sets the first, and the others follow it: `-strong` is 30% darker, `-bg` is the color itself, `-hover` is the background 15% darker and `-on` is white. `warning` is the exception, with a `yellow-500` background and `gray-900` text, because its text color is too dark for a button. This story fails if a value is missing from the theme, which would render no color without any other error.",
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

export const Auxiliary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`orange`, `pink` and `purple` have no meaning of their own: use them on a `Tag` to tell categories apart when `success`, `danger` and the others don't apply. Only `Tag` takes them, so each has two values: the color, shown at 15% as the background, and `-strong`, 30% darker, as the text. An app redefines them like any other color. This story fails if a value is missing from the theme or if the text of a `Tag` falls under 4.5:1.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByTestId("tag")
      .filter((tag) => textContrast(tag) < TEXT_MINIMUM)
      .map((tag) => tag.textContent);

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
          "The same `color` prop on `Text`, `Heading`, `Icon` and `Button`. Text and icons use the color itself, and a `Button` uses its background and text values. `none` is not themed: as text it inherits the color around it, and a `Button` draws it with neutral grays. A `Tag` uses the color at 15% as its background and `-strong` as its text, and has no `none`. `StatsCard` uses `DataColor`, literal colors for data that don't change with the theme. This story holds `Text`, `Heading` and `Tag` to 4.5:1 at any size: axe accepts 3:1 on a large heading, but the same color also renders small.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByText(/^(Text|Heading|Tag)$/)
      .filter((element) => textContrast(element) < TEXT_MINIMUM)
      .map((element) => element.textContent);

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
          "Measured in the browser from the values in use, so it can't go stale. This story fails if a default falls under the minimum, including hover and focus, which axe never sees. The defaults are for white and `gray-50`. On `gray-100`, the column has no minimum because `danger`, `muted`, `warning` and `success` fall under 4.5, so don't use them there. The `Colors` story of `Button` checks the same on the real buttons, including `none` and `ghost`.",
      },
    },
  },
  play: async () => {
    const failures = colors.flatMap((color) =>
      measure(color)
        .filter(({ minimum, ratio }) => minimum && ratio < minimum)
        .map(({ label, ratio }) => `${color}: ${label} ${ratio.toFixed(2)}`),
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
          "With nothing configured, an app gets the defaults. To use your own, redefine the values after importing the styles. The `zl` prefix keeps them apart from an app's own theme, so a `--color-primary` there changes nothing here. Only the defaults are checked, so check your choice against the minimums in `Contrast`. Set the values in `@theme` or `:root`: on a nested element, they don't reach the values derived from them.",
      },
    },
  },
  render: () => (
    <pre className="rounded-md border border-gray-500 p-4 text-sm">
      <code>{themeSnippet}</code>
    </pre>
  ),
};
