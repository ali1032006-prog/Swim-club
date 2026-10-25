import type { Metadata } from "next";
import { ChildrenStep } from "@/components/booking/ChildrenStep";

export const metadata: Metadata = { title: "Swimmer registration" };

export default function BookingChildrenPage() {
  return <ChildrenStep />;
}
