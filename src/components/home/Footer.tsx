"use client";

import { useRef, type ReactNode } from "react";
import { CLUB } from "@/config/season";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { scrollToId, scrollToTop } from "@/lib/dom";
import { useI18n } from "@/providers/I18nProvider";
import { Brand } from "@/components/ui/Brand";
import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

function FooterLink({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <li>
      <button type="button" className={styles.link} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}

function CopyPhone() {
  const { t } = useI18n();
  const { copied, copy } = useCopyToClipboard();
  const phone = useRef<HTMLElement>(null);

  async function handleCopy() {
    const ok = await copy(CLUB.frontDeskPhone);
    // Clipboard blocked: select the number so the visitor can copy it by hand.
    if (!ok && phone.current) {
      const range = document.createRange();
      range.selectNodeContents(phone.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <div className={styles.phoneRow}>
      <strong ref={phone} className={styles.phone}>
        {CLUB.frontDeskPhone}
      </strong>
      <button type="button" className={styles.copy} onClick={handleCopy}>
        {copied ? t.footer.copied : t.footer.copy}
      </button>
    </div>
  );
}

interface FooterProps {
  onFaqSelect: (index: number) => void;
}

export function Footer({ onFaqSelect }: FooterProps) {
  const { t } = useI18n();
  const { footer } = t;

  return (
    <footer className={styles.footer}>
      <Container className={styles.columns}>
        <div className={styles.brand}>
          <Brand />
        </div>

        <nav className={styles.column} aria-labelledby="footer-links-title">
          <h3 id="footer-links-title">{footer.quickLinks}</h3>
          <ul>
            <FooterLink onClick={scrollToTop}>{footer.backToTop}</FooterLink>
            <FooterLink onClick={() => scrollToId("skills")}>{t.home.skills.title}</FooterLink>
            <FooterLink onClick={() => scrollToId("how")}>{footer.howItWorks}</FooterLink>
            <FooterLink onClick={() => scrollToId("schedule")}>{footer.winterCalendar}</FooterLink>
            <FooterLink onClick={() => scrollToId("fees")}>{t.home.how.fees.title}</FooterLink>
          </ul>
        </nav>

        <nav className={styles.column} aria-labelledby="footer-faq-title">
          <h3 id="footer-faq-title">{footer.faq}</h3>
          <ul>
            {t.home.faq.items.map((item, index) => (
              <FooterLink key={item.question} onClick={() => onFaqSelect(index)}>
                {item.question}
              </FooterLink>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <h3>{footer.contact}</h3>
          <p className={styles.label}>{footer.frontDesk}</p>
          <CopyPhone />
        </div>
      </Container>
      <Container className={styles.base}>
        <span>{footer.rights}</span>
      </Container>
    </footer>
  );
}
