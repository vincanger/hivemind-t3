export const getPendingTasks = async (args, context) => {
  return await context.entities.Task.findMany({
    where: {
      status: 'pending',
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
    },
  });
};

export const getCompletedTasks = async (args, context) => {
  return await context.entities.Task.findMany({
    where: {
      status: 'completed',
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
    },
  });
};