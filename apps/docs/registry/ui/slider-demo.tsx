import { cn } from "@dydfuf/ui/lib/utils";
import { Slider } from "@dydfuf/ui/components/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  );
}
