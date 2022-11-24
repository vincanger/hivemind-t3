import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  getTasksByStatus: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: {
          status: input,
        },
        orderBy: {
          id: "asc",
        },
      });
    }),
  newTask: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
        deadline: z.string(),
        recurring: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // try {
      return await ctx.prisma.task.create({
        data: input,
      });
      // } catch (error) {
      //   if (error instanceof PrismaClientKnownRequestError) {
      //     throw new TRPCError({
      //       code: "INTERNAL_SERVER_ERROR",
      //       message: error.message,
      //     });
      //   }
      //   throw error;
      // }
    }),
});
