import Image from "next/image";
import Link from "next/link";
import SwitchTheme from "../SwitchTheme.client";
import { SITE_CONFIG } from "../../constant/common";
import { cn } from "@raonc/ui/lib/utils";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href={"/"} className="flex items-center space-x-4">
          <Image src="/MainLogo.svg" width={40} height={40} alt="MainLogo" />
          <p className={cn(anton.className, "hidden mobile:block text-3xl")}>
            {SITE_CONFIG.siteName}
          </p>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4 font-semibold">
          <Link href={"/todo"}>
            <span>TODO</span>
          </Link>
          <Link href={"/aboutme"}>
            <span>About Me</span>
          </Link>
          <div className="w-[15px]">
            <SwitchTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
