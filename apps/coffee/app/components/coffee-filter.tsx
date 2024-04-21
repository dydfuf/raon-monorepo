import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@raonc/ui/components/accordion";
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

export default function CoffeeFilter({
  allNations,
  allNotes,
  selectedNations,
  setSelectedNations,
  selectedNotes,
  setSelectedNotes,
}: Props) {
  return (
    <Accordion type="multiple" className="hidden md:block">
      <AccordionItem value="nation">
        <AccordionTrigger>나라별</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="note">
        <AccordionTrigger>노트별</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            <ToggleGroup
              type="multiple"
              className="flex flex-wrap gap-2 justify-start"
              onValueChange={setSelectedNotes}
              defaultValue={selectedNotes}
            >
              {allNotes.map((note) => (
                <ToggleGroupItem key={note} value={note} variant={"outline"}>
                  {note}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
