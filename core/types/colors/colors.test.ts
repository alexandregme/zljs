import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { semanticTextColors } from "./colors.const";

const CORE = resolve(__dirname, "../..");
const THEME = readFileSync(resolve(CORE, "styles/colors.css"), "utf8");
const TOKEN_SUFFIXES = ["", "-strong", "-bg", "-hover", "-on"];

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
