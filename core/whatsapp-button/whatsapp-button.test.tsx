import { render, screen, fireEvent } from "@testing-library/react";
import {
  ANDROID_USER_AGENT,
  DESKTOP_USER_AGENT,
  IPHONE_USER_AGENT,
  restoreBrowserStubs,
  stubLocation,
  stubUserAgent,
  stubWindowOpen,
} from "@test-utils";
import { WhatsAppButton } from "@zljs/core";

const PHONE = "5511999999999";

afterEach(restoreBrowserStubs);

describe("<WhatsAppButton /> - Default Props", () => {
  it("renders <WhatsAppButton /> correctly", () => {
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("WhatsApp");
  });

  it("opens wa.me with phone when <WhatsAppButton /> is clicked", () => {
    stubUserAgent(DESKTOP_USER_AGENT);
    const open = stubWindowOpen();
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(open).toHaveBeenCalledWith("https://wa.me/5511999999999", "_blank");
  });

  it("renders <WhatsAppButton /> without message by default", () => {
    stubUserAgent(DESKTOP_USER_AGENT);
    const open = stubWindowOpen();
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(open).toHaveBeenCalledWith(
      expect.not.stringContaining("text="),
      "_blank",
    );
  });

  it("renders <WhatsAppButton /> with children WhatsApp by default", () => {
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("WhatsApp");
  });

  it("renders <WhatsAppButton /> without onClick by default", () => {
    stubUserAgent(DESKTOP_USER_AGENT);
    stubWindowOpen();
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    expect(() => fireEvent.click(button)).not.toThrow();
  });
});

describe("<WhatsAppButton /> - Custom Props", () => {
  it("renders <WhatsAppButton /> with message", () => {
    stubUserAgent(DESKTOP_USER_AGENT);
    const open = stubWindowOpen();
    render(<WhatsAppButton phone={PHONE} message="Hello World" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(open).toHaveBeenCalledWith(
      "https://wa.me/5511999999999?text=Hello%20World",
      "_blank",
    );
  });

  it("renders <WhatsAppButton /> with message on mobile", () => {
    stubUserAgent(IPHONE_USER_AGENT);
    const assign = vi.fn();
    stubLocation({ assign });
    render(<WhatsAppButton phone={PHONE} message="Hello World" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(assign).toHaveBeenCalledWith(
      "whatsapp-business://send?phone=5511999999999&text=Hello%20World",
    );
  });

  it("renders <WhatsAppButton /> without message on mobile", () => {
    stubUserAgent(IPHONE_USER_AGENT);
    const assign = vi.fn();
    stubLocation({ assign });
    render(<WhatsAppButton phone={PHONE} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(assign).toHaveBeenCalledWith(
      "whatsapp-business://send?phone=5511999999999",
    );
  });

  it("sets location.href on mobile when location.assign is missing", () => {
    stubUserAgent(ANDROID_USER_AGENT);
    const location = { href: "" };
    stubLocation(location);
    render(<WhatsAppButton phone={PHONE} message="Hello" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(location.href).toBe(
      "whatsapp-business://send?phone=5511999999999&text=Hello",
    );
  });

  it("opens wa.me when the browser has no userAgent", () => {
    stubUserAgent(undefined as unknown as string);
    const open = stubWindowOpen();
    render(<WhatsAppButton phone={PHONE} message="Hello" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(open).toHaveBeenCalledWith(
      "https://wa.me/5511999999999?text=Hello",
      "_blank",
    );
  });

  it("renders <WhatsAppButton /> with children", () => {
    render(<WhatsAppButton phone={PHONE}>Enviar mensagem</WhatsAppButton>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Enviar mensagem");
  });

  it("calls onClick when <WhatsAppButton /> is clicked", () => {
    stubUserAgent(DESKTOP_USER_AGENT);
    stubWindowOpen();
    const handleClick = vi.fn();
    render(<WhatsAppButton phone={PHONE} onClick={handleClick} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
