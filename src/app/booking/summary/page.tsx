import type { Metadata } from "next";
import { SummaryStep } from "@/components/booking/SummaryStep";

export const metadata: Metadata = { title: "Summary & payment" };

export default function BookingSummaryPage() {
  return <SummaryStep />;
}
