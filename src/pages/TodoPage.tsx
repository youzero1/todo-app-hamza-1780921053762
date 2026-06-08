import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-brand rounded-2xl p-3 shadow-lg">
            <CheckSquare className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Todos</h1>
            <p className="text-gray-500 text-sm">Stay organized, stay productive</p>
          </div>
        </div>

        {/* Stats */}
        <StatsBar
          total={totalCount}
          active={activeCount}
          completed={completedCount}
        />

        {/* Add Todo */}
        <div className="mt-6">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mt-5">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={clearCompleted}
            completedCount={completedCount}
          />
        </div>

        {/* Todo List */}
        <div className="mt-4">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Data stored in your browser's local storage
        </p>
      </div>
    </div>
  );
}
