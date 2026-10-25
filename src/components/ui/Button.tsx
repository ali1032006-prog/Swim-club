import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost" | "light" | "outlineLight";
export type ButtonSize = "md" | "sm";

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

function buttonClassName({ variant = "primary", size = "md", fullWidth, className }: StyleProps) {
  return cx(styles.button, styles[variant], size === "sm" && styles.sm, fullWidth && styles.wide, className);
}

type ButtonProps = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & {
    /** Shows a spinner and blocks clicks while an action is in flight. */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(buttonClassName({ variant, size, fullWidth, className }), loading && styles.loading)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className">;

/** A Next.js <Link> that looks like a Button. */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, fullWidth, className })} {...props} />;
}
