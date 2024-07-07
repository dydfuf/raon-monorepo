import { MetadataRoute } from "next";
import { BLOG_URL } from "../constant/common";
import { getAllArticles } from "../utils/hashnode";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getAllArticles();
  const postRoutes = data.posts.edges.map((post) => {
    const { slug, publishedAt, updatedAt } = post.node;
    return {
      url: `${BLOG_URL}/posts/${slug}`,
      lastModified: updatedAt ? updatedAt : publishedAt,
    };
  });

  const routes = ["", "/aboutme"].map((route) => ({
    url: `${BLOG_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postRoutes];
}
