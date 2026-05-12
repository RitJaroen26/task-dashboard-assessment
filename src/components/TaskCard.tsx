import { CheckSquare } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onClick: () => void;
    onUpdate: (task: Task) => void;
}

export default function TaskCard({ task, onClick, onUpdate }: TaskCardProps) {

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = Number(e.target.value);
        let newStatus = task.status;
        if (newProgress === 100) newStatus = 'Done';
        else if (newProgress > 0 && newProgress < 100 && task.status === 'To Do') newStatus = 'In Progress';
        else if (newProgress === 0 && task.status === 'Done') newStatus = 'To Do';
        onUpdate({ ...task, progress: newProgress, status: newStatus });
    };

    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
            onClick={onClick}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 border border-slate-200/60 cursor-grab active:cursor-grabbing hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 group"
        >
            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{task.title}</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">{task.project}</p>

            <div className="flex items-center space-x-2 mb-5">
                <span className="text-[11px] font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600">{task.tag}</span>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-50 text-red-600' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{task.priority}</span>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 mb-3 font-semibold">
                <span className="flex items-center"><CheckSquare size={14} className="mr-1.5 opacity-70" /> {task.date}</span>
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-xs mb-2 font-semibold text-slate-500">
                    <span>Progress</span><span className={task.progress === 100 ? 'text-emerald-600' : 'text-blue-600'}>{task.progress}%</span>
                </div>
                <div className="relative w-full bg-slate-100 rounded-full h-2 group/slider overflow-hidden">
                    <div className={`h-2 rounded-full transition-all duration-300 ease-out ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${task.progress}%` }}></div>
                    <input
                        type="range" min="0" max="100" value={task.progress} onChange={handleProgressChange}
                        onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                    {task.assignees.map((img, i) => (
                        <img key={i} src={img} alt="Assignee" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" />
                    ))}
                </div>
            </div>
        </div>
    );
}