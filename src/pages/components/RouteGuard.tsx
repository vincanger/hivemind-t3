import type { ReactElement } from "react";
import { useSession } from "next-auth/react";


export const RouteGuard = ({ children }: { children: ReactElement }) => {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <div className="pt-5 text-center">Loading...</div>;
  }

  return <>{children}</>;
};
