import { Search, Plus, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface TaskToolbarProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    priorityFilter: string;
    setPriorityFilter: (val: string) => void;
    statusFilter: string;
    setStatusFilter: (val: string) => void;
    onNewTask: () => void;
}

export default function TaskToolbar({
    searchTerm, setSearchTerm, priorityFilter, setPriorityFilter,
    statusFilter, setStatusFilter, onNewTask
}: TaskToolbarProps) {

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-3">
            <div className="flex flex-wrap gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search Tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-16 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                </div>
                <div className="relative flex-1 sm:flex-none">
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="appearance-none w-full sm:w-40 pl-4 pr-10 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                        <option value="All">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                <div className="relative flex-1 sm:flex-none">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none w-full sm:w-40 pl-4 pr-10 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                        <option value="All">All Statuses</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
            </div>
            <button
                onClick={onNewTask}
                className="w-full xl:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0 group"
            >
                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                New Task
            </button>
        </div>
    );
}

