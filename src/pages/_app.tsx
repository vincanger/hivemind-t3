import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./Main.css";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";


import { useQueryClient } from "@tanstack/react-query";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = useQueryClient();

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
