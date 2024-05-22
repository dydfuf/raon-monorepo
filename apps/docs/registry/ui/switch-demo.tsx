import { Label } from "@dydfuf/ui/components/label";
import { Switch } from "@dydfuf/ui/components/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
