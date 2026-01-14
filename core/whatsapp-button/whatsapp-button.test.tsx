import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WhatsAppButton } from "./whatsapp-button";

const mockOpen = jest.fn();
Object.defineProperty(window, "open", { value: mockOpen });

beforeEach(() => {
  mockOpen.mockClear();
});

describe("<WhatsAppButton /> - Default Props", () => {
  it("renders WhatsAppButton correctly", () => {
    render(<WhatsAppButton phone="5511999999999" message="Hello" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with WhatsApp text", () => {
    render(<WhatsAppButton phone="5511999999999" message="Hello" />);

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
  });
});

describe("<WhatsAppButton /> - Custom Props", () => {
  it("opens WhatsApp URL when clicked", () => {
    render(<WhatsAppButton phone="5511999999999" message="Hello World" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockOpen).toHaveBeenCalledWith(
      "https://wa.me/5511999999999?text=Hello%20World",
      "_blank",
    );
  });

  it("calls onClick callback when clicked", () => {
    const handleClick = jest.fn();
    render(
      <WhatsAppButton
        phone="5511999999999"
        message="Test"
        onClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders custom children", () => {
    render(
      <WhatsAppButton phone="5511999999999" message="Test">
        Enviar mensagem
      </WhatsAppButton>,
    );

    expect(screen.getByText("Enviar mensagem")).toBeInTheDocument();
  });
});
