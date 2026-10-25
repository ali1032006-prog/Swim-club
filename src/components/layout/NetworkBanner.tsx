"use client";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./NetworkBanner.module.css";

/** Strip under the header that appears while the browser is offline. */
export function NetworkBanner() {
  const { t } = useI18n();
  const online = useOnlineStatus();

  return (
    <div className={styles.banner} role="status" hidden={online}>
      {t.common.offline}
    </div>
  );
}
