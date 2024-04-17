import { Link } from "@remix-run/react";
import { Icons } from "./Icons";
import { siteConfig } from "../constant/common";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          to="/coffee/list"
          //   className={cn(
          //     "transition-colors hover:text-foreground/80",
          //     pathname?.startsWith("/docs/components")
          //       ? "text-foreground"
          //       : "text-foreground/60"
          //   )}
        >
          All Coffee
        </Link>
      </nav>
    </div>
  );
}
