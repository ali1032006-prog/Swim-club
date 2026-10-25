"use client";

import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/config/routes";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { focusChildProblem } from "@/lib/dom";
import { useBooking } from "@/providers/BookingProvider";
import { useI18n } from "@/providers/I18nProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ErrorText } from "@/components/ui/ErrorText";
import { PanelNote, PanelTitle } from "@/components/ui/Panel";
import { ChildCard } from "./ChildCard";
import { PriceBreakdown } from "./PriceBreakdown";
import { StepNav, StepView } from "./StepView";
import styles from "./ChildrenStep.module.css";

export function ChildrenStep() {
  const { t } = useI18n();
  const booking = useBooking();
  const goToStep = useStepNavigation();
  const heading = useRef<HTMLHeadingElement>(null);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const { children, problems, childrenChecked } = booking;
  const { errors } = t.booking;

  // On arrival, focus the heading, or the first problem when we were sent back here to fix one.
  const arrival = useRef({ checked: childrenChecked, problem: problems[0] });
  useEffect(() => {
    const { checked, problem } = arrival.current;
    if (checked && problem) focusChildProblem(problem);
    else heading.current?.focus({ preventScroll: true });
  }, []);

  const problemText = childrenChecked
    ? problems
        .map((problem) =>
          problem.field === "name"
            ? errors.childName(problem.position)
            : errors.childAge(problem.childName, problem.position),
        )
        .join(" ")
    : "";

  function handleAdd() {
    setLastAddedId(booking.nextChildId);
    booking.addChild();
  }

  return (
    <StepView>
      <section aria-labelledby="children-title">
        <PanelTitle id="children-title" ref={heading} tabIndex={-1}>
          {t.booking.children.title}
        </PanelTitle>
        <PanelNote>{t.booking.children.note}</PanelNote>

        <div className={styles.list}>
          {children.map((child, index) => (
            <ChildCard
              key={child.id}
              child={child}
              position={index + 1}
              canRemove={children.length > 1}
              autoFocusName={child.id === lastAddedId}
              onChange={(patch) => booking.updateChild(child.id, patch)}
              onRemove={() => booking.removeChild(child.id)}
            />
          ))}
        </div>

        <Button variant="ghost" className={styles.add} onClick={handleAdd}>
          {t.booking.children.add}
        </Button>

        <PriceBreakdown />
        <ErrorText className={styles.error}>{problemText}</ErrorText>
      </section>

      <StepNav>
        <ButtonLink href={ROUTES.home} variant="ghost">
          {t.common.home}
        </ButtonLink>
        <Button onClick={() => goToStep("summary")}>{t.booking.children.next}</Button>
      </StepNav>
    </StepView>
  );
}
