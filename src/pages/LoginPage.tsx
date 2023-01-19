import React, { useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { status } = useSession();
  const [providers, setProviders] = useState<any>();
  const router = useRouter();

  React.useEffect(() => {
    getProviders().then((p) => setProviders(p));
  }, []);

  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <div>
        {providers &&
          Object.values(providers).map((provider: any) => {
            return (
              <div key={provider.name} className="pt-5 text-center">
                <button
                  className="rounded bg-yellow-400 py-2 px-4 font-bold text-black hover:bg-black hover:text-yellow-400"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
      </div>
    );
  }

  return <div className="pt-5 text-center">Loading...</div>;
};

export default LoginPage;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerAuthSession(context);

//   if (session?.user) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }
