import type { ReactNode } from "react";
import { SeasonBanner } from "@/components/booking/SeasonBanner";
import { Stepper } from "@/components/booking/Stepper";
import { Container } from "@/components/ui/Container";
import styles from "./layout.module.css";

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeasonBanner />
      <Stepper />
      <Container as="main" className={styles.main}>
        {children}
      </Container>
    </>
  );
}
