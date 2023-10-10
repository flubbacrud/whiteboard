import HttpError from '@wasp/core/HttpError.js'

export const getBoard = async ({ boardId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const board = await context.entities.Board.findUnique({
    where: {
      id: boardId,
      userId: context.user.id
    },
    include: {
      elements: true
    }
  });

  if (!board) { throw new HttpError(400) }

  return board;
}

export const getUserBoards = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Board.findMany({
    where: {
      userId: context.user.id
    }
  })
}