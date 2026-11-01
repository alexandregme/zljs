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

const contrast = (first: Rgba, second: Rgba) => {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Returns the contrast between two CSS colors, in a real browser. Axe can't
 * check a pair no story renders on screen, such as a hover.
 */
export const colorContrast = (first: string, second: string) =>
  contrast(toRgba(first), toRgba(second));

const over = (base: Rgba, [red, green, blue, alpha]: Rgba): Rgba => {
  const opacity = alpha / 255;

  return [
    red * opacity + base[0] * (1 - opacity),
    green * opacity + base[1] * (1 - opacity),
    blue * opacity + base[2] * (1 - opacity),
    255,
  ];
};

// Blends the translucent backgrounds up to the first opaque one, so a hover such as bg-neutral-500/20 counts what is behind it.
const backgroundOf = (element: Element | null) => {
  const layers: Rgba[] = [];
  let current = element;

  while (current) {
    const layer = toRgba(getComputedStyle(current).backgroundColor);
    layers.unshift(layer);
    if (layer[3] === 255) {
      break;
    }
    current = current.parentElement;
  }

  return layers.reduce(over, WHITE);
};

/**
 * Returns the contrast between the element's text and the background behind
 * it. Unlike axe, it always applies to the size of the text: use 4.5 to hold a
 * color that can also render small.
 */
export const textContrast = (element: Element) =>
  contrast(toRgba(getComputedStyle(element).color), backgroundOf(element));

const matchesHover = (selector: string, element: Element) =>
  selector.includes(":hover") &&
  element.matches(selector.replace(/:hover/g, ""));

// Tailwind nests hover under @media (hover: hover), so the declarations can sit in a nested rule with no selector of its own.
const hoverStyles = (
  rules: CSSRuleList,
  element: Element,
  parent = "",
): CSSStyleDeclaration[] =>
  Array.from(rules).flatMap((rule) => {
    if (rule instanceof CSSStyleRule) {
      const selector = rule.selectorText.replace(/&/g, parent);
      const own = matchesHover(selector, element) ? [rule.style] : [];

      return [...own, ...hoverStyles(rule.cssRules, element, selector)];
    }
    if ("cssRules" in rule) {
      return hoverStyles(rule.cssRules as CSSRuleList, element, parent);
    }
    if ("style" in rule && matchesHover(parent, element)) {
      return [rule.style as CSSStyleDeclaration];
    }

    return [];
  });

/**
 * Returns textContrast as if the pointer were over the element. It applies the
 * :hover rules of the stylesheets, because a play's userEvent.hover only fires
 * events: it doesn't turn :hover on, so nothing would be measured. Throws when
 * no rule is found, so a check can't pass without measuring.
 */
export const hoverTextContrast = (element: HTMLElement) => {
  const previous = element.getAttribute("style");
  const styles = Array.from(document.styleSheets).flatMap((sheet) =>
    hoverStyles(sheet.cssRules, element),
  );

  if (styles.length === 0) {
    throw new Error("The element has no :hover rule");
  }

  styles.forEach((style) => {
    Array.from(style).forEach((property) => {
      element.style.setProperty(property, style.getPropertyValue(property));
    });
  });

  const ratio = textContrast(element);

  if (previous === null) {
    element.removeAttribute("style");
  } else {
    element.setAttribute("style", previous);
  }

  return ratio;
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
  const outline = toRgba(outlineColor);
  const background = backgroundOf(element.parentElement);

  element.blur();

  if (!hasOutline) {
    return 0;
  }

  return contrast(outline, background);
};
