import { ImageResponse } from "next/og";
import { getArticleQueryById } from "../../../constant/hashnodeQuery";
import { Post } from "../../../type/hashnode";
import { SITE_CONFIG } from "../../../constant/common";
import { getArticleById } from "./page";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = SITE_CONFIG.siteName;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const { title } = await getArticleById(params.id);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title}
      </div>
    ),
    { ...size }
  );
}
