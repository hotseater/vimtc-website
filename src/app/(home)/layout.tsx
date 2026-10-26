import type { ReactNode } from "react";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import "@/styles/home.css";

/** The redesigned chrome. Only the home page uses it for now; other pages keep the ported theme until they are redesigned. */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="nh">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
