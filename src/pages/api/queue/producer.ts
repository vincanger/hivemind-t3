import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: "sig_4rRkjgcP1Vr7emGADCXLCKecm58f",
  nextSigningKey: "sig_6od8qKjRdX66wZnHKcEMMEgW1Rcv",
});

const URL = process.env.VERCEL_URL || "http://localhost:3000";

const QSTASH_URL = `https://qstash.upstash.io/v1/publish/${URL}/api/queue/emailer`;

const producer = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("\n\n producer hit by Qstash service \n\n");

  // get headers from Qstash
  const { headers } = req;
  // parse the header's 'upstash-signature' value
  const signature = headers["upstash-signature"];
  // check if the signature is valid using Qstash SDK
  let isValid = false;
  if (typeof signature === "string") {
    isValid = await receiver.verify({
      signature: signature,
      body: req.body,
    });
  }

  console.log("\n isValid: ", isValid, "\n");

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
    },
  });

  const deadlinedTasks = await prisma.task.findMany({
    where: {
      deadline: new Date().toJSON().split("T")[0],
      status: "pending",
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      deadline: true,
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
