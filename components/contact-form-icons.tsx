export type IconProps = {
  className?: string;
};

export function FormIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 12.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.8 19.2c.9-3.4 3.3-5.2 6.2-5.2s5.3 1.8 6.2 5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 4.9h1.8c.7 0 1.2.4 1.4 1l.5 1.9a1.2 1.2 0 0 1-.4 1.2L10 10.5c1.1 2.2 2.8 3.9 5 5l1.5-1.3a1.2 1.2 0 0 1 1.2-.3l1.9.5c.6.1 1 .7 1 1.4v1.7a1.7 1.7 0 0 1-1.7 1.7C11.1 20.8 3.2 12.9 4 6.1c0-.9.7-1.2 1.5-1.2H8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M7.5 18.5 4 20l1.2-3.4A8.3 8.3 0 1 1 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 9.3c.2 2.2 1.9 4 4.1 4.1l1-1a.9.9 0 0 1 .8-.2l1.2.4c.4.1.6.5.6.9v.4c0 .6-.5 1.1-1.1 1.1C11 15 7.9 12 7.9 8.3c0-.6.5-1.1 1.1-1.1h.4c.4 0 .8.2.9.6l.4 1.2a.9.9 0 0 1-.2.8l-1.7 1.2Z"
        fill="currentColor"
        opacity="0.98"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="currentColor" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.6"
        fontWeight="700"
      >
        in
      </text>
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.08" />
      <path
        d="M12 4.2c-4.3 0-7.8 3.5-7.8 7.8 0 3.4 2.2 6.3 5.3 7.4.4.1.5-.1.5-.3v-1.3c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8 0 1.2.8 1.2.8.7 1.2 1.8.8 2.3.6.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.2.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.5.7.5 1.4v2.1c0 .2.1.4.5.3 3.1-1.1 5.3-4 5.3-7.4 0-4.3-3.5-7.8-7.8-7.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ReactAtomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    </svg>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
      />
    </svg>
  );
}

export const iconToneClassName = {
  whatsapp: "text-foreground",
  phone: "text-foreground",
  linkedin: "text-foreground",
  github: "text-foreground",
} as const;
