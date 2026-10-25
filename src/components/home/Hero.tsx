"use client";

import { ROUTES } from "@/config/routes";
import { scrollToId } from "@/lib/dom";
import { useI18n } from "@/providers/I18nProvider";
import { Banner, BannerTag, BannerText, BannerTitle } from "@/components/ui/Banner";
import { Button, ButtonLink } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const { hero } = t.home;

  return (
    <Banner variant="hero">
      <BannerTag>{hero.eyebrow}</BannerTag>
      <BannerTitle>{hero.title}</BannerTitle>
      <BannerText>{hero.text}</BannerText>
      <div className={styles.actions}>
        <ButtonLink href={ROUTES.bookingChildren} variant="light">
          {hero.register}
        </ButtonLink>
        <Button variant="outlineLight" onClick={() => scrollToId("schedule")}>
          {hero.viewSchedule}
        </Button>
      </div>
    </Banner>
  );
}
