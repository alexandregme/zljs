import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Tabs, Text } from "@zljs/core";
import type { TabsItem } from "@zljs/core";

const LABEL = "Orders by state";
const TABS: TabsItem[] = [
  { id: "open", label: "Open", children: <Text>Open orders</Text> },
  { id: "sent", label: "Sent", children: <Text>Sent orders</Text> },
];
const TABS_WITH_ALL_PROPS: TabsItem[] = [
  {
    id: "open",
    label: "Open",
    subtitle: "Waiting to be picked",
    count: 4,
    children: <Text>Open orders</Text>,
  },
  {
    id: "sent",
    label: "Sent",
    subtitle: "On the way",
    count: 0,
    children: <Text>Sent orders</Text>,
  },
];

describe("<Tabs /> - Default Props", () => {
  it("renders <Tabs /> correctly", () => {
    render(<Tabs tabs={TABS} aria-label={LABEL} />);
    const list = screen.getByRole("tablist", { name: LABEL });
    const open = screen.getByRole("tab", { name: "Open" });
    const sent = screen.getByRole("tab", { name: "Sent" });
    const panel = screen.getByRole("tabpanel", { name: "Open" });

    expect(list).toBeInTheDocument();
    expect(list).toContainElement(open);
    expect(list).toContainElement(sent);
    expect(open).toHaveAttribute("aria-selected", "true");
    expect(sent).toHaveAttribute("aria-selected", "false");
    expect(panel).toHaveTextContent("Open orders");
  });

  it("renders <Tabs /> without its optional props by default", () => {
    render(<Tabs tabs={TABS} aria-label={LABEL} />);
    const open = screen.getByRole("tab", { name: "Open" });
    const sent = screen.getByRole("tab", { name: "Sent" });
    const texts = within(open).getAllByTestId("text");
    const count = screen.queryByTestId("tag");
    const sentPanel = screen.queryByText("Sent orders");

    expect(texts).toHaveLength(1);
    expect(count).not.toBeInTheDocument();
    expect(sentPanel).not.toBeInTheDocument();
    expect(() => fireEvent.mouseDown(sent)).not.toThrow();
    expect(() => fireEvent.mouseDown(open)).not.toThrow();
  });
});

describe("<Tabs /> - Custom Props", () => {
  it("renders <Tabs /> with all its props", () => {
    const handleChange = vi.fn();
    render(
      <Tabs
        tabs={TABS_WITH_ALL_PROPS}
        aria-label={LABEL}
        defaultTab="sent"
        onChange={handleChange}
      />,
    );
    const open = screen.getByRole("tab", { name: /^Open/ });
    const sent = screen.getByRole("tab", { name: /^Sent/ });
    const panel = screen.getByRole("tabpanel", { name: /^Sent/ });

    expect(open).toHaveTextContent("Open");
    expect(open).toHaveTextContent("Waiting to be picked");
    expect(open).toHaveTextContent("4");
    expect(sent).toHaveTextContent("On the way");
    expect(sent).toHaveTextContent("0");
    expect(sent).toHaveAttribute("aria-selected", "true");
    expect(panel).toHaveTextContent("Sent orders");
    expect(open).toHaveAttribute("aria-selected", "false");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("shows the panel and calls onChange when a tab of <Tabs /> is clicked", () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={TABS} aria-label={LABEL} onChange={handleChange} />);
    const open = screen.getByRole("tab", { name: "Open" });
    const sent = screen.getByRole("tab", { name: "Sent" });

    fireEvent.mouseDown(sent);

    const panel = screen.getByRole("tabpanel", { name: "Sent" });
    const openPanel = screen.queryByText("Open orders");

    expect(sent).toHaveAttribute("aria-selected", "true");
    expect(panel).toHaveTextContent("Sent orders");
    expect(open).toHaveAttribute("aria-selected", "false");
    expect(openPanel).not.toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("moves to the next tab of <Tabs /> with the arrow key", async () => {
    render(<Tabs tabs={TABS} aria-label={LABEL} />);
    const open = screen.getByRole("tab", { name: "Open" });
    const sent = screen.getByRole("tab", { name: "Sent" });

    open.focus();
    fireEvent.keyDown(open, { key: "ArrowRight" });

    await waitFor(() => expect(sent).toHaveFocus());
    expect(sent).toHaveAttribute("aria-selected", "true");
  });
});

describe("<Tabs /> - Styles", () => {
  it("renders <Tabs /> with a visible focus outline on each tab", () => {
    render(<Tabs tabs={TABS} aria-label={LABEL} />);
    const open = screen.getByRole("tab", { name: "Open" });

    expect(open).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(open).not.toHaveClass("focus:outline-none");
  });
});
