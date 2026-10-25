"use client";

import type { Ref } from "react";
import type { ParentFormApi } from "@/hooks/useParentForm";
import { parentFieldId } from "@/lib/dom";
import { useI18n } from "@/providers/I18nProvider";
import { TextField } from "@/components/ui/Field";
import { PanelNote, PanelTitle } from "@/components/ui/Panel";
import styles from "./ParentDetailsCard.module.css";

interface ParentDetailsCardProps {
  form: ParentFormApi;
  /** Pressing Enter in a field submits the booking. */
  onSubmit: () => void;
  headingRef?: Ref<HTMLHeadingElement>;
}

export function ParentDetailsCard({ form, onSubmit, headingRef }: ParentDetailsCardProps) {
  const { t } = useI18n();
  const { parent } = t.booking;

  return (
    <section className={styles.card} aria-labelledby="parent-title">
      <PanelTitle id="parent-title" ref={headingRef} tabIndex={-1}>
        {parent.title}
      </PanelTitle>
      <PanelNote>{parent.lede}</PanelNote>
      <form
        className={styles.form}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <TextField
          id={parentFieldId("name")}
          label={parent.name}
          type="text"
          name="name"
          autoComplete="name"
          placeholder={parent.namePlaceholder}
          value={form.values.name}
          error={form.errors.name ? parent.errors.name : undefined}
          onChange={(event) => form.onChange("name", event.target.value)}
          onBlur={() => form.onBlur("name")}
        />
        <TextField
          id={parentFieldId("email")}
          label={parent.email}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={form.values.email}
          error={form.errors.email ? parent.errors.email : undefined}
          onChange={(event) => form.onChange("email", event.target.value)}
          onBlur={() => form.onBlur("email")}
        />
        <TextField
          id={parentFieldId("phone")}
          label={parent.phone}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+965 9000 0000"
          hint={parent.phoneHint}
          value={form.values.phone}
          error={form.errors.phone ? parent.errors.phone : undefined}
          onChange={(event) => form.onChange("phone", event.target.value)}
          onBlur={() => form.onBlur("phone")}
        />
        {/* Lets the Enter key submit the form without showing a second confirm button. */}
        <button type="submit" hidden />
      </form>
    </section>
  );
}
