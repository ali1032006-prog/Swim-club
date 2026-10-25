"use client";

import { SEASON } from "@/config/season";
import { formatMoney, toPercent } from "@/lib/pricing";
import { useBooking } from "@/providers/BookingProvider";
import { useI18n } from "@/providers/I18nProvider";

/** Localised, formatted figures for the current booking, shared by the running total and the summary. */
export function usePriceLabels() {
  const { t } = useI18n();
  const { totals } = useBooking();
  const { price } = t.booking;
  const money = (amount: number) => formatMoney(amount, t.common.currency);

  return {
    subtotal: money(totals.subtotal),
    subtotalLine: price.subtotalLine(t.common.childCount(totals.count), money(SEASON.pricePerChild)),
    discountLabel: totals.rate ? price.discountPercent(toPercent(totals.rate)) : price.discount,
    discountValue: totals.rate ? `− ${money(totals.discount)}` : money(0),
    total: money(totals.total),
    money,
  };
}
