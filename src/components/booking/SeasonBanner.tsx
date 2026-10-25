"use client";

import { useI18n } from "@/providers/I18nProvider";
import { Banner, BannerTitle } from "@/components/ui/Banner";

export function SeasonBanner() {
  const { t } = useI18n();

  return (
    <Banner>
      <BannerTitle>{t.booking.seasonTitle}</BannerTitle>
    </Banner>
  );
}
