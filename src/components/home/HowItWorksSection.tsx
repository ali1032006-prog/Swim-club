"use client";

import { GROUPS, TIME_SLOTS } from "@/config/season";
import { FEE_EXAMPLE_COUNTS, calculateTotals, formatMoney, toPercent } from "@/lib/pricing";
import { useI18n } from "@/providers/I18nProvider";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { CalendarIcon, ClockIcon, SwimmerIcon, WalletIcon } from "@/components/ui/icons";
import { HowCard, KeyValueList } from "./HowCard";
import styles from "./HowItWorksSection.module.css";

export function HowItWorksSection() {
  const { t, locale } = useI18n();
  const { how } = t.home;
  const money = (amount: number) => formatMoney(amount, t.common.currency);

  const feeRows = FEE_EXAMPLE_COUNTS.map((count) => {
    const totals = calculateTotals(count);
    return {
      label: t.common.childCount(count),
      value:
        totals.rate > 0 ? (
          <>
            <Badge>{how.fees.discount(toPercent(totals.rate))}</Badge>
            <span>{how.fees.total(money(totals.total))}</span>
          </>
        ) : (
          money(totals.total)
        ),
    };
  });

  return (
    <Section id="how" title={how.title}>
      <div className={styles.grid}>
        <HowCard icon={<CalendarIcon />} title={how.period.title} note={how.period.note}>
          <KeyValueList rows={how.period.rows} />
        </HowCard>
        <HowCard icon={<ClockIcon />} title={how.time.title} note={how.time.note}>
          <KeyValueList
            rows={TIME_SLOTS.map((slot) => ({ label: slot.name[locale], value: slot.hours[locale] }))}
          />
        </HowCard>
        <HowCard icon={<SwimmerIcon />} title={how.group.title} note={how.group.note}>
          <KeyValueList
            rows={GROUPS.map((group) => ({ label: group.name[locale], value: group.ages[locale] }))}
          />
        </HowCard>
        <HowCard id="fees" icon={<WalletIcon />} title={how.fees.title} note={how.fees.note}>
          <KeyValueList rows={feeRows} />
        </HowCard>
      </div>
    </Section>
  );
}
