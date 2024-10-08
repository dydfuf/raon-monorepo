import { CoffeeInfo } from "../../../types/coffee";
import CoffeeList from "./_component/CoffeeList";

const getCoffeeInfoListData = async () => {
  const response = await fetch("https://coffee.raonc.dev/api/coffee/list");
  return response.json();
};

export default async function page() {
  const { coffeeInfoList } = await getCoffeeInfoListData();

  return <CoffeeList coffeeInfoList={coffeeInfoList as CoffeeInfo[]} />;
}
