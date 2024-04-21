import { Link, json, useLoaderData } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import { CoffeeInfo, CoffeeInfoField } from "../types/coffee";
import NoteBadge from "../components/note-badge";
import {
  getAllNotesByCoffeeInfoList,
  getAllNationByCoffeeInfoList,
} from "../utils/coffee";
import { useCallback, useEffect, useState } from "react";
import CoffeeFilter from "../components/coffee-filter";
import MobileCoffeeFilter from "../components/mobile-coffee-filter";

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return json({ coffeeInfoList });
}

export default function CoffeeListPage() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();
  const allNations = getAllNationByCoffeeInfoList(coffeeInfoList);

  const [allNotes, setAllNotes] = useState<string[]>([]);
  const [selectedNations, setSelectedNations] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedNations.length === 0) {
      setAllNotes(getAllNotesByCoffeeInfoList(coffeeInfoList, allNations));
      return;
    }

    setAllNotes(getAllNotesByCoffeeInfoList(coffeeInfoList, selectedNations));
    setSelectedNotes([]);
  }, [selectedNations]);

  const filterByNations = (coffeeInfo: CoffeeInfo) => {
    const hasSelectedNations = selectedNations.length > 0;

    if (hasSelectedNations) {
      return selectedNations.includes(coffeeInfo[CoffeeInfoField.NATION]);
    }
    return true;
  };

  const filterByNotes = (coffeeInfo: CoffeeInfo) => {
    const hasSelectedNotes = selectedNotes.length > 0;

    if (hasSelectedNotes) {
      const coffeeNotes = coffeeInfo[CoffeeInfoField.NOTE].split(",");
      return coffeeNotes.some((note) => selectedNotes.includes(note.trim()));
    }
    return true;
  };

  const filteredCoffeeInfoList = coffeeInfoList
    .filter(filterByNations)
    .filter(filterByNotes);

  const filterProps = {
    allNations,
    allNotes,
    selectedNations,
    setSelectedNations,
    selectedNotes,
    setSelectedNotes,
  };

  return (
    <div className="mx-auto px-8 pt-4 pb-8 flex flex-col gap-4 w-[1024px]">
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
