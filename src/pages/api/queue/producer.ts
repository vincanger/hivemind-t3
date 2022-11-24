import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

// `https://qstash.upstash.io/v1/publish/${process.env.VERCEL_URL}/api/queue/emailer`;
const URL = "https://a23f-176-199-209-57.eu.ngrok.io"; //process.env.VERCEL_URL || 

const QSTASH_URL = `https://qstash.upstash.io/v1/publish/${URL}/api/queue/emailer`;

const producer = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("prdocuer hit / req.body: ", req.body);

  const tasks = await prisma.task.findMany({
    where: {
      recurring: {
        has: new Date().getDay(),
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      recurring: true,
      // emailUrl: true,
    },
  });

  const deadlinedTasks = await prisma.task.findMany({
    where: {
      deadline: new Date().toJSON().split('T')[0],
      status: "pending",
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      deadline: true,
      // emailUrl: true,
    },
  });

  const allTasks = [...tasks, ...deadlinedTasks];
  console.log("allTasks: ", allTasks);

  const submittedJobs = await Promise.allSettled(
    allTasks.map(async (task) => {
      // make the console.log message yellow
      console.log("\x1b[33m%s\x1b[0m", "task: ", task);


      const result = await fetch(QSTASH_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
          ContentType: "application/json",
        },
        body: JSON.stringify(task),
      });
      return result;
    })
  );

  res.status(200).json({ name: "Message sent to queue", submittedJobs });
};

export default producer;
