import { Icons } from "./Icons";
import Link from "next/link";
import { siteConfig } from "../constants/siteConfig";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {siteConfig.mainNav.map((navItem) => (
          <Link key={navItem.to} href={navItem.to}>
            {navItem.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
