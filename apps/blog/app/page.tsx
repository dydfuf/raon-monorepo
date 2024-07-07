import Link from "next/link";
import ContentCard from "../components/common/ContentCard";
import { format } from "date-fns";
import { getAllArticles } from "../utils/hashnode";

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
