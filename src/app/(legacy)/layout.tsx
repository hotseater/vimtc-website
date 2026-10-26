import type { ReactNode } from "react";
import LegacyChrome from "@/components/LegacyChrome";

export default function LegacyLayout({ children }: { children: ReactNode }) {
  return <LegacyChrome>{children}</LegacyChrome>;
}
