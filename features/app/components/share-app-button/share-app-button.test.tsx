import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { restoreBrowserStubs, stubClipboard, stubShare } from "@test-utils";
import { ShareAppButton, useToastStore } from "@zljs/core";

// Lets the share or the copy that a click started finish.
const settle = (): Promise<void> => act(async () => {});

// The toasts go to `useToastStore`, which every test shares.
afterEach(() => {
  restoreBrowserStubs();
  useToastStore.setState({ toasts: [] });
});

describe("<ShareAppButton /> - Default Props", () => {
  it("renders <ShareAppButton /> correctly", () => {
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Share app");
    expect(button).toHaveTextContent("");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("shares the origin and the title of the page when <ShareAppButton /> is clicked", async () => {
    const share = stubShare();
    const writeText = stubClipboard();
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);
    await settle();

    expect(share).toHaveBeenCalledTimes(1);
    expect(share).toHaveBeenCalledWith({
      title: document.title,
      text: undefined,
      url: window.location.origin,
    });
    expect(writeText).not.toHaveBeenCalled();
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it("copies the origin of the page when <ShareAppButton /> is clicked in a browser with no share dialog", async () => {
    const writeText = stubClipboard();
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(writeText).toHaveBeenCalledWith(window.location.origin);
    expect(useToastStore.getState().toasts[0]).toMatchObject({
      message: "Link copied",
      type: "success",
    });
  });

  it("sends the error toast when <ShareAppButton /> can neither share nor copy", async () => {
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(useToastStore.getState().toasts[0]).toMatchObject({
      message: "Could not share the link",
      type: "error",
    });
  });
});

describe("<ShareAppButton /> - Custom Props", () => {
  it("renders <ShareAppButton /> with all its props", async () => {
    const share = stubShare();
    render(
      <ShareAppButton
        label="Compartilhar app"
        showLabel
        size="lg"
        title="Entregas"
        text="Entre e peça acesso"
        copiedMessage="Link copiado"
        errorMessage="Não deu pra compartilhar"
      />,
    );
    const button = screen.getByRole("button", { name: "Compartilhar app" });

    expect(button).toHaveTextContent("Compartilhar app");
    expect(button).not.toHaveAttribute("aria-label");

    fireEvent.click(button);
    await settle();

    expect(share).toHaveBeenCalledWith({
      title: "Entregas",
      text: "Entre e peça acesso",
      url: window.location.origin,
    });
  });

  it("renders <ShareAppButton /> with copiedMessage in a browser with no share dialog", async () => {
    const writeText = stubClipboard();
    render(<ShareAppButton copiedMessage="Link copiado" />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(writeText).toHaveBeenCalledWith(window.location.origin);
    expect(useToastStore.getState().toasts[0]?.message).toBe("Link copiado");
  });

  it("renders <ShareAppButton /> with errorMessage when the clipboard refuses", async () => {
    stubClipboard("reject");
    render(<ShareAppButton errorMessage="Não deu pra compartilhar" />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(useToastStore.getState().toasts[0]?.message).toBe(
      "Não deu pra compartilhar",
    );
  });

  it("copies the address when the browser refuses the share of <ShareAppButton />", async () => {
    const share = stubShare("reject");
    const writeText = stubClipboard();
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(share).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(window.location.origin);
  });

  it("does nothing more when the user closes the share dialog of <ShareAppButton />", async () => {
    const share = stubShare("cancel");
    const writeText = stubClipboard();
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);
    await settle();

    expect(share).toHaveBeenCalledTimes(1);
    expect(writeText).not.toHaveBeenCalled();
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});

describe("<ShareAppButton /> - Styles", () => {
  it("renders <ShareAppButton /> with size lg", () => {
    render(<ShareAppButton size="lg" />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toHaveClass("p-2");
  });

  it("renders <ShareAppButton /> in the color of the text around it, with a visible focus outline", () => {
    render(<ShareAppButton />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toHaveClass("text-current");
    expect(button).toHaveClass("focus-visible:outline-2");
    expect(button).not.toHaveClass("focus:outline-none");
  });
});
