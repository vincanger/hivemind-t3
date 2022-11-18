import React from "react";
import NavBar from "./components/NavBar";
import { signIn, getSession, getProviders } from "next-auth/react";
import { NextPageContext } from "next";

const LoginPage = ({ providers }: any) => {

  return (
    <div >
      <NavBar />
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name} className="text-center pt-5">
            <button
              className="rounded hover:bg-black hover:text-yellow-400 py-2 px-4 font-bold bg-yellow-400 text-black"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
}



