import React, { FormEvent, ReactElement, ReactPropTypes } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export const RouteGuard = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  React.useEffect(() => {
    console.log('router.........<<<<<<', router.asPath)
  }, [])
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
