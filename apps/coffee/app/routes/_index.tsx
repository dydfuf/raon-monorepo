import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import { CoffeeInfoField } from "../types/coffee";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return { coffeeInfoList };
}

export default function Index() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {coffeeInfoList.map((coffeeInfo) => (
        <div
          key={coffeeInfo[CoffeeInfoField.ID]}
          className="border-[1px] w-full h-full p-2"
        >
          <h2>
            {CoffeeInfoField.NAME_KR} : {coffeeInfo[CoffeeInfoField.NAME_KR]}
          </h2>
          <p>
            {CoffeeInfoField.NAME_EN} : {coffeeInfo[CoffeeInfoField.NAME_EN]}
          </p>
          <p>
            {CoffeeInfoField.REGION} : {coffeeInfo[CoffeeInfoField.REGION]}
          </p>
          <p>
            {CoffeeInfoField.FARM} : {coffeeInfo[CoffeeInfoField.FARM]}
          </p>
          <p>
            {CoffeeInfoField.VARIETY} : {coffeeInfo[CoffeeInfoField.VARIETY]}
          </p>
          <p>
            {CoffeeInfoField.PROCESS} : {coffeeInfo[CoffeeInfoField.PROCESS]}
          </p>
          <p>
            {CoffeeInfoField.NOTE} : {coffeeInfo[CoffeeInfoField.NOTE]}
          </p>
          <p>
            {CoffeeInfoField.SOURCE} : {coffeeInfo[CoffeeInfoField.SOURCE]}
          </p>
        </div>
      ))}
    </div>
  );
}
