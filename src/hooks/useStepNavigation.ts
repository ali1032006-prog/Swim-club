"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BOOKING_STEPS, type BookingStep } from "@/config/routes";
import { focusChildProblem } from "@/lib/dom";
import { useBooking } from "@/providers/BookingProvider";

/**
 * Single place that decides whether the visitor may move to a booking step.
 * Going to the summary requires valid children; otherwise errors are revealed and the
 * first problem is focused.
 */
export function useStepNavigation() {
  const router = useRouter();
  const { problems, markChildrenChecked } = useBooking();

  return useCallback(
    (step: BookingStep) => {
      if (step === "summary" && problems.length > 0) {
        markChildrenChecked();
        focusChildProblem(problems[0]);
        return;
      }
      const target = BOOKING_STEPS.find((candidate) => candidate.id === step);
      if (target) router.push(target.href);
    },
    [problems, markChildrenChecked, router],
  );
}
