import { format } from "date-fns";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

import { Badge } from "@raonc/ui/components/badge";
import { getArticleQueryById } from "../../../constant/hashnodeQuery";
import { Post } from "../../../type/hashnode";

const getArticleById = async (id: string) => {
  const response = await fetch(`https://gql.hashnode.com/`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.HASHNODE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: getArticleQueryById(id),
    }),
  });

  const {
    data: {
      publication: { post },
    },
  } = await response.json();

  return post as Post;
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { title, publishedAt, tags, content, readTimeInMinutes } =
    await getArticleById(params.id);

  return (
    <div className="w-full">
      <div className="w-full p-12 md:grid-cols-2 max-w-[1024px] mx-auto">
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
