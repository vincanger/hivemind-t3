import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {

  // make console.log message red
  console.log("\x1b[31m%s\x1b[0m", "getServerAuthSession -- [][][ BEGIN ][][]"
  
  );

  
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

  // make console.log message blue
  console.log("\x1b[33m%s\x1b[0m", "getServerAuthSession -- END <<<<<<: ", session);
  return session;
};
