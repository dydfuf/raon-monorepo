export const getAllArticlesQuery = `{
    publication(host: "daily.raonc.dev") {
      posts(first: 50) {
        edges {
          node {
            id
            title
            subtitle
            brief
            readTimeInMinutes
            views
            publishedAt
            updatedAt
            slug
            tags {
              name
            }
            coverImage {
              url
              attribution
            }
            content {
              markdown
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
          }
        }
      }
    }
  }`;

export const getArticleQueryById = (id: string) => `
{
  publication(host: "daily.raonc.dev") {
    post(slug: "${id}") {
            id
            title
            subtitle
            brief
            readTimeInMinutes
            views
            publishedAt
            updatedAt
            tags {
              name
            }
            coverImage {
              url
              attribution
            }
            content {
              markdown
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
    }
  }
}
`;
