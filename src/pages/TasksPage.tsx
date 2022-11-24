import React from "react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { type NextPage } from "next";

const TasksPage = () => {
  const {
    data: pendingTasks,
    isLoading: pendingLoading,
    isError: pendingError,
  } = trpc.task.getTasksByStatus.useQuery("pending");
  const {
    data: completedTasks,
    isLoading: completedLoading,
    isError: completedError,
  } = trpc.task.getTasksByStatus.useQuery("completed");

  // TODO: add pagination and sorting by status, recurring, etc, instead of two lists

  return (
    <div className="container">
      <main>
        <Link href="/" className="my-2 underline">
          Go back and add a Task 🐢
        </Link>
        <div className="tasks">
          {pendingLoading && completedLoading && <div>Loading...</div>}
          {pendingError && <div>Error: {pendingError}</div>}
          {completedError && <div>Error: {completedError}</div>}
          {pendingTasks && (
            <div>
              <h2>Pending Tasks</h2>
              <ol>
                {pendingTasks.map((task) => (
                  <>
                    <li key={task.id} className="list-decimal">
                      {task.name}
                    </li>
                    <div>{task.email}</div>
                    <div className="mb-1">{task.message}</div>
                  </>
                ))}
              </ol>
            </div>
          )}
          {completedTasks && (
            <div style={{ opacity: "0.6" }}>
              <h2>Completed Tasks</h2>
              <ol>
                {completedTasks.map((task, idx) => (
                  <div>
                    <li
                      key={task.id}
                      style={{ textDecoration: "line-through" }}
                    >
                      {task.name}
                    </li>
                    <div>{task.email}</div>
                    <div style={{ marginBottom: "0.25rem" }}>
                      {task.message}
                    </div>
                  </div>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: { auth: true },
  };
};

export default TasksPage;

