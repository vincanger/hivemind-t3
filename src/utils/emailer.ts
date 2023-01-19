import nodemailer from "nodemailer";
import { prisma } from "../server/db/client";
import { Task } from "../types/sharedTypes";

export async function sendEmail(task: Task) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"HiveMind" <hive.mind@example.com>',
    to: task.email,
    subject: `Task Reminder -- ${task.name}`,
    html: `${task.message}`,
  });

  if (task.deadline?.length) {
    await markAsCompleted(task);
  }

  const previewUrl = nodemailer.getTestMessageUrl(info);

  console.log(`${task.name} email sent! URL: ${previewUrl}`);

  if (previewUrl) {
    await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        emailUrl: previewUrl,
      },
    });
  }

  return previewUrl;
}

async function markAsCompleted(task: Task) {
  return await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      status: "completed",
    },
  });
}
