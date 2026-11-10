import { render, screen } from "@testing-library/react";
import { Card, Text } from "@zljs/core";

const TITLE = "Orders";
const MESSAGE = "4 orders are waiting to be picked.";

describe("<Card /> - Default Props", () => {
  it("renders <Card /> correctly", () => {
    render(
      <Card>
        <Text>Content</Text>
      </Card>,
    );
    const card = screen.getByTestId("card");
    const content = screen.getByRole("paragraph");

    expect(card).toBeInTheDocument();
    expect(card).toContainElement(content);
    expect(content).toHaveTextContent("Content");
  });

  it("renders <Card /> without its optional props by default", () => {
    render(
      <Card>
        <Text>Content</Text>
      </Card>,
    );
    const title = screen.queryByRole("heading");
    const paragraphs = screen.getAllByRole("paragraph");

    expect(title).not.toBeInTheDocument();
    expect(paragraphs).toHaveLength(1);
  });
});

describe("<Card /> - Custom Props", () => {
  it("renders <Card /> with all its props", () => {
    render(
      <Card title={TITLE} titleLevel={1} message={MESSAGE}>
        <Text>Content</Text>
      </Card>,
    );
    const card = screen.getByTestId("card");
    const title = screen.getByRole("heading", { level: 1, name: TITLE });
    const message = screen.getByText(MESSAGE);

    expect(card).toContainElement(title);
    expect(card).toContainElement(message);
  });

  it("renders <Card /> with title at level 2 when titleLevel is not set", () => {
    render(
      <Card title={TITLE}>
        <Text>Content</Text>
      </Card>,
    );
    const title = screen.getByRole("heading", { level: 2, name: TITLE });
    const paragraphs = screen.getAllByRole("paragraph");

    expect(title).toBeInTheDocument();
    expect(paragraphs).toHaveLength(1);
  });

  it("renders <Card /> with message and no title", () => {
    render(
      <Card message={MESSAGE}>
        <Text>Content</Text>
      </Card>,
    );
    const message = screen.getByText(MESSAGE);
    const title = screen.queryByRole("heading");

    expect(message).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
  });
});

describe("<Card /> - Styles", () => {
  it("renders <Card /> with color none by default", () => {
    render(
      <Card message={MESSAGE}>
        <Text>Content</Text>
      </Card>,
    );
    const card = screen.getByTestId("card");
    const message = screen.getByText(MESSAGE);

    expect(card).toHaveClass("border-gray-200", "bg-white", "shadow-black/12");
    expect(message).toHaveClass("text-zl-muted");
  });

  it("renders <Card /> with color warning", () => {
    render(
      <Card message={MESSAGE} color="warning">
        <Text>Content</Text>
      </Card>,
    );
    const card = screen.getByTestId("card");
    const message = screen.getByText(MESSAGE);

    expect(card).toHaveClass(
      "border-zl-warning",
      "bg-zl-warning/15",
      "shadow-zl-warning/20",
    );
    expect(card).not.toHaveClass("bg-white");
    expect(card).not.toHaveClass("shadow-black/12");
    expect(message).not.toHaveClass("text-zl-muted");
  });
});
