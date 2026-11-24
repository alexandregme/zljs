import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import type { AuxiliaryColor } from "./colors";
import { semanticTextColors } from "./colors.const";

const CORE = resolve(__dirname, "../..");
const THEME = readFileSync(resolve(CORE, "styles/colors.css"), "utf8");
const TOKEN_SUFFIXES = ["", "-strong", "-bg", "-hover", "-on"];
const AUXILIARY_COLORS = [
  "orange",
  "pink",
  "purple",
] as const satisfies readonly AuxiliaryColor[];
const AUXILIARY_TOKEN_SUFFIXES = ["", "-strong"];
const NEUTRAL_TOKENS = [
  "page",
  "surface",
  "surface-muted",
  "surface-hover",
  "border",
  "border-strong",
  "text",
  "text-soft",
];

const usedTokens = readdirSync(CORE, { recursive: true, encoding: "utf8" })
  .filter((file) => /\.(styles|const)\.ts$/.test(file))
  .flatMap(
    (file) =>
      readFileSync(resolve(CORE, file), "utf8").match(
        /\bzl-[a-z]+(?:-[a-z]+)*/g,
      ) ?? [],
  );

const themedColors = Object.keys(semanticTextColors).filter(
  (color) => color !== "none",
);

describe("semantic color tokens", () => {
  it.each(themedColors)("declares every token of %s in the theme", (color) => {
    const missing = TOKEN_SUFFIXES.filter(
      (suffix) => !THEME.includes(`--color-zl-${color}${suffix}:`),
    );

    expect(missing).toEqual([]);
  });

  it.each(AUXILIARY_COLORS)(
    "declares every token of the auxiliary color %s in the theme",
    (color) => {
      const missing = AUXILIARY_TOKEN_SUFFIXES.filter(
        (suffix) => !THEME.includes(`--color-zl-${color}${suffix}:`),
      );

      expect(missing).toEqual([]);
    },
  );

  it.each(NEUTRAL_TOKENS)(
    "declares the neutral token %s in the theme",
    (token) => {
      expect(THEME).toContain(`--color-zl-${token}:`);
    },
  );

  it("gives every token a value for the light theme and one for the dark", () => {
    const single = THEME.split("\n")
      .filter((line) => /^\s*--color-zl-[a-z-]+:/.test(line))
      .filter(
        (line) =>
          !line.includes("light-dark(") && !line.includes("var(--color-zl-"),
      )
      // A fixed pair that holds in both themes: a yellow button with dark text.
      .filter((line) => !line.includes("--color-zl-warning-"));

    expect(single).toEqual([]);
  });

  it.each(themedColors)("points the text class of %s to its token", (color) => {
    const classes = semanticTextColors as Record<string, string>;

    expect(classes[color]).toBe(`text-zl-${color}`);
  });

  it("finds a theme value for every zl class the components use", () => {
    const missing = usedTokens.filter(
      (token) => !THEME.includes(`--color-${token}:`),
    );

    expect(usedTokens.length).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });

  it("leaves none without a text class, so it inherits", () => {
    expect(semanticTextColors.none).toBe("");
  });
});
