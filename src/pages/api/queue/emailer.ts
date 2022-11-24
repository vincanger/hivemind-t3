import { type NextApiRequest, type NextApiResponse } from "next";
import { sendEmail } from "../../../utils/emailer";
import { prisma } from "../../../server/db/client";

const emailer = async (req: NextApiRequest, res: NextApiResponse) => {
  const task = JSON.parse(req.body);
  const sentEmail = await sendEmail(task);
  console.log("sentEmail: ", sentEmail);
  if (typeof sentEmail === "string") {
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
