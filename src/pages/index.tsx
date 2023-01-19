import React from "react";
import TaskForm from "./components/TaskForm";
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

export const getStaticProps = async () => {
  return {
    props: { auth: true },
  };
};

export default Home;
