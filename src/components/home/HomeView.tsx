"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { FaqSection, type FaqFocusRequest } from "./FaqSection";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorksSection } from "./HowItWorksSection";
import { ScheduleSection } from "./ScheduleSection";
import { SkillsSection } from "./SkillsSection";
import styles from "./HomeView.module.css";

/** Home page. Owns the one piece of cross-section state: footer links asking the FAQ to open. */
export function HomeView() {
  const [faqRequest, setFaqRequest] = useState<FaqFocusRequest | null>(null);

  return (
    <>
      <Hero />
      <Container className={styles.body}>
        <SkillsSection />
        <HowItWorksSection />
        <ScheduleSection />
        <FaqSection focusRequest={faqRequest} />
      </Container>
      <Footer
        onFaqSelect={(index) => setFaqRequest((previous) => ({ index, key: (previous?.key ?? 0) + 1 }))}
      />
    </>
  );
}
