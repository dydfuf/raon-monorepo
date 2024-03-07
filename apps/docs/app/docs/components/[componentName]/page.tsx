import { ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@repo/ui/lib/utils";

interface ComponentsDetailPageProps {
  params: {
    componentName: string;
  };
}

export default function ComponentsDetailPage({
  params,
}: ComponentsDetailPageProps) {
  const { componentName } = params;

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
          <div className="font-medium text-foreground">{componentName}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {componentName}
          </h1>
          {/* {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )} */}
        </div>
        {/* {doc.links ? (
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
          </div>
        ) : null} */}
        {/* <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div> */}
        {/* <DocsPager doc={doc} /> */}
      </div>
      {/* {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )} */}
    </main>
  );
}
