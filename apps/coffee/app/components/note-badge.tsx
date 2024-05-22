import { Badge, BadgeProps } from "@dydfuf/ui/components/badge";
import { cn } from "@dydfuf/ui/lib/utils";

interface Props extends BadgeProps {}

export default function NoteBadge({ className, ...rest }: Props) {
  return <Badge variant={"default"} className={cn("text-[14px]")} {...rest} />;
}
