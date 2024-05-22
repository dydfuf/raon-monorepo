"use client";

import { Button } from "@dydfuf/ui/components/button";
import { useToast } from "@dydfuf/ui/components/use-toast";

export default function ToastWithTitle() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
