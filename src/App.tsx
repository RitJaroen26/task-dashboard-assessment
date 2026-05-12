import { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskToolbar from './components/TaskToolbar';
import TaskBoard from './components/TaskBoard';
import Pagination from './components/Pagination';
import TaskModal from './components/TaskModal';
import TaskCard from './components/TaskCard';
import { useTasks } from './hooks/useTasks';
import type { Task } from './types';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    tasks, globalSearchResults,
    globalSearchTerm, setGlobalSearchTerm,
    searchTerm, setSearchTerm,
    priorityFilter, setPriorityFilter, statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages, addTask, updateTaskStatus, updateTask, deleteTask
  } = useTasks(4);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenModal = (task?: Task) => {
    setSelectedTask(task || null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      updateTask(task);
      showToast(`Task updated successfully! 📝`);
    } else {
      addTask(task);
      showToast(`New task saved! 🎉`);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 relative">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header globalSearchTerm={globalSearchTerm} setGlobalSearchTerm={setGlobalSearchTerm} />

        <div className="p-8 flex-1 overflow-y-auto relative">

          {globalSearchTerm ? (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Search Results</h2>
                  <p className="text-slate-500 text-sm">Showing all tasks matching "{globalSearchTerm}"</p>
                </div>
                <button onClick={() => setGlobalSearchTerm('')} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Clear Search
                </button>
              </div>

              {globalSearchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {globalSearchResults.map(task => (
                    <TaskCard key={task.id} task={task} onClick={() => handleOpenModal(task)} onUpdate={updateTask} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <Search size={48} className="mb-4 text-slate-300" />
                  <p className="text-lg font-medium">No tasks found</p>
                </div>
              )}
            </div>
          ) : activeMenu === 'Dashboard' ? (
            <div className="animate-in fade-in duration-300 flex flex-col h-full">
              <TaskToolbar
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                onNewTask={() => handleOpenModal()}
              />

              <div className="flex-1 min-h-0">
                <TaskBoard
                  tasks={tasks}
                  onTaskClick={handleOpenModal}
                  onDropTask={(id, status) => {
                    updateTaskStatus(id, status);
                    showToast(`Task moved to ${status} ✅`);
                  }}
                  onUpdateTask={updateTask}
                />
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[65vh] border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 text-slate-400">
              <h2 className="text-2xl font-bold text-slate-700 mb-2">{activeMenu}</h2>
              <p className="text-sm">This page is under construction (Coming Soon).</p>
            </div>
          )}

        </div>
      </main>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-2xl font-medium animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          {toastMessage}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          key={selectedTask ? selectedTask.id : 'new-task'}
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          onDelete={(id) => { deleteTask(id); showToast('Task deleted 🗑️'); setIsModalOpen(false); }}
        />
      )}
    </div>
  );
}