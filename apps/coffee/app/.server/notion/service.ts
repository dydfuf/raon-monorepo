import { iteratePaginatedAPI } from "@notionhq/client";
import { notion } from "./client";
import { DEFAULT_FIELD_VALUE } from "./constant";
import { CoffeeInfo } from "../../types/coffee";

export const getCoffeeInfoList = async () => {
  const coffeeInfoList: CoffeeInfo[] = [];

  for await (const block of iteratePaginatedAPI(notion.databases.query, {
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  })) {
    if ("properties" in block) {
      const coffeeInfo = Object.entries(block.properties).map(
        ([key, value]) => {
          let fieldValue = DEFAULT_FIELD_VALUE;
          if (value.type === "title") {
            fieldValue = value.title[0]?.plain_text;
          } else if (value.type === "rich_text") {
            fieldValue = value.rich_text[0]?.plain_text;
          } else if (value.type === "unique_id") {
            const { prefix, number } = value.unique_id;
            fieldValue = `${prefix}-${number}`;
          } else {
            fieldValue = JSON.stringify(value);
          }
          return { [key]: fieldValue ?? DEFAULT_FIELD_VALUE };
        }
      );

      coffeeInfoList.push(Object.assign({}, ...coffeeInfo));
    }
  }

  return coffeeInfoList;
};

export const getCoffeeInfoById = async (id: number) => {
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
    filter: {
      property: "ID",
      unique_id: {
        equals: id,
      },
    },
  });

  const coffeeInfo: CoffeeInfo[] = data.results.map((block) => {
    if (!("properties" in block)) return;
    const coffeeInfo = Object.entries(block.properties).map(([key, value]) => {
      let fieldValue = DEFAULT_FIELD_VALUE;
      if (value.type === "title") {
        fieldValue = value.title[0]?.plain_text;
      } else if (value.type === "rich_text") {
        fieldValue = value.rich_text[0]?.plain_text;
      } else if (value.type === "unique_id") {
        const { prefix, number } = value.unique_id;
        fieldValue = `${prefix}-${number}`;
      } else {
        fieldValue = JSON.stringify(value);
      }
      return { [key]: fieldValue ?? DEFAULT_FIELD_VALUE };
    });

    return Object.assign({}, ...coffeeInfo);
  });

  return coffeeInfo[0];
};