import React from "react";
import NavBar from "./components/NavBar";
import TaskForm from "./components/TaskForm";
import MobileFooter from "./components/MobileFooter";
import { NextPage } from "next";


const Home: NextPage = () => {
  return (
    <div className="container">
      <main>
        <TaskForm />
      </main>
    </div>
  );
};

// Home.auth = true;
export const getStaticProps = async () => {
  return {
    props: { auth: true },
  };
};

export default Home;
