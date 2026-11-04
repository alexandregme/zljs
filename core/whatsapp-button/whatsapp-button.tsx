import { Button } from "../button";
import type { WhatsAppButtonProps } from "./whatsapp-button.interface";
import {
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

    // On a phone, wa.me in the same tab hands off to whichever WhatsApp app
    // is installed, WhatsApp or WhatsApp Business. The whatsapp-business://
    // scheme isn't recognized on an iPhone, even with WhatsApp Business
    // installed: Safari called it an invalid address.
    if (isMobile) {
      if (window.location?.assign) {
        window.location.assign(webUrl);
      } else {
        window.location.href = webUrl;
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
