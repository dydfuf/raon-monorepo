import { Button } from "@dydfuf/ui/components/button";
import { Input } from "@dydfuf/ui/components/input";

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
