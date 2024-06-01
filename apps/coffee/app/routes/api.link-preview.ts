import { LoaderFunctionArgs } from "@remix-run/node";
import { Parser } from "htmlparser2";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url).searchParams.get("url");

  let title = "";
  let description = "";
  let image = "";

  if (!url) {
    return {
      title,
      description,
      image,
    };
  }

  const response = await fetch(url);
  const data = await response.text();

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "meta" && attributes.property === "og:title") {
        title = attributes.content || "";
      }
      if (name === "meta" && attributes.property === "og:description") {
        description = attributes.content || "";
      }
      if (name === "meta" && attributes.property === "og:image") {
        image = attributes.content || "";
      }
    },
  });
  parser.write(data);
  parser.end();

  return new Response(JSON.stringify({ title, description, image }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
