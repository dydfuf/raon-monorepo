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
          className="h-[120px]"
          style={{
            marginTop: `calc(50dvh - 28px - 120px - 120px)`,
            alignContent: "end",
          }}
        >
          <span className="font-bold text-[3rem] sm:text-[5rem]">
            {siteConfig.name}
          </span>
        </h1>
        <CommandMenu />
        <p className="text-[1rem] sm:text-[1.25rem]">
          당신의 취향에 맞는 완벽한 커피 원두를 찾아보세요!
        </p>
      </div>
    </div>
  );
}
