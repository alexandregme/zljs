// Not exported from index.ts: browser.ts imports vitest, which the Storybook build can't bundle.

type Rgba = [red: number, green: number, blue: number, alpha: number];

const WHITE: Rgba = [255, 255, 255, 255];

const toRgba = (color: string): Rgba => {
  const context = document.createElement("canvas").getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D is not available");
  }

  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);

  const [red = 0, green = 0, blue = 0, alpha = 0] = context.getImageData(
    0,
    0,
    1,
    1,
  ).data;

  return [red, green, blue, alpha];
};

const linear = (channel: number) => {
  const value = channel / 255;

  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const luminance = ([red, green, blue]: Rgba) =>
  0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);

const pageBackground = (element: HTMLElement) => {
  let parent = element.parentElement;

  while (parent) {
    const background = toRgba(getComputedStyle(parent).backgroundColor);
    if (background[3] === 255) {
      return background;
    }
    parent = parent.parentElement;
  }

  return WHITE;
};

/**
 * Focuses the element in a real browser and returns the contrast between its
 * focus outline and the background around it. Returns 0 when focus draws no
 * outline. Axe can't check this: it has no rule for focus indicators.
 */
export const focusOutlineContrast = (element: HTMLElement) => {
  element.focus();

  if (!element.matches(":focus-visible")) {
    throw new Error("The element did not match :focus-visible");
  }

  const { outlineColor, outlineStyle, outlineWidth } =
    getComputedStyle(element);
  const hasOutline = outlineStyle !== "none" && parseFloat(outlineWidth) > 0;
  const outline = luminance(toRgba(outlineColor));
  const background = luminance(pageBackground(element));

  element.blur();

  if (!hasOutline) {
    return 0;
  }

  return (
    (Math.max(outline, background) + 0.05) /
    (Math.min(outline, background) + 0.05)
  );
};
