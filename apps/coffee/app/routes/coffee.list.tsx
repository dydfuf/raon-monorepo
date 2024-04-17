import { Link, useLoaderData } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import { CoffeeInfoField } from "../types/coffee";
import { Badge } from "@raonc/ui/components/badge";

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return { coffeeInfoList };
}

export default function CoffeeListPage() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto p-8 flex flex-col gap-4">
      {coffeeInfoList.map((coffeeInfo) => (
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
                <Badge key={note} variant={"outline"}>
                  {note}
                </Badge>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
