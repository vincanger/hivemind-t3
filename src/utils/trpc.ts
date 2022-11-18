import { QueryCache } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import {
  TRPCError,
  type inferRouterInputs,
  type inferRouterOutputs,
} from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            onError: (error) => {
              console.log("useQueryClient DEFAULT: error ", error);
              window.alert("useQueryClient QUERY DEFAULT: error creating task");
            },
          },
          mutations: {
            onError: (error) => {
              if (error instanceof TRPCClientError) {
                console.log("useQueryClient DEFAULT: error ", error.message);
              }
              window.alert("useQueryClient MUTATION DEFAULT: error");
            },
          },
        },
        queryCache: new QueryCache({
          onError: async (error: unknown) => {
            console.log("global 🌏 error handler", error);
            if ((error as TRPCError).message === "UNAUTHORIZED") {
              // await signOut({ callbackUrl: `${getBaseUrl()}/sign-in` });
              console.log("UNAUTHORIZED");
            }
            if (error instanceof TRPCError) {
              console.error("TRPCError >>>", error);
            }
            if (error instanceof TRPCClientError) {
              console.error("TRPC ClientERROR >>>>", error);
            }
          },
        }),
      },
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
