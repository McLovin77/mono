import * as trpc from "@trpc/server";

export const appRouter = trpc
  .router()
  .query('hello',{
    resolve: async ({ctx, input}) => "Hello!"
  })

// export type definition of API
export type AppRouter = typeof appRouter;
