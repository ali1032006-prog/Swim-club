"use client";

import { useI18n } from "@/providers/I18nProvider";
import { SeasonCalendar } from "@/components/calendar/SeasonCalendar";
import { Section } from "@/components/ui/Section";

export function ScheduleSection() {
  const { t } = useI18n();

  return (
    <Section id="schedule" title={t.home.schedule.title}>
      <SeasonCalendar />
    </Section>
  );
}
