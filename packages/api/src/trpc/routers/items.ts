import { z } from "zod";
import { v4 as uuid } from "uuid";
import { createRouter } from "../context";

export type Item = {
  id: string;
  title: string;
};

let items: Item[] = [
  { id: uuid(), title: "First item" },
  { id: uuid(), title: "Second item!" },
  { id: uuid(), title: "Third item" },
];

export const itemsRouter = createRouter()
  .query("getItems", {
    resolve: async ({ctx}) => {
      // Access the user via ctx.user (or whatever you defined in the context function)
      // console.log(ctx.user)
      return items;
    },
  })
  .mutation("addItem", {
    input: z.object({
      id: z.string(),
      title: z.string(),
    }),
    resolve: async ({ input }) =>
      (items = items.length > 0 ? [...items, input] : [input]),
  })
  .mutation("deleteItem", {
    input: z.string(),
    resolve: async ({ input }) => {
      items = items.filter((item) => item.id !== input);
      return items;
    },
  });