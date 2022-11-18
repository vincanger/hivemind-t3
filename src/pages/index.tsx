import React from 'react'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import MobileFooter from './components/MobileFooter'

import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { RouteGuard } from "./components/RouteGuard";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const [name, setName] = React.useState<string>("");


  return (
    <RouteGuard>
      <div className='container'>
        <NavBar />
        <main>
          <TaskForm />
        </main>
        <MobileFooter />
      </div>
    </RouteGuard>
  );
}

export default Home;
