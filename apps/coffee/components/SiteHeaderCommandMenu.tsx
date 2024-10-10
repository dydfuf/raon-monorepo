import { getCoffeeInfoListData } from "../utils/api";
import CommandMenu from "./CommandMenu";

export default async function SiteHeaderCommandMenu() {
  const { coffeeInfoList } = await getCoffeeInfoListData();

  return <CommandMenu list={coffeeInfoList} isInNav />;
}
