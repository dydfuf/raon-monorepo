import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

export default function Preview({ title, children }: PropsWithChildren<Props>) {
  return (
    <div className="w-full p-10 border-1 bg-slate-50 flex flex-col gap-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}
