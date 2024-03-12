import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { badgeVariants } from "@repo/ui/components/badge";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { Mdx } from "components/mdx-components";
import { DocsPager } from "components/pager";
import { DashboardTableOfContents } from "components/toc";
import { allDocs } from "contentlayer/generated";
import { getTableOfContents } from "lib/toc";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

interface ComponentsDetailPageProps {
  params: {
    componentName: string;
  };
}

async function getDocFromParams({ params }: ComponentsDetailPageProps) {
  const { componentName } = params;
  const doc = allDocs.find((d) => d.slugAsParams === componentName);

  if (!doc) {
    return null;
  }

  return doc;
}

export default async function ComponentsDetailPage({
  params,
}: ComponentsDetailPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return null;
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Components
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.shadcn && (
              <Link
                href={doc.links.shadcn}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                sahdcn/ui
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        <DocsPager doc={doc} />
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}