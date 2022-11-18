import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { taskRouter } from "./task";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
