"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/config/routes";
import { useFocusOnMount } from "@/hooks/useFocusOnMount";
import { useParentForm } from "@/hooks/useParentForm";
import { useBooking } from "@/providers/BookingProvider";
import { useI18n } from "@/providers/I18nProvider";
import { submitBooking } from "@/services/bookings";
import { Button } from "@/components/ui/Button";
import { BookingSummary } from "./BookingSummary";
import { ParentDetailsCard } from "./ParentDetailsCard";
import { StepNav, StepView } from "./StepView";
import styles from "./SummaryStep.module.css";

export function SummaryStep() {
  const router = useRouter();
  const { t } = useI18n();
  const booking = useBooking();
  const form = useParentForm();
  const heading = useFocusOnMount<HTMLHeadingElement>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const hasProblems = booking.problems.length > 0;

  // Reached directly (or after a refresh) without valid children: send them back to fix it.
  const { markChildrenChecked } = booking;
  useEffect(() => {
    if (!hasProblems) return;
    markChildrenChecked();
    router.replace(ROUTES.bookingChildren);
  }, [hasProblems, markChildrenChecked, router]);

  if (hasProblems) return null;

  async function handleConfirm() {
    if (submitting) return;
    if (!form.validateAll()) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitBooking({
        parent: booking.parent,
        children: booking.children.map(({ name, dob, period, time }) => ({ name, dob, period, time })),
      });
      booking.confirm();
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StepView>
      <div className={styles.grid}>
        <ParentDetailsCard form={form} headingRef={heading} onSubmit={handleConfirm} />
        <BookingSummary submitting={submitting} submitError={submitError} onConfirm={handleConfirm} />
      </div>
      <StepNav end={false}>
        <Button variant="ghost" onClick={() => router.push(ROUTES.bookingChildren)}>
          {t.common.back}
        </Button>
      </StepNav>
    </StepView>
  );
}
