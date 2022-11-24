import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./Main.css";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import NavBar from "./components/NavBar";
import MobileFooter from "./components/MobileFooter";
import { RouteGuard } from "./components/RouteGuard";


const MyApp: AppType<{ session: Session | null, auth: boolean }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const { auth } = pageProps

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <NavBar />
      {auth ? (
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      ) : (
        <Component {...pageProps} />  
      )}
      <ReactQueryDevtools />
      <MobileFooter />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
