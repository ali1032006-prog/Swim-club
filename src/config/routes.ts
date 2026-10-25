export const ROUTES = {
  home: "/",
  bookingChildren: "/booking",
  bookingSummary: "/booking/summary",
} as const;

export type BookingStep = "children" | "summary";

/** Booking steps in order. The stepper, the guards and the next/back buttons all read this. */
export const BOOKING_STEPS: readonly { id: BookingStep; href: string }[] = [
  { id: "children", href: ROUTES.bookingChildren },
  { id: "summary", href: ROUTES.bookingSummary },
];
