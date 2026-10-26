import type { ReactNode } from "react";
import RedesignChrome from "@/components/site/RedesignChrome";

export default function RedesignLayout({ children }: { children: ReactNode }) {
  return <RedesignChrome>{children}</RedesignChrome>;
}
