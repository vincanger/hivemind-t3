import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { trpc } from "../../../utils/trpc";


export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
