import { act, fireEvent, render, screen } from "@testing-library/react";
import { appInitialState, InstallAppButton, useAppStore } from "@zljs/core";

const REQUIRED_PROPS = {
  way: "prompt",
  onPrompt: () => {},
} as const;

// The instructions modal opens through `useAppStore`, which every test shares.
afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
  });
});

describe("<InstallAppButton /> - Default Props", () => {
  it("renders <InstallAppButton /> correctly", () => {
    render(<InstallAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Install app" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Install app");
    expect(button).toHaveTextContent("");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onPrompt when <InstallAppButton /> is clicked", () => {
    const handlePrompt = vi.fn();
    render(<InstallAppButton {...REQUIRED_PROPS} onPrompt={handlePrompt} />);
    const button = screen.getByRole("button", { name: "Install app" });

    fireEvent.click(button);

    expect(handlePrompt).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("<InstallAppButton /> - Custom Props", () => {
  it("renders <InstallAppButton /> with way instructions", () => {
    const handlePrompt = vi.fn();
    render(<InstallAppButton way="instructions" onPrompt={handlePrompt} />);
    const button = screen.getByRole("button", { name: "Install app" });

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Install this app" });

    expect(dialog).toHaveAccessibleDescription(
      "Tap the Share button of the browser, then Add to Home Screen.",
    );
    expect(handlePrompt).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders <InstallAppButton /> with all its props", () => {
    render(
      <InstallAppButton
        way="instructions"
        label="Instalar app"
        showLabel
        size="lg"
        instructionsTitle="Instale este app"
        instructions="Toque em Compartilhar e depois em Adicionar à Tela de Início."
        onPrompt={() => {}}
      />,
    );
    const button = screen.getByRole("button", { name: "Instalar app" });

    expect(button).toHaveTextContent("Instalar app");
    expect(button).not.toHaveAttribute("aria-label");

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Instale este app" });

    expect(dialog).toHaveAccessibleDescription(
      "Toque em Compartilhar e depois em Adicionar à Tela de Início.",
    );
  });
});

describe("<InstallAppButton /> - Styles", () => {
  it("renders <InstallAppButton /> with size lg", () => {
    render(<InstallAppButton {...REQUIRED_PROPS} size="lg" />);
    const button = screen.getByRole("button", { name: "Install app" });

    expect(button).toHaveClass("p-2");
  });

  it("renders <InstallAppButton /> in the color of the text around it", () => {
    render(<InstallAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Install app" });

    expect(button).toHaveClass("text-current");
  });
});
