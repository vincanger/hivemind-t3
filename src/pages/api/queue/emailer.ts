import { type NextApiRequest, type NextApiResponse } from "next";
import { sendEmail } from "../../../utils/emailer";
import { prisma } from "../../../server/db/client";
import { Task } from "../../../types/sharedTypes";


const emailer = async (req: NextApiRequest, res: NextApiResponse) => {
  const task = JSON.parse(req.body) as Task;
  console.log("\n task parsed via Qstash: ", task, "\n");
  
  const sentEmail = await sendEmail(task);

  if (sentEmail) {
    await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        emailUrl: sentEmail,
      },
    });
  }
  res.status(200).json({ name: "Message sent to queue", sentEmail });
};

export default emailer;
