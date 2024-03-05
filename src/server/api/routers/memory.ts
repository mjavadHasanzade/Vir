import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const memoryRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.memory.create({
        data: {
          title: input.title,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const memories = await ctx.db.memory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      memories: memories.slice(0, 3),
      count: memories.length
    };
  }),
});
