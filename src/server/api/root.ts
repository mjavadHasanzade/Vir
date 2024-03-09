import { memoryRouter } from "~/server/api/routers/memory";
import { createTRPCRouter } from "~/server/api/trpc";
import { userOperationsRouter } from "./routers/user-operations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  memory: memoryRouter,
  user: userOperationsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
