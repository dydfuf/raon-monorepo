import { Button } from "@dydfuf/ui/components/button";
import { Textarea } from "@dydfuf/ui/components/textarea";

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
