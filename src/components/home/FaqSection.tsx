"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Section } from "@/components/ui/Section";
import styles from "./FaqSection.module.css";

/** Ask the FAQ to open, scroll to and highlight one question. Change `key` to repeat the same one. */
export interface FaqFocusRequest {
  index: number;
  key: number;
}

export function FaqSection({ focusRequest }: { focusRequest: FaqFocusRequest | null }) {
  const { t } = useI18n();
  const items = useRef<Array<HTMLDetailsElement | null>>([]);

  useEffect(() => {
    if (!focusRequest) return;
    const details = items.current[focusRequest.index];
    if (!details) return;

    details.open = true;
    details.scrollIntoView({ behavior: "smooth", block: "center" });
    details.classList.remove(styles.flash);
    void details.offsetWidth; // restart the highlight animation
    details.classList.add(styles.flash);
    details.querySelector("summary")?.focus({ preventScroll: true });
  }, [focusRequest]);

  return (
    <Section id="faq" title={t.home.faq.title}>
      <div className={styles.faq}>
        {t.home.faq.items.map((item, index) => (
          <details
            key={item.question}
            className={styles.item}
            ref={(element) => {
              items.current[index] = element;
            }}
          >
            <summary>{item.question}</summary>
            {item.list ? (
              <div className={styles.answerGroup}>
                <p>{item.answer}</p>
                <ul className={styles.pills}>
                  {item.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>{item.answer}</p>
            )}
          </details>
        ))}
      </div>
    </Section>
  );
}
