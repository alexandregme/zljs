import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WhatsAppButton } from "./whatsapp-button";

const mockOpen = jest.fn();
const mockAssign = jest.fn();
Object.defineProperty(window, "open", { value: mockOpen });

const setUserAgent = (value: string) => {
  Object.defineProperty(window.navigator, "userAgent", {
    value,
    configurable: true,
  });
};

beforeEach(() => {
  mockOpen.mockClear();
  mockAssign.mockClear();
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
    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    render(<WhatsAppButton phone="5511999999999" message="Hello World" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockOpen).toHaveBeenCalledWith(
      "https://wa.me/5511999999999?text=Hello%20World",
      "_blank",
    );
  });

  it("opens WhatsApp Business on mobile", () => {
    setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)");
    Object.defineProperty(window, "location", {
      value: { assign: mockAssign },
      configurable: true,
    });

    render(<WhatsAppButton phone="5511999999999" message="Hello World" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockAssign).toHaveBeenCalledWith(
      "whatsapp-business://send?phone=5511999999999&text=Hello%20World",
    );
  });

  it("opens WhatsApp chat without text when message is empty", () => {
    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    render(<WhatsAppButton phone="5511999999999" message="" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockOpen).toHaveBeenCalledWith(
      "https://wa.me/5511999999999",
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
