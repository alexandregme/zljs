import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Toaster, toast, useToastStore } from "@zljs/core";
import { restoreBrowserStubs, stubClipboard } from "@test-utils";

const MESSAGE = "Saved";
const ERROR_MESSAGE = "Couldn't save";
const ERROR_DESCRIPTION = "The server answered 500.";

afterEach(restoreBrowserStubs);

describe("<Toaster /> - Default Props", () => {
  it("renders <Toaster /> correctly", () => {
    render(<Toaster />);
    const region = screen.getByRole("region", { name: /Notifications/ });

    expect(region).toHaveAttribute("aria-live", "polite");
  });

  it("renders <Toaster /> without toasts by default", () => {
    render(<Toaster />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});

describe("<Toaster /> - Custom Props", () => {
  it("renders <Toaster /> with one toast per type of the store", async () => {
    render(<Toaster />);

    act(() => {
      const store = useToastStore.getState();
      store.success("Success message");
      store.error("Error message");
      store.info("Info message");
      store.warning("Warning message");
    });
    await screen.findByText("Warning message");
    const toasts = screen.getAllByRole("listitem");

    expect(toasts.map((item) => item.getAttribute("data-type")).sort()).toEqual(
      ["error", "info", "success", "warning"],
    );
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByText("Info message")).toBeInTheDocument();
    expect(screen.getByText("Warning message")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("button", { name: "Copy" })
        .map((button) =>
          button.closest("[data-type]")?.getAttribute("data-type"),
        )
        .sort(),
    ).toEqual(["error", "warning"]);
  });

  it("renders <Toaster /> without a copy button on a toast whose message is not text", async () => {
    render(<Toaster />);

    toast.error(<strong>{ERROR_MESSAGE}</strong>);
    await screen.findByText(ERROR_MESSAGE);

    expect(
      screen.queryByRole("button", { name: "Copy" }),
    ).not.toBeInTheDocument();
  });

  it("copies the message and description when the copy button in <Toaster /> is clicked", async () => {
    const writeText = stubClipboard();
    render(<Toaster />);

    toast.error(ERROR_MESSAGE, { description: ERROR_DESCRIPTION });
    const copy = await screen.findByRole("button", { name: "Copy" });

    fireEvent.click(copy);

    expect(
      await screen.findByRole("button", { name: "Copied" }),
    ).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith(
      `${ERROR_MESSAGE}\n${ERROR_DESCRIPTION}`,
    );
  });

  it("copies only the message when the toast in <Toaster /> has no text description", async () => {
    const writeText = stubClipboard();
    render(<Toaster />);

    toast.warning(ERROR_MESSAGE, {
      description: <em>{ERROR_DESCRIPTION}</em>,
    });
    const copy = await screen.findByRole("button", { name: "Copy" });

    fireEvent.click(copy);

    expect(
      await screen.findByRole("button", { name: "Copied" }),
    ).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith(ERROR_MESSAGE);
  });

  it("keeps the copy button of <Toaster /> on Copy when the clipboard refuses", async () => {
    const writeText = stubClipboard("reject");
    render(<Toaster />);

    toast.error(ERROR_MESSAGE);
    const copy = await screen.findByRole("button", { name: "Copy" });

    fireEvent.click(copy);
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));

    expect(copy).toHaveAccessibleName("Copy");
    expect(
      screen.queryByRole("button", { name: "Copied" }),
    ).not.toBeInTheDocument();
  });

  it("renders <Toaster /> with a store toast next to a direct toast of the same id", async () => {
    render(<Toaster />);

    const id = toast("Direct message");
    await screen.findByText("Direct message");
    act(() => {
      useToastStore.setState({
        toasts: [{ id: Number(id), message: MESSAGE, type: "success" }],
      });
    });
    await screen.findByText(MESSAGE);

    expect(screen.getByText("Direct message")).toBeInTheDocument();
  });

  it("removes the toast from the store when <Toaster /> shows it", async () => {
    render(<Toaster />);

    act(() => {
      useToastStore.getState().success(MESSAGE);
    });
    await screen.findByText(MESSAGE);

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it("closes the toast when its button in <Toaster /> is clicked", async () => {
    render(<Toaster />);

    act(() => {
      useToastStore.getState().success(MESSAGE);
    });
    await screen.findByText(MESSAGE);
    const close = screen.getByRole("button", { name: "Close toast" });

    fireEvent.click(close);

    await waitFor(() => {
      expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
    });
  });
});

describe("<Toaster /> - Styles", () => {
  it("renders <Toaster /> with the theme colors", async () => {
    render(<Toaster />);

    act(() => {
      useToastStore.getState().success(MESSAGE);
    });
    await screen.findByText(MESSAGE);
    const list = screen.getByRole("list");

    expect(list.style.getPropertyValue("--success-text")).toBe(
      "var(--color-zl-success-strong)",
    );
  });

  it("renders <Toaster /> with a focus outline on the toast and its close button", async () => {
    render(<Toaster />);

    act(() => {
      useToastStore.getState().success(MESSAGE);
    });
    await screen.findByText(MESSAGE);
    const item = screen.getByRole("listitem");
    const close = screen.getByRole("button", { name: "Close toast" });

    expect(item).toHaveClass("focus-visible:outline-2!");
    expect(close).toHaveClass("focus-visible:outline-2!");
    expect(item).not.toHaveClass("focus:outline-none");
    expect(close).not.toHaveClass("focus:outline-none");
  });
});
