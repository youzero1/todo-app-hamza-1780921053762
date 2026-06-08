import clsx from 'clsx';
import { FilterType } from '@/types';
import { Trash2 } from 'lucide-react';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, setFilter, onClearCompleted, completedCount }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === f.value
                ? 'bg-white text-brand shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
        >
          <Trash2 size={14} />
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
