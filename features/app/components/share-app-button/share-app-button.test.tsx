import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { restoreBrowserStubs, stubClipboard, stubShare } from "@test-utils";
import { ShareAppButton, useToastStore } from "@zljs/core";

const REQUIRED_PROPS = { label: "Share app" };

// Lets the share or the copy that a click started finish.
const settle = (): Promise<void> => act(async () => {});

// The toasts go to `useToastStore`, which every test shares.
afterEach(() => {
  restoreBrowserStubs();
  useToastStore.setState({ toasts: [] });
});

describe("<ShareAppButton {...REQUIRED_PROPS} /> - Default Props", () => {
  it("renders <ShareAppButton {...REQUIRED_PROPS} /> correctly", () => {
    render(<ShareAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Share app");
    expect(button).not.toHaveAttribute("aria-label");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("shares the origin and the title of the page when <ShareAppButton {...REQUIRED_PROPS} /> is clicked", async () => {
    const share = stubShare();
    const writeText = stubClipboard();
    render(<ShareAppButton {...REQUIRED_PROPS} />);
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

  it("copies the origin of the page when <ShareAppButton {...REQUIRED_PROPS} /> is clicked in a browser with no share dialog", async () => {
    const writeText = stubClipboard();
    render(<ShareAppButton {...REQUIRED_PROPS} />);
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

  it("sends the error toast when <ShareAppButton {...REQUIRED_PROPS} /> can neither share nor copy", async () => {
    render(<ShareAppButton {...REQUIRED_PROPS} />);
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

describe("<ShareAppButton {...REQUIRED_PROPS} /> - Custom Props", () => {
  it("renders <ShareAppButton {...REQUIRED_PROPS} /> with all its props", async () => {
    const share = stubShare();
    render(
      <ShareAppButton
        label="Compartilhar app"
        iconOnly
        size="lg"
        title="Entregas"
        text="Entre e peça acesso"
        copiedMessage="Link copiado"
        errorMessage="Não deu pra compartilhar"
      />,
    );
    const button = screen.getByRole("button", { name: "Compartilhar app" });

    expect(button).toHaveAttribute("aria-label", "Compartilhar app");
    expect(button).toHaveTextContent("");

    fireEvent.click(button);
    await settle();

    expect(share).toHaveBeenCalledWith({
      title: "Entregas",
      text: "Entre e peça acesso",
      url: window.location.origin,
    });
  });

  it("renders <ShareAppButton {...REQUIRED_PROPS} /> with copiedMessage in a browser with no share dialog", async () => {
    const writeText = stubClipboard();
    render(<ShareAppButton {...REQUIRED_PROPS} copiedMessage="Link copiado" />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(writeText).toHaveBeenCalledWith(window.location.origin);
    expect(useToastStore.getState().toasts[0]?.message).toBe("Link copiado");
  });

  it("renders <ShareAppButton {...REQUIRED_PROPS} /> with errorMessage when the clipboard refuses", async () => {
    stubClipboard("reject");
    render(
      <ShareAppButton
        {...REQUIRED_PROPS}
        errorMessage="Não deu pra compartilhar"
      />,
    );
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(useToastStore.getState().toasts[0]?.message).toBe(
      "Não deu pra compartilhar",
    );
  });

  it("copies the address when the browser refuses the share of <ShareAppButton {...REQUIRED_PROPS} />", async () => {
    const share = stubShare("reject");
    const writeText = stubClipboard();
    render(<ShareAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(share).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(window.location.origin);
  });

  it("does nothing more when the user closes the share dialog of <ShareAppButton {...REQUIRED_PROPS} />", async () => {
    const share = stubShare("cancel");
    const writeText = stubClipboard();
    render(<ShareAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Share app" });

    fireEvent.click(button);
    await settle();

    expect(share).toHaveBeenCalledTimes(1);
    expect(writeText).not.toHaveBeenCalled();
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});

describe("<ShareAppButton {...REQUIRED_PROPS} /> - Styles", () => {
  it("renders <ShareAppButton {...REQUIRED_PROPS} /> with size lg", () => {
    render(<ShareAppButton {...REQUIRED_PROPS} size="lg" />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toHaveClass("text-base");
  });

  it("renders <ShareAppButton {...REQUIRED_PROPS} /> in the color of the text around it, with a visible focus outline", () => {
    render(<ShareAppButton {...REQUIRED_PROPS} />);
    const button = screen.getByRole("button", { name: "Share app" });

    expect(button).toHaveClass("text-current");
    expect(button).toHaveClass("focus-visible:outline-2");
    expect(button).not.toHaveClass("focus:outline-none");
  });
});
