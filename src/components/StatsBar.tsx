import { CheckCircle2, Circle, LayoutList } from 'lucide-react';

type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
};

export default function StatsBar({ total, active, completed }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <div className="bg-indigo-50 rounded-xl p-2">
          <LayoutList size={18} className="text-brand" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <div className="bg-blue-50 rounded-xl p-2">
          <Circle size={18} className="text-blue-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{active}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <div className="bg-green-50 rounded-xl p-2">
          <CheckCircle2 size={18} className="text-green-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{completed}</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
      </div>
    </div>
  );
}
