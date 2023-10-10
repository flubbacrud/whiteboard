import HttpError from '@wasp/core/HttpError.js'

export const createBoard = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newBoard = await context.entities.Board.create({
    data: {
      title: args.title,
      user: { connect: { id: context.user.id } }
    }
  });

  return newBoard;
}

export const addElement = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { type, content, positionX, positionY, boardId } = args;

  const board = await context.entities.Board.findUnique({
    where: { id: boardId }
  });

  if (!board) { throw new HttpError(404, `Board with id ${boardId} not found`) }
  if (board.userId !== context.user.id) { throw new HttpError(403, `User is not authorized to modify board with id ${boardId}`) }

  return context.entities.Element.create({
    data: {
      type,
      content,
      positionX,
      positionY,
      boardId
    }
  });
}

export const updateElement = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const element = await context.entities.Element.findUnique({
    where: { id: args.id }
  });
  const board = await context.entities.Board.findUnique({
    where: { id: args.boardId }
  });
  if (board.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Element.update({
    where: { id: args.id },
    data: {
      type: args.type,
      content: args.content,
      positionX: args.positionX,
      positionY: args.positionY
    }
  });
}
