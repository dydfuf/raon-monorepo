import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getCoffeeInfoById } from "../.server/notion/service";
import { Link, useLoaderData } from "@remix-run/react";
import { CoffeeInfoField } from "../types/coffee";
import { Button } from "@raonc/ui/components/button";

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `COFFEE DB | ${data?.[CoffeeInfoField.NAME_KR]}` },
    { name: "description", content: "Search Any Coffee Information" },
  ];
};

export default function CoffeeDetailPage() {
  const coffeeInfo = useLoaderData<typeof loader>();

  const CoffeeInfoData = [
    {
      key: CoffeeInfoField.NAME_KR,
      label: "Name(KR)",
      value: coffeeInfo[CoffeeInfoField.NAME_KR],
      isLink: false,
    },
    {
      key: CoffeeInfoField.NAME_EN,
      label: "Name(EN)",
      value: coffeeInfo[CoffeeInfoField.NAME_EN],
      isLink: false,
    },
    {
      key: CoffeeInfoField.NOTE,
      label: "Note",
      value: coffeeInfo[CoffeeInfoField.NOTE],
      isLink: false,
    },
    {
      key: CoffeeInfoField.PROCESS,
      label: "Process",
      value: coffeeInfo[CoffeeInfoField.PROCESS],
      isLink: false,
    },

    {
      key: CoffeeInfoField.REGION,
      label: "Region",
      value: coffeeInfo[CoffeeInfoField.REGION],
      isLink: false,
    },
    {
      key: CoffeeInfoField.FARM,
      label: "Farm",
      value: coffeeInfo[CoffeeInfoField.FARM],
      isLink: false,
    },
    {
      key: CoffeeInfoField.VARIETY,
      label: "Variety",
      value: coffeeInfo[CoffeeInfoField.VARIETY],
      isLink: false,
    },

    {
      key: CoffeeInfoField.SOURCE,
      label: "Source",
      value: coffeeInfo[CoffeeInfoField.SOURCE],
      isLink: true,
    },
  ];

  return (
    <div className="min-w-[100dvw] min-h-[100dvh] flex flex-col items-center justify-center bg-background py-4">
      <Button variant={"default"} className="my-4 mx-auto">
        <Link to={"/"}>Back Home</Link>
      </Button>
      <div className="w-3/4 min-h-[75dvh] bg-background border-[1px] border-secondary rounded-lg shadow-xl p-6 max-w-[1024px]">
        <h1 className="text-5xl text-center font-extrabold text-primary">
          Coffee Detail
        </h1>
        <div className="my-4 md:my-16 bg-white/90 p-4 rounded-lg gap-8 flex flex-col">
          {CoffeeInfoData.map((data) => (
            <div key={data.key} className="flex flex-col md:flex-row mt-4">
              <span className="text-2xl font-bold shrink-0">{data.label}</span>
              <div className="w-full border-dashed border-[1px] h-[1px] md:mt-auto md:mb-1 border-black md:px-4 md:mx-4 my-2" />
              {data.isLink ? (
                <Link
                  to={data.value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg shrink-0 underline"
                >
                  From Here
                </Link>
              ) : (
                <span className="text-xl shrink-0">{data.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
