import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import CommandMenu from "../components/command-menu";

import type { HeadersFunction } from "@remix-run/node";

export const headers: HeadersFunction = ({}) => ({
  "Cache-Control": "max-age=300, s-maxage=3600",
});

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return { coffeeInfoList };
}

export default function Index() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();

  return (
    <main className="w-[100dvw] h-[100dvh] flex items-center justify-center p-8">
      <CommandMenu list={coffeeInfoList} />
    </main>
  );
}
