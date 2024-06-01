import { useState, useEffect } from "react";

interface Props {
  url: string;
}

interface PreviewData {
  title: string;
  description: string;
  image: string;
}

export default function LinkPreview({ url }: Props) {
  const [previewData, setPreviewData] = useState<PreviewData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const title = doc.querySelector("title")?.textContent || "";
        const description =
          doc
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") || "";
        const image =
          doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute("content") || "";

        setPreviewData({
          title,
          description,
          image,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  const handleClick = () => {
    window.open(url, "_blank");
  };

  <div onClick={handleClick} style={{ cursor: "pointer" }}>
    <h3>{previewData.title}</h3>
    <p>{previewData.description}</p>
    {previewData.image && <img src={previewData.image} alt="Link Preview" />}
  </div>;
}
