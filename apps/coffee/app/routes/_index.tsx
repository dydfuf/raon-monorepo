import { type MetaFunction } from "@remix-run/node";
import CommandMenu from "../components/command-menu";

import type { HeadersFunction } from "@remix-run/node";
import { siteConfig } from "../constant/common";

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
    <div className="mx-auto grow flex w-full">
      <div className="flex flex-col items-center w-full space-y-4 mx-[2rem]">
        <h1
          className="font-bold text-[5rem]"
          style={{ marginTop: `calc(50dvh - 28px - 120px - 120px)` }}
        >
          {siteConfig.name}
        </h1>
        <CommandMenu />
        <p>궁금한 커피원두의 이름을 검색해보세요!</p>
      </div>
    </div>
  );
}
