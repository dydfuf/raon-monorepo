import { PropsWithChildren } from "react";
import SiteHeader from "./SiteHeader";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex">{children}</main>
    </div>
  );
}
