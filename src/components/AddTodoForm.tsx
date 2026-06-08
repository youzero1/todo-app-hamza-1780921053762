import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Priority selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'text-xs px-3 py-1 rounded-full border font-medium transition-all',
              priority === p.value
                ? p.color + ' ring-2 ring-offset-1 ring-brand'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
