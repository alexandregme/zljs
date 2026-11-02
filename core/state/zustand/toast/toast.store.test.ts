import { useToastStore } from "./toast.store";

const reset = () => useToastStore.setState({ toasts: [] });

describe("ToastStore", () => {
  beforeEach(() => reset());

  it("starts with empty toasts", () => {
    expect(useToastStore.getState().toasts).toEqual([]);
  });

  it("adds a toast with default type error", () => {
    useToastStore.getState().addToast("Something failed");
    const [toast] = useToastStore.getState().toasts;

    expect(toast).toBeDefined();
    expect(toast!.message).toBe("Something failed");
    expect(toast!.type).toBe("error");
  });

  it("adds a toast with custom type", () => {
    useToastStore.getState().addToast("Done", "success");
    const [toast] = useToastStore.getState().toasts;

    expect(toast!.type).toBe("success");
  });

  it("returns the toast id", () => {
    const id = useToastStore.getState().addToast("Test");
    const [toast] = useToastStore.getState().toasts;

    expect(typeof id).toBe("number");
    expect(toast!.id).toBe(id);
  });

  it("removes a toast by id", () => {
    const id = useToastStore.getState().addToast("To remove");
    useToastStore.getState().removeToast(id);

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it("success() adds a success toast", () => {
    useToastStore.getState().success("Yay");
    const [toast] = useToastStore.getState().toasts;

    expect(toast!.type).toBe("success");
    expect(toast!.message).toBe("Yay");
  });

  it("error() adds an error toast", () => {
    useToastStore.getState().error("Oops");
    const [toast] = useToastStore.getState().toasts;

    expect(toast!.type).toBe("error");
  });

  it("info() adds an info toast", () => {
    useToastStore.getState().info("FYI");
    const [toast] = useToastStore.getState().toasts;

    expect(toast!.type).toBe("info");
  });

  it("warning() adds a warning toast", () => {
    useToastStore.getState().warning("Cuidado");
    const [toast] = useToastStore.getState().toasts;

    expect(toast!.type).toBe("warning");
  });

  it("keeps multiple toasts in order", () => {
    useToastStore.getState().success("First");
    useToastStore.getState().error("Second");
    const toasts = useToastStore.getState().toasts;

    expect(toasts).toHaveLength(2);
    expect(toasts[0]!.message).toBe("First");
    expect(toasts[1]!.message).toBe("Second");
  });
});
