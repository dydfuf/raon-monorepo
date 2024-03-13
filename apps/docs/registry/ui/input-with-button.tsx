import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
