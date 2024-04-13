import { type MetaFunction } from "@remix-run/node";
import CommandMenu from "../components/command-menu";

import type { HeadersFunction } from "@remix-run/node";

export const headers: HeadersFunction = ({}) => ({
  "Cache-Control": "max-age=300, s-maxage=3600",
});

export const meta: MetaFunction = () => {
  return [
    { title: "COFFEE DB" },
    { name: "description", content: "Search Any Coffee Information" },
  ];
};

export default function Index() {
  return (
    <main className="w-[100dvw] h-[100dvh] flex md:items-center justify-center p-8 items-start">
      <CommandMenu />
    </main>
  );
}
