import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { loader } from "../routes/api.link-preview";

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
  const [loading, setLoading] = useState(false);

  const fetcher = useFetcher<typeof loader>({ key: "link-preview" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data === undefined) {
      fetcher.load(`/api/link-preview?url=${url}`);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setPreviewData(fetcher.data);
      setLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    console.log(previewData);
  }, [previewData]);

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
