import type { SVGProps } from "react";

/** Line icons on a 24px grid. They take their colour from `currentColor`. */
function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  );
}

export function SwimmerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 15c2 0 2-1.6 4.5-1.6S10 15 12 15s2-1.6 4.5-1.6S19 15 21 15M3 19c2 0 2-1.6 4.5-1.6S10 19 12 19s2-1.6 4.5-1.6S19 19 21 19" />
      <circle cx="14" cy="7" r="2.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <circle cx="12" cy="12.5" r="2.6" />
      <path d="M6.5 9.5v6M17.5 9.5v6" />
    </Icon>
  );
}
