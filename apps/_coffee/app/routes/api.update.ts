import { getCoffeeInfoListInNotion } from "../.server/notion/service";
import fs from "fs";

export const loader = async ({}) => {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const coffeeInfoList = await getCoffeeInfoListInNotion();

  const pwd = process.cwd();

  try {
    fs.writeFileSync(
      `${pwd}/app/data/coffee.json`,
      JSON.stringify({ coffeeInfoList }, null, 2)
    );
    return new Response("Success");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
};
