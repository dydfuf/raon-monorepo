import {
  getAllArticlesQuery,
  getArticleQueryById,
} from "../constant/hashnodeQuery";
import { Post, Publication } from "../type/hashnode";

const Authorization = `Bearer ${process.env.HASHNODE_ACCESS_TOKEN}`;

export const getAllArticles = async () => {
  const response = await fetch(`https://gql.hashnode.com/`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
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

export const getArticleById = async (id: string) => {
  const response = await fetch(`https://gql.hashnode.com/`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
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
