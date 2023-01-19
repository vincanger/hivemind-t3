import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = () => {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "authenticated") {
      signOut();
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return <div>Logging out...</div>;
}

export default Logout;
