import { getPostNameList, getPostByName } from "../utils/post";
import { parseMarkdownMetadata } from "../utils/parseMarkdownMetadata";
import { MetadataRoute } from "next";

const URL = "https://raondev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const postList = getPostNameList().map((postName) => ({
    name: postName,
    content: getPostByName(postName ?? ""),
  }));
  const postsRoute = postList.map(({ name, content }) => {
    const { date } = parseMarkdownMetadata(content);
    return {
      url: `${URL}/posts/${name}`,
      lastModified: date,
    };
  });

  const routes = ["", "/aboutme"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postsRoute];
}
