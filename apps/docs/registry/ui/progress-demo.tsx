"use client";
import "@repo/ui/globals.css";

import * as React from "react";

import { Progress } from "@repo/ui/components/progress";

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
