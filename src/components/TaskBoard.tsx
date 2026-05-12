import TaskCard from './TaskCard';
import type { Task, Status } from '../types';

interface TaskBoardProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onDropTask: (taskId: string, newStatus: Status) => void;
    onUpdateTask: (task: Task) => void;
}

export default function TaskBoard({ tasks, onTaskClick, onDropTask, onUpdateTask }: TaskBoardProps) {
    const columns: Status[] = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {columns.map((colStatus) => {
                const columnTasks = tasks.filter(t => t.status === colStatus);

                return (
                    <div
                        key={colStatus}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const taskId = e.dataTransfer.getData('taskId');
                            onDropTask(taskId, colStatus);
                        }}
                        className={`flex flex-col rounded-2xl p-4 border ${colStatus === 'To Do' ? 'border-slate-200/60 bg-slate-100/40' : colStatus === 'In Progress' ? 'border-blue-200/60 bg-blue-100/40' : 'border-emerald-200/60 bg-emerald-100/40'} transition-colors hover:bg-slate-100/60 min-h-[400px] h-[65vh]`}
                    >
                        <div className="flex items-center justify-between mb-5 px-1 pt-1 shrink-0">
                            <div className="flex items-center space-x-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${colStatus === 'To Do' ? 'bg-slate-400' : colStatus === 'In Progress' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                                <h3 className="font-bold text-[15px] text-slate-700">{colStatus}</h3>
                            </div>
                            <span className="bg-slate-200/70 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                {columnTasks.length}
                            </span>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-2">
                            {columnTasks.length > 0 ? (
                                columnTasks.map(task => (
                                    <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} onUpdate={onUpdateTask} />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-slate-300/60 rounded-2xl bg-white/50 text-slate-400">
                                    <span className="text-sm font-semibold">Drop tasks here</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}