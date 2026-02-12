import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WhatsAppButton } from "./whatsapp-button";

const mockOpen = vi.fn();
const mockAssign = vi.fn();
const originalNavigator = window.navigator;
const originalLocation = window.location;

Object.defineProperty(window, "open", { value: mockOpen, configurable: true });

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

afterEach(() => {
  Object.defineProperty(window, "navigator", {
    value: originalNavigator,
    configurable: true,
  });
  Object.defineProperty(window, "location", {
    value: originalLocation,
    configurable: true,
  });
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

  it("falls back to location.href when assign is not available", () => {
    setUserAgent("Mozilla/5.0 (Android 14; Mobile)");
    const locationObj: Record<string, string> = { href: "" };
    Object.defineProperty(window, "location", {
      value: locationObj,
      configurable: true,
    });

    render(<WhatsAppButton phone="5511999999999" message="Hello" />);

    fireEvent.click(screen.getByRole("button"));

    expect(locationObj.href).toBe(
      "whatsapp-business://send?phone=5511999999999&text=Hello",
    );
  });

  it("opens WhatsApp Business on mobile without message", () => {
    setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)");
    Object.defineProperty(window, "location", {
      value: { assign: mockAssign },
      configurable: true,
    });

    render(<WhatsAppButton phone="5511999999999" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockAssign).toHaveBeenCalledWith(
      "whatsapp-business://send?phone=5511999999999",
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
    const handleClick = vi.fn();
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

  it("handles missing userAgent gracefully", () => {
    Object.defineProperty(window, "navigator", {
      value: {},
      configurable: true,
    });
    Object.defineProperty(window, "open", {
      value: mockOpen,
      configurable: true,
    });

    render(<WhatsAppButton phone="5511999999999" message="Hello" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockOpen).toHaveBeenCalledWith(
      "https://wa.me/5511999999999?text=Hello",
      "_blank",
    );
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
