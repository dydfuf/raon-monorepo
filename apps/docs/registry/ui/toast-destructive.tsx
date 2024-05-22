"use client";

import { Button } from "@dydfuf/ui/components/button";
import { ToastAction } from "@dydfuf/ui/components/toast";
import { useToast } from "@dydfuf/ui/components/use-toast";

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
