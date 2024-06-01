import {
  getCoffeeInfoList,
  revalidateCoffeeInfo,
} from "../.server/coffee/service";

export const loader = async ({}) => {
  try {
    await revalidateCoffeeInfo();

    const revalidatedCoffeeInfo = await getCoffeeInfoList();

    return new Response(JSON.stringify({ revalidatedCoffeeInfo }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response((e as unknown as Error).message, {
      status: 500,
    });
  }
};
