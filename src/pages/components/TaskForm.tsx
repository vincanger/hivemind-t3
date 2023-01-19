import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { trpc } from "../../utils/trpc";

const daysOfWeek = ["Su", "M", "T", "W", "Th", "F", "Sa"];
let days: any;
let deadline: any;

const TaskForm = () => {
  const [recurring, setRecurring] =useState(false);
  const utils = trpc.useContext();


  const { mutateAsync: newTask, isLoading, isError } = trpc.task.newTask.useMutation({
    onSuccess: () => {
      utils.task.invalidate();
    }
  });

useEffect(() => {
    days = daysOfWeek.map((day) => {
      return document.getElementById(day);
    });
    console.log('days', days);
    deadline = document.getElementById("deadline");
    console.log('deadline', deadline);
    
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const target = event.target as typeof event.target & {
        name: { value: string };
        email: { value: string };
        message: { value: string };
        deadline: { value: string };
      };
      const name = target.name.value;
      const email = target.email.value;
      const message = target.message.value;
      const deadline = target.deadline?.value;
      // Map the days of the week to their index number
      // for storage in db, e.g. [0: Su, 1:M, ...]]
      const recurring = days
        .filter((day: HTMLInputElement) => day.checked)
        .map((day: HTMLInputElement) =>
          daysOfWeek.findIndex((d) => d === day.id)
        );

      const task = await newTask({
        name,
        email,
        message,
        deadline,
        recurring,
      });
      console.log("Task created: ", task);
      window.alert("Task created successfully!");
      setRecurring(false);
      // event.target.reset();
    } catch (err) {
      // if (err instanceof TRPCClientError) {
      //   console.error('wtf ------>', err.data);
      // }
      // window.alert('error creating task');
    }
  };

  const isRecurring = (event:ChangeEvent<HTMLInputElement>) => {
    console.log("deadline", deadline);
    if (event.target.checked) {
      setRecurring(true);
      deadline.value = null;
    } else {
      const checkedDays = days.filter((day: HTMLInputElement) => day.checked);
      console.log("checked days", checkedDays);
      if (checkedDays.length === 0) {
        setRecurring(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <Tooltip
          style={{ width: '10px'}}
          content='An email reminder will be sent on the deadline or recurring days
          you select...'
          placement='bottom'
        >
          <CgInfo />
        </Tooltip> */}
        <h3 style={{ display: "inline-block" }}>Schedule a Task Reminder:</h3>
      </div>
      <span className="info"></span>
      <label htmlFor="name">Task</label>
      <input type="text" id="name" placeholder="name of task" />
      <label htmlFor="email">Email of Responsible Person</label>
      <input type="email" id="email" placeholder="email address" />
      <label htmlFor="message">Message</label>
      <input type="text" id="message" placeholder="message to be sent" />
      <div>
        <label htmlFor="deadline">One-time Deadline: </label>
        <input type="date" id="deadline" disabled={recurring} />
      </div>
      <div className="recurring">
        <label>Recurring task:</label>

        {daysOfWeek.map((day, index) => (
          <label key={index} className="days">
            {day}
            <input type="checkbox" onChange={isRecurring} id={day} />
          </label>
        ))}
      </div>
      <button type="submit" className="button button-outline">
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
