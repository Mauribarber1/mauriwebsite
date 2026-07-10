const WHATSAPP_NUMBER = "34664301664";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type WhatsAppButtonProps = {
  message: string;
  label: string;
  variant?: "floating" | "inline";
};

export default function WhatsAppButton({
  message,
  label,
  variant = "inline",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.607 1.902 6.474L4 29l7.73-2.028A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm6.593 17.06c-.277.78-1.377 1.437-2.257 1.622-.601.126-1.386.226-4.03-.865-3.377-1.398-5.554-4.816-5.723-5.04-.168-.224-1.368-1.82-1.368-3.472 0-1.652.868-2.463 1.176-2.8.309-.336.673-.42.898-.42.225 0 .449.002.645.012.207.01.485-.079.759.58.28.673.951 2.325 1.034 2.494.084.169.14.365.028.588-.112.224-.168.365-.336.56-.168.196-.353.437-.505.588-.168.169-.343.353-.148.693.196.336.868 1.432 1.863 2.32 1.28 1.141 2.359 1.494 2.694 1.663.336.169.532.14.729-.084.196-.224.84-.98 1.064-1.316.224-.336.448-.28.756-.168.309.112 1.96.924 2.296 1.092.336.168.56.252.645.393.084.14.084.812-.193 1.593Z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-gold hover:text-ink"
    >
      {label}
    </a>
  );
}
