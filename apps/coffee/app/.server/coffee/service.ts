import {
  CoffeeInfo,
  CoffeeInfoField,
  CoffeeInfoFieldReverse,
} from "../../types/coffee";
import {
  notFilteredCoffeeInfoList,
  getCoffeeInfoList as notionGetCoffeeInfoList,
} from "../notion/service";
import { prisma } from "../prisma";

export const getCoffeeInfoList = async () => {
  let coffeeInfoList = await prisma.coffee.findMany();
  if (coffeeInfoList.length === 0) {
    const coffeeInfoListFromNotion = await notionGetCoffeeInfoList();
    for (const coffeeInfo of coffeeInfoListFromNotion) {
      const _coffeeInfo = {
        [CoffeeInfoFieldReverse.ID]: coffeeInfo[CoffeeInfoField.ID],
        [CoffeeInfoFieldReverse["이름(영어)"]]:
          coffeeInfo[CoffeeInfoField.NAME_EN],
        [CoffeeInfoFieldReverse["이름(한글)"]]:
          coffeeInfo[CoffeeInfoField.NAME_KR],
        [CoffeeInfoFieldReverse.지역]: coffeeInfo[CoffeeInfoField.REGION],
        [CoffeeInfoFieldReverse.농장]: coffeeInfo[CoffeeInfoField.FARM],
        [CoffeeInfoFieldReverse.품종]: coffeeInfo[CoffeeInfoField.VARIETY],
        [CoffeeInfoFieldReverse.프로세싱]: coffeeInfo[CoffeeInfoField.PROCESS],
        [CoffeeInfoFieldReverse.노트]: coffeeInfo[CoffeeInfoField.NOTE],
        [CoffeeInfoFieldReverse.출처]: coffeeInfo[CoffeeInfoField.SOURCE],
        [CoffeeInfoFieldReverse.국가]: coffeeInfo[CoffeeInfoField.NATION],
        [CoffeeInfoFieldReverse.유저제출]:
          coffeeInfo[CoffeeInfoField.USER_SUBMITTED],
        [CoffeeInfoFieldReverse["노트(필터)"]]:
          coffeeInfo[CoffeeInfoField.NOTE_FOR_FILTER],
        [CoffeeInfoFieldReverse["Last edited time"]]:
          coffeeInfo[CoffeeInfoField.LAST_EDITED_TIME],
      };

      await prisma.coffee.create({
        data: _coffeeInfo,
      });
    }

    coffeeInfoList = await prisma.coffee.findMany();
  }

  const _result = coffeeInfoList.map((coffeeInfo) => {
    const _coffeeInfo = {
      [CoffeeInfoField.ID]: coffeeInfo[CoffeeInfoFieldReverse.ID],
      [CoffeeInfoField.NAME_EN]:
        coffeeInfo[CoffeeInfoFieldReverse["이름(영어)"]],
      [CoffeeInfoField.NAME_KR]:
        coffeeInfo[CoffeeInfoFieldReverse["이름(한글)"]],
      [CoffeeInfoField.REGION]: coffeeInfo[CoffeeInfoFieldReverse.지역],
      [CoffeeInfoField.FARM]: coffeeInfo[CoffeeInfoFieldReverse.농장],
      [CoffeeInfoField.VARIETY]: coffeeInfo[CoffeeInfoFieldReverse.품종],
      [CoffeeInfoField.PROCESS]: coffeeInfo[CoffeeInfoFieldReverse.프로세싱],
      [CoffeeInfoField.NOTE]: coffeeInfo[CoffeeInfoFieldReverse.노트],
      [CoffeeInfoField.SOURCE]: coffeeInfo[CoffeeInfoFieldReverse.출처],
      [CoffeeInfoField.NATION]: coffeeInfo[CoffeeInfoFieldReverse.국가],
      [CoffeeInfoField.USER_SUBMITTED]:
        coffeeInfo[CoffeeInfoFieldReverse.유저제출],
      [CoffeeInfoField.NOTE_FOR_FILTER]:
        coffeeInfo[CoffeeInfoFieldReverse["노트(필터)"]],
      [CoffeeInfoField.LAST_EDITED_TIME]:
        coffeeInfo[CoffeeInfoFieldReverse["Last edited time"]],
    };

    return _coffeeInfo;
  });

  return _result as CoffeeInfo[];
};

export const getCoffeeInfoById = async (id: string) => {
  const allCoffeeInfo = await getCoffeeInfoList();
  return allCoffeeInfo.find(
    (coffeeInfo) => coffeeInfo[CoffeeInfoField.ID] === `COFFEE-${id}`
  );
};

export const revalidateCoffeeInfo = async () => {
  const coffeeInfoListFromNotion = await notFilteredCoffeeInfoList();
  await prisma.coffee.deleteMany();

  for (const coffeeInfo of coffeeInfoListFromNotion) {
    const _coffeeInfo = {
      [CoffeeInfoFieldReverse.ID]: coffeeInfo[CoffeeInfoField.ID],
      [CoffeeInfoFieldReverse["이름(영어)"]]:
        coffeeInfo[CoffeeInfoField.NAME_EN],
      [CoffeeInfoFieldReverse["이름(한글)"]]:
        coffeeInfo[CoffeeInfoField.NAME_KR],
      [CoffeeInfoFieldReverse.지역]: coffeeInfo[CoffeeInfoField.REGION],
      [CoffeeInfoFieldReverse.농장]: coffeeInfo[CoffeeInfoField.FARM],
      [CoffeeInfoFieldReverse.품종]: coffeeInfo[CoffeeInfoField.VARIETY],
      [CoffeeInfoFieldReverse.프로세싱]: coffeeInfo[CoffeeInfoField.PROCESS],
      [CoffeeInfoFieldReverse.노트]: coffeeInfo[CoffeeInfoField.NOTE],
      [CoffeeInfoFieldReverse.출처]: coffeeInfo[CoffeeInfoField.SOURCE],
      [CoffeeInfoFieldReverse.국가]: coffeeInfo[CoffeeInfoField.NATION],
      [CoffeeInfoFieldReverse.유저제출]:
        coffeeInfo[CoffeeInfoField.USER_SUBMITTED],
      [CoffeeInfoFieldReverse["노트(필터)"]]:
        coffeeInfo[CoffeeInfoField.NOTE_FOR_FILTER],
      [CoffeeInfoFieldReverse["Last edited time"]]:
        coffeeInfo[CoffeeInfoField.LAST_EDITED_TIME],
    };

    await prisma.coffee.create({
      data: _coffeeInfo,
    });
  }
};
