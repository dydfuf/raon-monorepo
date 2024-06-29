import Link from "next/link";
import ContentCard from "../components/common/ContentCard";
import { getPostByName, getPostNameList } from "../utils/post";
import { parseMarkdownMetadata } from "../utils/parseMarkdownMetadata";
import readingTime from "reading-time";

export default function MainPage() {
  const postList = getPostNameList().map((postName) => ({
    name: postName,
    content: getPostByName(postName ?? ""),
  }));

  return (
    <div className="w-full">
      <div className="w-full gap-5 grid grid-cols-1 p-5 md:grid-cols-2 max-w-[1024] mx-auto">
        {postList.map((post) => {
          const { name, content } = post;
          const { date, description, category, title } =
            parseMarkdownMetadata(content);
          const stats = readingTime(content);

          return (
            <article key={name}>
              <Link href={`/posts/${name}`}>
                <ContentCard
                  title={title ?? ""}
                  timeToRead={stats.text}
                  description={description ?? ""}
                  releaseDate={date ?? ""}
                  categories={category?.split(",") ?? []}
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
