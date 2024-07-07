import { format } from "date-fns";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

import { Badge } from "@raonc/ui/components/badge";
import { getArticleById } from "../../../utils/hashnode";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { title, publishedAt, tags, content, readTimeInMinutes } =
    await getArticleById(params.id);

  return (
    <div className="w-full">
      <div className="w-full p-5 md:grid-cols-2 max-w-[1024px] mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          {title}
        </h1>
        <p className="text-md text-muted-foreground">
          {`${readTimeInMinutes} min read · ${format(
            publishedAt,
            "yyyy-MM-dd"
          )}`}{" "}
        </p>
        <div className="flex mt-8 gap-2">
          {tags.map((tag) => (
            <Badge>{tag.name}</Badge>
          ))}
        </div>
        <div className="mt-12 mb-20">
          <MarkdownRenderer markdownStr={content.markdown} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const {
    seo: { title, description },
  } = await getArticleById(params.id);

  return {
    title,
    description,
  };
}