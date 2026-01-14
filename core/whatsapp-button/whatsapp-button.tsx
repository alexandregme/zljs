import { Button } from "../button";
import { WhatsAppButtonProps } from "./whatsapp-button.interface";

export const WhatsAppButton = ({
  phone,
  message,
  children = "WhatsApp",
  onClick,
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    onClick?.();
  };

  return (
    <Button color="success" icon="BiLogoWhatsapp" onClick={handleClick}>
      {children}
    </Button>
  );
};
