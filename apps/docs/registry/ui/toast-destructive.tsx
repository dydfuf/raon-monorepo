"use client";

import { Button } from "@repo/ui/components/button";
import { ToastAction } from "@repo/ui/components/toast";
import { useToast } from "@repo/ui/components/use-toast";

export default function ToastDestructive() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
}
