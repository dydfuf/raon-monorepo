"use client";

import * as React from "react";

import { cn } from "@dydfuf/ui/lib/utils";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dydfuf/ui/components/tabs";
import { CopyButton } from "./copy-button";
import { Icons } from "./icons";
import { ThemeWrapper } from "./theme-wrapper";
import { Index } from "__registry__";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return (
      <React.Suspense fallback={null}>
        <Component />
      </React.Suspense>
    );
    // return <></>;
  }, [name]);

  const codeString = React.useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [, Button] = React.Children.toArray(
        Code.props.children
      ) as React.ReactElement[];
      return Button?.props?.value || Button?.props?.__rawString__ || null;
    }
  }, [Code]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            {codeString && <CopyButton value={codeString} />}
          </div>
          <ThemeWrapper defaultTheme="zinc">
            <div
              className={cn(
                "preview flex min-h-[350px] w-full justify-center p-10",
                {
                  "items-center": align === "center",
                  "items-start": align === "start",
                  "items-end": align === "end",
                }
              )}
            >
              <React.Suspense
                fallback={
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ThemeWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
