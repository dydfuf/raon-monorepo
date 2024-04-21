import { Link, json, useLoaderData } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import { CoffeeInfoField } from "../types/coffee";
import NoteBadge from "../components/note-badge";
import {
  getAllNotesByCoffeeInfoList,
  getAllNationByCoffeeInfoList,
} from "../utils/coffee";
import { useState } from "react";
import CoffeeFilter from "../components/coffee-filter";
import MobileCoffeeFilter from "../components/mobile-coffee-filter";

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return json({ coffeeInfoList });
}

export default function CoffeeListPage() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();
  const allNations = getAllNationByCoffeeInfoList(coffeeInfoList);
  const allNotes = getAllNotesByCoffeeInfoList(coffeeInfoList);

  const [selectedNations, setSelectedNations] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const filteredCoffeeInfoList = coffeeInfoList.filter((coffeeInfo) => {
    const hasSelectedNations = selectedNations.length > 0;
    const hasSelectedNotes = selectedNotes.length > 0;

    const filterByNations = () => {
      if (hasSelectedNations) {
        return selectedNations.includes(coffeeInfo[CoffeeInfoField.NATION]);
      }
      return true;
    };

    const filterByNotes = () => {
      if (hasSelectedNotes) {
        const coffeeNotes = coffeeInfo[CoffeeInfoField.NOTE].split(",");
        return coffeeNotes.some((note) => selectedNotes.includes(note));
      }
      return true;
    };

    return filterByNations() && filterByNotes();
  });

  const filterProps = {
    allNations,
    allNotes,
    selectedNations,
    setSelectedNations,
    selectedNotes,
    setSelectedNotes,
  };

  return (
    <div className="mx-auto p-8 flex flex-col gap-4 w-[1024px]">
      <CoffeeFilter {...filterProps} />
      <MobileCoffeeFilter {...filterProps} />
      {filteredCoffeeInfoList.map((coffeeInfo) => (
        <Link
          to={`/coffee/${coffeeInfo[CoffeeInfoField.ID].split("-")[1]}`}
          key={coffeeInfo[CoffeeInfoField.ID]}
          className="flex flex-col p-8 border-[1px] rounded-lg hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex flex-col">
            <p className="text-xl">{coffeeInfo[CoffeeInfoField.NAME_KR]}</p>
            <p className="text-sm text-muted-foreground">
              {coffeeInfo[CoffeeInfoField.NAME_EN]}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {coffeeInfo[CoffeeInfoField.NOTE].split(",").map((note) => (
                <NoteBadge key={note}>{note}</NoteBadge>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
