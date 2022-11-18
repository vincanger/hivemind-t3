import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "authenticated") {
      signOut();
    }
  }, [status]);

  if (status === "unauthenticated") {
    router.push("/");
  }

  return <div>Logging out...</div>;
}

export default Logout;
