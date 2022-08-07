import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, createRouter } from "./context";
import { itemsRouter } from "./routers/items";

// export type definition of Context
export type AppRouter = typeof appRouter;

// The general app router
export const appRouter = createRouter()
  .merge("items.", itemsRouter) // Here is where you add more routers similar to the itemsRouter

// The Express middleware
export const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
