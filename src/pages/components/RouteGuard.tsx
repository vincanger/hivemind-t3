import React, { FormEvent, ReactElement, ReactPropTypes } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const RouteGuard = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <div className="pt-5 text-center">Loading...</div>;
  }

  return <>{children}</>;
};
