import { memoriesMock } from "mock";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const memoryRouter = createTRPCRouter({

  seed: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    memoriesMock.map(async (data) =>
      await ctx.db.memory.create({
        data
      })
    )
    return;

  }),

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

  getLastDraft: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.memory.findFirst({
      where: {
        published: false
      }
    })
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const memories = await ctx.db.memory.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true }
    });

    return {
      memories: memories.slice(0, 3),
      count: memories.length
    };
  }),
});
