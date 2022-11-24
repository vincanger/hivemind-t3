import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const producer = async (req: NextApiRequest, res: NextApiResponse) => {

  const QSTASH_URL = `https://qstash.upstash.io/v1/publish/${process.env.VERCEL_URL}/queue`;

  const result = await fetch(QSTASH_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
    },
  });

  console.log("Result: ", result);

  res.status(200).json({ name: "Message sent to queue" });

  const examples = await prisma.example.findMany();
  res.status(200).json(examples);
};

export default producer;
