import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import "@/styles/home.css";

/** The site chrome: dark header, page, charcoal footer. */
export default function RedesignChrome({ children }: { children: ReactNode }) {
  return (
    <div className="nh">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
