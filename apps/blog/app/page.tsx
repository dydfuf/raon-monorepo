import Link from "next/link";
import ContentCard from "../components/common/ContentCard";
import { format } from "date-fns";
import { getAllArticlesQuery } from "../constant/hashnodeQuery";
import { Publication } from "../type/hashnode";

const getAllArticles = async () => {
  const response = await fetch(`https://gql.hashnode.com/`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.HASHNODE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: getAllArticlesQuery,
    }),
  });

  const {
    data: { publication },
  } = await response.json();

  return publication as Publication;
};

export default async function MainPage() {
  const data = await getAllArticles();

  return (
    <div className="w-full">
      <div className="w-full gap-5 grid grid-cols-1 p-5 md:grid-cols-2 max-w-[1024px] mx-auto">
        {data.posts.edges.map((post) => {
          const { title, brief, slug, readTimeInMinutes, tags, publishedAt } =
            post.node;

          return (
            <article key={slug}>
              <Link href={`/posts/${slug}`}>
                <ContentCard
                  title={title}
                  timeToRead={`${readTimeInMinutes} min read`}
                  description={brief || ""}
                  releaseDate={format(publishedAt, "yyyy-MM-dd")}
                  categories={tags.map((tag) => tag.name)}
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
