"use client";

import { useEffect, useRef } from "react";

/**
 * Moves focus to an element when its page mounts, so keyboard and screen-reader users land
 * on the new step's heading. Give the element `tabIndex={-1}`.
 */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return ref;
}
