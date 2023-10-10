import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserBoards from '@wasp/queries/getUserBoards';
import createBoard from '@wasp/actions/createBoard';

export function DashboardPage() {
  const { data: boards, isLoading, error } = useQuery(getUserBoards);
  const createBoardFn = useAction(createBoard);

  const [newBoardTitle, setNewBoardTitle] = useState('');

  useEffect(() => {
    document.title = 'Whiteboard - Dashboard';
  }, []);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateBoard = () => {
    createBoardFn({ title: newBoardTitle });
    setNewBoardTitle('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Board Title'
          className='px-1 py-2 border rounded text-lg'
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
        />
        <button
          onClick={handleCreateBoard}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Create Board
        </button>
      </div>
      <div>
        {boards.map((board) => (
          <div
            key={board.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{board.title}</div>
            <div>
              <Link
                to={`/board/${board.id}`}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}