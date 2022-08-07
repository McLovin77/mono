import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// An example for a decodeTokenFunction
const decodeAuthToken = (token: string | undefined) =>
  typeof token === "string" ? { name: "John Doe" } : null;

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const user = decodeAuthToken(req.headers.authorization);

  if (!req.headers.authorization) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return {
    user,
  };
};

// Create a router with the Context type in it
export function createRouter() {
  return trpc.router<Context>();
}

// export type definition of API
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
