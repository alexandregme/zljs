import { Button } from "../button";
import type { WhatsAppButtonProps } from "./whatsapp-button.interface";
import {
  whatsappBusinessUrl,
  whatsappMobileUserAgent,
  whatsappWebUrl,
} from "./whatsapp-button.const";

export const WhatsAppButton = ({
  phone,
  message,
  children = "WhatsApp",
  onClick,
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const userAgent = navigator?.userAgent ?? "";
    const isMobile = whatsappMobileUserAgent.test(userAgent);
    const hasMessage = Boolean(message);
    const encodedMessage = hasMessage ? encodeURIComponent(message!) : "";
    const webUrl = hasMessage
      ? `${whatsappWebUrl}/${phone}?text=${encodedMessage}`
      : `${whatsappWebUrl}/${phone}`;
    const businessUrl = hasMessage
      ? `${whatsappBusinessUrl}?phone=${phone}&text=${encodedMessage}`
      : `${whatsappBusinessUrl}?phone=${phone}`;

    if (isMobile) {
      if (window.location?.assign) {
        window.location.assign(businessUrl);
      } else {
        window.location.href = businessUrl;
      }
    } else {
      window.open(webUrl, "_blank");
    }
    onClick?.();
  };

  return (
    <Button color="success" icon="SiWhatsapp" onClick={handleClick}>
      {children}
    </Button>
  );
};
