import { iteratePaginatedAPI } from "@notionhq/client";
import { notion } from "./client";
import { DEFAULT_FIELD_VALUE } from "./constant";
import { CoffeeInfo } from "../../types/coffee";

export const getCoffeeInfoList = async () => {
  const coffeeInfoList = [];

  for await (const block of iteratePaginatedAPI(notion.databases.query, {
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  })) {
    if ("properties" in block) {
      const coffeeInfo = Object.entries(block.properties).map(
        ([key, value]) => {
          if (value.type === "title") {
            return {
              [key]: value.title[0]?.plain_text ?? DEFAULT_FIELD_VALUE,
            };
          } else if (value.type === "rich_text") {
            return {
              [key]: value.rich_text[0]?.plain_text ?? DEFAULT_FIELD_VALUE,
            };
          } else if (value.type === "unique_id") {
            const { prefix, number } = value.unique_id;
            return {
              [key]: `${prefix}-${number}` ?? DEFAULT_FIELD_VALUE,
            };
          }
          return {
            [key]: JSON.stringify(value),
          };
        }
      );

      coffeeInfoList.push(Object.assign({}, ...coffeeInfo));
    }
  }

  return coffeeInfoList as CoffeeInfo[];
};
