import { isPrismaError, prismaErrorToHttpError } from '@wasp/utils.js';

export const createTask = async ({ name, email, message, deadline, recurring }, context) => {
  // if (!context.user) {
  //   throw new HttpError(401);
  // }
  try {
    return await context.entities.Task.create({
      data: {
        name,
        email,
        message,
        deadline,
        recurring,
        // user: { connect: { id: context.user.id } },
      },
    });
  } catch (e) {
    // throw the errors here and consume them in the client 
    if (isPrismaError(e)) {
      throw prismaErrorToHttpError(e);
    } else {
      throw e
    }
  }
};
