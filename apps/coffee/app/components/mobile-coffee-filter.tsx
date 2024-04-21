import { Button } from "@raonc/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@raonc/ui/components/drawer";
import { ScrollArea } from "@raonc/ui/components/scroll-area";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@raonc/ui/components/toggle-group";

interface Props {
  allNations: string[];
  allNotes: string[];
  selectedNations: string[];
  setSelectedNations: (value: string[]) => void;
  selectedNotes: string[];
  setSelectedNotes: (value: string[]) => void;
}

export default function MobileCoffeeFilter({
  allNations,
  allNotes,
  selectedNations,
  setSelectedNations,
  selectedNotes,
  setSelectedNotes,
}: Props) {
  const nationFilterButtonLabel =
    selectedNations.length > 0 ? selectedNations.join(", ") : "나라별 필터";
  const noteFilterButtonLabel =
    selectedNotes.length > 0 ? selectedNotes.join(", ") : "노트별 필터";

  return (
    <div className="grid grid-cols-2 gap-2 md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <span className="line-clamp-1 whitespace-pre-wrap">
              {nationFilterButtonLabel}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>나라별 필터</DrawerTitle>
            <DrawerDescription>원하는 국가를 선택해주세요.</DrawerDescription>
            <div className="flex flex-wrap gap-2 m-4">
              <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2 justify-start"
                onValueChange={setSelectedNations}
                defaultValue={selectedNations}
              >
                {allNations.map((nation) => (
                  <ToggleGroupItem
                    key={nation}
                    value={nation}
                    variant={"outline"}
                  >
                    {nation}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">닫기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <span className="line-clamp-1 whitespace-pre-wrap">
              {noteFilterButtonLabel}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>노트별 필터</DrawerTitle>
            <DrawerDescription>원하는 노트를 선택해주세요.</DrawerDescription>
            <ScrollArea className="max-h-[60dvh] m-4">
              <div className="flex flex-wrap gap-2">
                <ToggleGroup
                  type="multiple"
                  className="flex flex-wrap gap-2 justify-start"
                  onValueChange={setSelectedNotes}
                  defaultValue={selectedNotes}
                >
                  {allNotes.map((note) => (
                    <ToggleGroupItem
                      key={note}
                      value={note}
                      variant={"outline"}
                    >
                      {note}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </ScrollArea>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">닫기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
