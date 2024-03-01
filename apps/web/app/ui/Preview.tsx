import { cn } from "@repo/ui/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  className?: string;
}

export default function Preview({
  title,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-full p-10 border-1 bg-slate-50 flex flex-col gap-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className={cn("flex flex-col gap-5", className)}>{children}</div>
    </div>
  );
}
