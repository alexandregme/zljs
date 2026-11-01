import { readFileSync } from "fs";
import { resolve } from "path";
import { semanticTextColors } from "./colors.const";

const THEME = readFileSync(resolve(__dirname, "../styles/colors.css"), "utf8");
const TOKEN_SUFFIXES = ["", "-strong", "-bg", "-hover", "-on"];

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

  it("leaves none without a text class, so it inherits", () => {
    expect(semanticTextColors.none).toBe("");
  });
});
