import { CoffeeInfo, CoffeeInfoField } from "../types/coffee";

export const getAllNationByCoffeeInfoList = (coffeeInfoList: CoffeeInfo[]) => {
  return Array.from(
    new Set(
      coffeeInfoList.map((coffeeInfo) => coffeeInfo[CoffeeInfoField.NATION])
    )
  );
};

export const getAllNotesByCoffeeInfoList = (coffeeInfoList: CoffeeInfo[]) => {
  const notes = coffeeInfoList
    .map((coffeeInfo) => coffeeInfo[CoffeeInfoField.NOTE])
    .join(",")
    .split(",")
    .filter((note) => note)
    .map((note) => note.trim())
    .sort((a, b) => a.localeCompare(b));

  return Array.from(new Set(notes));
};
