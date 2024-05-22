import { Input } from "@dydfuf/ui/components/input";
import { Label } from "@dydfuf/ui/components/label";

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
