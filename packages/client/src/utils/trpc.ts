import type { AppRouter } from "@mono/api/src/trpc";
import { createReactQueryHooks } from "@trpc/react";
export const trpc = createReactQueryHooks<AppRouter>();