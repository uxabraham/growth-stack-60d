"use client";

import { useEffect } from "react";
import { trackPageview } from "@/lib/analytics";

export default function AnalyticsProvider() {
  useEffect(() => {
    trackPageview();
  }, []);

  return null;
}
