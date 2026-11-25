import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { setTheme, ThemeToggle } from "@zljs/core";

const REQUIRED_PROPS = { label: "Theme" };

// The theme lives in the browser, which every test shares.
afterEach(() => {
  act(() => {
    setTheme("system");
  });
});

describe("<ThemeToggle {...REQUIRED_PROPS} /> - Default Props", () => {
  it("renders <ThemeToggle {...REQUIRED_PROPS} /> correctly", () => {
    render(<ThemeToggle {...REQUIRED_PROPS} />);
    const group = screen.getByRole("group", { name: "Theme" });
    const buttons = within(group).getAllByRole("button");
    const system = within(group).getByRole("button", { name: "System" });
    const light = within(group).getByRole("button", { name: "Light" });
    const dark = within(group).getByRole("button", { name: "Dark" });

    expect(group).toBeInTheDocument();
    expect(buttons).toEqual([system, light, dark]);
    expect(system).toHaveAttribute("aria-pressed", "true");
    expect(light).toHaveAttribute("aria-pressed", "false");
    expect(dark).toHaveAttribute("aria-pressed", "false");
    expect(within(system).getByTestId("Monitor")).toBeInTheDocument();
    expect(within(light).getByTestId("Sun")).toBeInTheDocument();
    expect(within(dark).getByTestId("Moon")).toBeInTheDocument();
    expect(system.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders <ThemeToggle {...REQUIRED_PROPS} /> without its optional props by default", () => {
    render(<ThemeToggle {...REQUIRED_PROPS} />);

    expect(
      screen.queryByRole("button", { name: "Theme: System" }),
    ).not.toBeInTheDocument();
  });

  it("changes the theme when a button of <ThemeToggle {...REQUIRED_PROPS} /> is clicked", () => {
    render(<ThemeToggle {...REQUIRED_PROPS} />);
    const system = screen.getByRole("button", { name: "System" });
    const dark = screen.getByRole("button", { name: "Dark" });

    fireEvent.click(dark);

    expect(dark).toHaveAttribute("aria-pressed", "true");
    expect(system).toHaveAttribute("aria-pressed", "false");
    expect(document.head).toHaveTextContent(":root:root{color-scheme:dark;");

    fireEvent.click(system);

    expect(system).toHaveAttribute("aria-pressed", "true");
    expect(dark).toHaveAttribute("aria-pressed", "false");
    expect(document.head).not.toHaveTextContent("color-scheme");
  });
});

describe("<ThemeToggle {...REQUIRED_PROPS} /> - Custom Props", () => {
  it("renders <ThemeToggle {...REQUIRED_PROPS} /> with all its props", () => {
    render(
      <ThemeToggle
        label="Tema"
        size="lg"
        systemLabel="Sistema"
        lightLabel="Claro"
        darkLabel="Escuro"
      />,
    );
    const group = screen.getByRole("group", { name: "Tema" });

    expect(
      within(group).getByRole("button", { name: "Sistema" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(group).getByRole("button", { name: "Claro" }),
    ).toBeInTheDocument();
    expect(
      within(group).getByRole("button", { name: "Escuro" }),
    ).toBeInTheDocument();
  });

  it("renders <ThemeToggle {...REQUIRED_PROPS} /> with iconOnly, as one button that goes to the next theme", () => {
    render(
      <ThemeToggle
        label="Tema"
        iconOnly
        systemLabel="Sistema"
        lightLabel="Claro"
        darkLabel="Escuro"
      />,
    );
    const button = screen.getByRole("button");

    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(button).toHaveAccessibleName("Tema: Sistema");
    expect(button).toHaveTextContent("");
    expect(button).not.toHaveAttribute("aria-pressed");
    expect(within(button).getByTestId("Monitor")).toBeInTheDocument();

    fireEvent.click(button);

    expect(button).toHaveAccessibleName("Tema: Claro");
    expect(within(button).getByTestId("Sun")).toBeInTheDocument();
    expect(document.head).toHaveTextContent(":root:root{color-scheme:light;");

    fireEvent.click(button);

    expect(button).toHaveAccessibleName("Tema: Escuro");
    expect(within(button).getByTestId("Moon")).toBeInTheDocument();
    expect(document.head).toHaveTextContent(":root:root{color-scheme:dark;");

    fireEvent.click(button);

    expect(button).toHaveAccessibleName("Tema: Sistema");
    expect(document.head).not.toHaveTextContent("color-scheme");
  });
});

describe("<ThemeToggle {...REQUIRED_PROPS} /> - Styles", () => {
  it("renders <ThemeToggle {...REQUIRED_PROPS} /> with size lg", () => {
    render(<ThemeToggle {...REQUIRED_PROPS} size="lg" />);
    const system = screen.getByRole("button", { name: "System" });

    expect(system).toHaveClass("p-2");
  });

  it("renders <ThemeToggle {...REQUIRED_PROPS} /> in the color of the text around it, with the theme in use marked and a visible focus outline", () => {
    render(<ThemeToggle {...REQUIRED_PROPS} />);
    const system = screen.getByRole("button", { name: "System" });

    expect(system).toHaveClass("text-current");
    expect(system).toHaveClass("aria-pressed:bg-neutral-500/30");
    expect(system).toHaveClass("focus-visible:outline-2");
    expect(system).not.toHaveClass("focus:outline-none");
  });
});
