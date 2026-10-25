"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/providers/I18nProvider";
import { Brand } from "@/components/ui/Brand";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useI18n();

  return (
    <header className={styles.topbar}>
      <Container className={styles.inner}>
        <Link href={ROUTES.home} className={styles.brandLink} aria-label={t.header.homeAria}>
          <Brand size="sm" />
        </Link>
        <div className={styles.prefs}>
          <ThemeSwitch />
          <span className={styles.separator} aria-hidden="true" />
          <LanguageSwitch />
        </div>
      </Container>
    </header>
  );
}
