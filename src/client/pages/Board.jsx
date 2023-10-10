import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getBoard from '@wasp/queries/getBoard';
import addElement from '@wasp/actions/addElement';
import updateElement from '@wasp/actions/updateElement';

export function BoardPage() {
  const { boardId } = useParams();
  const { data: board, isLoading, error } = useQuery(getBoard, { boardId });
  const addElementFn = useAction(addElement);
  const updateElementFn = useAction(updateElement);

  const [newElement, setNewElement] = useState({ type: '', content: '', positionX: 0, positionY: 0 });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddElement = () => {
    addElementFn({
      ...newElement,
      boardId
    });
    setNewElement({ type: '', content: '', positionX: 0, positionY: 0 });
  };

  const handleUpdateElement = (elementId, newValues) => {
    updateElementFn({
      id: elementId,
      boardId,
      ...newValues
    });
  };

  return (
    <div className="">
      <div className="py-5">
        <button
          onClick={handleAddElement}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Element
        </button>
      </div>
      <div>
        {board.elements.map((element) => (
          <div
            key={element.id}
            className="py-2 px-2 flex items-center gap-x-2 rounded"
          >
            <input
              type="text"
              placeholder="Type"
              className="px-1 py-2 border rounded text-lg"
              value={element.type}
              onChange={(e) => handleUpdateElement(element.id, { type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Content"
              className="px-1 py-2 border rounded text-lg"
              value={element.content}
              onChange={(e) => handleUpdateElement(element.id, { content: e.target.value })}
            />
            <input
              type="number"
              placeholder="Position X"
              className="px-1 py-2 border rounded text-lg"
              value={element.positionX}
              onChange={(e) => handleUpdateElement(element.id, { positionX: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Position Y"
              className="px-1 py-2 border rounded text-lg"
              value={element.positionY}
              onChange={(e) => handleUpdateElement(element.id, { positionY: Number(e.target.value) })}
            />
            <button
              onClick={() => handleUpdateElement(element.id, newElement)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}