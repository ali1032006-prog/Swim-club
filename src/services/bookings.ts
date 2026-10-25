import type { PeriodId, TimeSlotId } from "@/config/season";
import type { ParentDetails } from "@/types/booking";

export interface BookingRequest {
  parent: ParentDetails;
  children: Array<{ name: string; dob: string; period: PeriodId; time: TimeSlotId }>;
}

/**
 * Stand-in for the club's booking API. Swap the body for a real `fetch("/api/bookings", …)`
 * (or a Server Action) when the back end exists; the callers only rely on this signature.
 */
export async function submitBooking(request: BookingRequest): Promise<void> {
  void request;
  const delay = 900 + Math.random() * 600;
  await new Promise((resolve) => setTimeout(resolve, delay));
}
