import React from "react";
import Link from "next/link";
import { trpc } from "../utils/trpc";

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
            <div className="tasklist">
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
            <div className="tasklist">
              <h2>Completed Tasks</h2>
              <ol>
                {completedTasks.map((task) => (
                  <div key={task.id}>
                    <li style={{ textDecoration: "line-through" }}>
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
        <div className="tasks">
          <div className="tasklist">
            <h2>CRON JOB EMAIL previews from Nodemailer</h2>
            <ul>
              {pendingTasks &&
                completedTasks &&
                pendingTasks.concat(completedTasks).map((task, idx) => {
                  if (task.emailUrl) {
                    return (
                      <li key={task.id}>
                        <code>{task.name}</code>:
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={task.emailUrl}
                        >
                          nodemailer email preview
                        </a>
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
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
