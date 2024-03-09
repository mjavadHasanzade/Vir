import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userOperationsRouter = createTRPCRouter({

    register: publicProcedure.input(z.object({
        name: z.string().min(3), familyName: z.string().min(3),
        email: z.string().email(), password: z.string().min(5),
        username: z.string().min(3)
    }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.user.create({
                data: {
                    name: input.name,
                    familyName: input.familyName,
                    email: input.email,
                    password: input.password,
                    username: input.username
                },
            });
        }),

    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(5) }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findFirst({
                where: {
                    email: input.email
                }
            });

            //handle
            if (!user)
                throw new Error("no such user");

            if (user.password !== input.password)
                throw new Error(" incorrect password");

            return user
        })

});