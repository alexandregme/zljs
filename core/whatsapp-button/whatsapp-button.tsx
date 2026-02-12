import { Button } from "../button";
import { WhatsAppButtonProps } from "./whatsapp-button.interface";

export const WhatsAppButton = ({
  phone,
  message,
  children = "WhatsApp",
  onClick,
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const userAgent = navigator?.userAgent ?? "";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
    const hasMessage = Boolean(message);
    const encodedMessage = hasMessage ? encodeURIComponent(message) : "";
    const whatsappUrl = hasMessage
      ? `https://wa.me/${phone}?text=${encodedMessage}`
      : `https://wa.me/${phone}`;
    const whatsappBusinessUrl = hasMessage
      ? `whatsapp-business://send?phone=${phone}&text=${encodedMessage}`
      : `whatsapp-business://send?phone=${phone}`;

    if (isMobile) {
      if (window.location?.assign) {
        window.location.assign(whatsappBusinessUrl);
      } else {
        window.location.href = whatsappBusinessUrl;
      }
    } else {
      window.open(whatsappUrl, "_blank");
    }
    onClick?.();
  };

  return (
    <Button color="success" icon="SiWhatsapp" onClick={handleClick}>
      {children}
    </Button>
  );
};
