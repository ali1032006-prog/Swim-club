import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "section" | "main" | "nav" | "footer";
};

/** Centred page column that also respects the device's side safe areas. */
export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cx(styles.wrap, className)} {...props} />;
}
