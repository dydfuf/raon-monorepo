import { CoffeeInfo } from "../../../types/coffee";
import { getCoffeeInfoListData } from "../../../utils/api";
import CoffeeList from "./_component/CoffeeList";

export default async function page() {
  const { coffeeInfoList } = await getCoffeeInfoListData();

  return <CoffeeList coffeeInfoList={coffeeInfoList as CoffeeInfo[]} />;
}
