import { act, render } from "@testing-library/react";
import { Toaster } from "./toaster";
import { useToastStore } from "@zljs/core";

vi.mock("sonner", () => ({
  Toaster: vi.fn(() => null),
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

import { Toaster as SonnerToaster, toast } from "sonner";

const resetStore = () => useToastStore.setState({ toasts: [] });

describe("<Toaster />", () => {
  beforeEach(() => {
    resetStore();
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<Toaster />);

    expect(container).toBeInTheDocument();
  });

  it("passes correct props to SonnerToaster", () => {
    render(<Toaster />);

    expect(SonnerToaster).toHaveBeenCalledWith(
      expect.objectContaining({
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        duration: 4000,
        expand: true,
        visibleToasts: 5,
      }),
      undefined,
    );
  });

  it("dispatches toasts to sonner and removes from store", () => {
    useToastStore.getState().success("Great!");

    render(<Toaster />);

    expect(toast.success).toHaveBeenCalledWith(
      "Great!",
      expect.objectContaining({ id: expect.any(Number) }),
    );
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it("dispatches multiple toasts with correct types", () => {
    useToastStore.getState().error("Fail");
    useToastStore.getState().info("FYI");

    render(<Toaster />);

    expect(toast.error).toHaveBeenCalledWith(
      "Fail",
      expect.objectContaining({ id: expect.any(Number) }),
    );
    expect(toast.info).toHaveBeenCalledWith(
      "FYI",
      expect.objectContaining({ id: expect.any(Number) }),
    );
  });

  it("passes onDismiss callback that removes toast from store", () => {
    const id = useToastStore.getState().success("Dismiss me");

    render(<Toaster />);

    const call = vi.mocked(toast.success).mock.calls[0];
    const onDismiss = (call?.[1] as { onDismiss: () => void }).onDismiss;

    act(() => {
      useToastStore.setState({
        toasts: [{ id, message: "Dismiss me", type: "success" }],
      });
    });

    act(() => {
      onDismiss();
    });

    expect(
      useToastStore.getState().toasts.find((t) => t.id === id),
    ).toBeUndefined();
  });
});
