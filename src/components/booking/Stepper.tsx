"use client";

import { usePathname } from "next/navigation";
import { BOOKING_STEPS } from "@/config/routes";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { cx } from "@/lib/cx";
import { useI18n } from "@/providers/I18nProvider";
import { Container } from "@/components/ui/Container";
import styles from "./Stepper.module.css";

/** Progress tabs for the booking steps. The current step comes from the URL. */
export function Stepper() {
  const { t } = useI18n();
  const pathname = usePathname();
  const goToStep = useStepNavigation();

  const currentIndex = Math.max(
    0,
    BOOKING_STEPS.findIndex((step) => step.href === pathname),
  );

  return (
    <Container as="nav" className={styles.wrap} aria-label={t.booking.stepsAria}>
      <ol className={styles.steps}>
        {BOOKING_STEPS.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              className={cx(styles.step, index < currentIndex && styles.done)}
              aria-current={index === currentIndex ? "step" : undefined}
              onClick={() => goToStep(step.id)}
            >
              <span className={styles.number}>{index + 1}</span>
              <span className={styles.label}>{t.booking.steps[step.id]}</span>
            </button>
          </li>
        ))}
      </ol>
    </Container>
  );
}
