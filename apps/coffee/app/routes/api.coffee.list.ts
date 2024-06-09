import { getCoffeeInfoList } from "../.server/notion/service";

export const loader = ({}) => {
  const coffeeInfoList = getCoffeeInfoList();

  return new Response(JSON.stringify({ coffeeInfoList }));
};
