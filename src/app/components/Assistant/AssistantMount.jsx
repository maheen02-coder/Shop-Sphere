"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Assistant = dynamic(() => import("./Assistant"), { ssr: false });

export default function AssistantMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer;
    let idleId;

    const activate = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(activate, { timeout: 2500 });
    } else {
      timer = window.setTimeout(activate, 1500);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return ready ? <Assistant /> : null;
}
