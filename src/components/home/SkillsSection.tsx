"use client";

import { useI18n } from "@/providers/I18nProvider";
import { Section } from "@/components/ui/Section";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  const { t } = useI18n();
  const { skills } = t.home;

  return (
    <Section id="skills" title={skills.title} intro={skills.intro}>
      <div className={styles.grid}>
        {skills.items.map((skill) => (
          <article key={skill.title} className={styles.skill}>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
