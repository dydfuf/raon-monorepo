import { LoaderFunctionArgs } from "@remix-run/node";
import { getCoffeeInfoById } from "../.server/notion/service";
import { useLoaderData } from "@remix-run/react";
import { CoffeeInfoField } from "../types/coffee";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const coffeeInfo = await getCoffeeInfoById(Number(id));

  if (!coffeeInfo) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return coffeeInfo;
}

export default function CoffeeDetailPage() {
  const coffeeInfo = useLoaderData<typeof loader>();

  return (
    <div>
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
    </div>
  );
}
