import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    onEdit(todo.id, editText);
    setIsEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl border shadow-sm px-4 py-3 flex items-center gap-3 group transition-all',
        todo.completed ? 'border-gray-100 opacity-70' : 'border-gray-100 hover:border-indigo-100 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
          todo.completed
            ? 'bg-brand border-brand'
            : 'border-gray-300 hover:border-brand'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      {/* Text or Edit Input */}
      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm border border-indigo-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Priority Badge */}
      {!isEditing && (
        <span
          className={clsx(
            'hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium',
            PRIORITY_STYLES[todo.priority]
          )}
        >
          <span className={clsx('w-1.5 h-1.5 rounded-full', PRIORITY_DOT[todo.priority])} />
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setIsEditing(true); setEditText(todo.text); }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
