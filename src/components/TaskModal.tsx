import { useState } from 'react';
import { X } from 'lucide-react';
import type { Task, Status, Priority } from '../types';

interface TaskModalProps {
    task?: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
    onDelete: (id: string) => void;
}

const emptyTask: Task = {
    id: '', title: '', project: '', tag: 'Feature',
    priority: 'Medium', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    status: 'To Do', progress: 0, assignees: ['https://i.pravatar.cc/150?img=1']
};

export default function TaskModal({ task, onClose, onSave, onDelete }: TaskModalProps) {
    const [formData, setFormData] = useState<Task>(task || emptyTask);
    const isViewMode = !!task;

    const [newAssignee, setNewAssignee] = useState('');

    const handleAddAssignee = () => {
        if (newAssignee.trim()) {
            setFormData({ ...formData, assignees: [...formData.assignees, newAssignee.trim()] });
            setNewAssignee('');
        }
    };

    const handleAddRandom = () => {
        const randomId = Math.floor(Math.random() * 70) + 1;
        const newImg = `https://i.pravatar.cc/150?img=${randomId}`;
        setFormData({ ...formData, assignees: [...formData.assignees, newImg] });
    };

    const handleRemoveAssignee = (indexToRemove: number) => {
        setFormData({
            ...formData,
            assignees: formData.assignees.filter((_, index) => index !== indexToRemove)
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-5 text-slate-800">
                    {isViewMode ? 'Task Details' : 'Create New Task'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Task Name</label>
                        <input
                            type="text" value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Design Homepage"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Project Name</label>
                        <input
                            type="text" value={formData.project}
                            onChange={e => setFormData({ ...formData, project: e.target.value })}
                            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Web App Redesign"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Tag</label>
                            <input type="text" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Feature" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                            <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as Status })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>To Do</option><option>In Progress</option><option>Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Priority</label>
                            <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>High</option><option>Medium</option><option>Low</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Progress %</label>
                        <input type="number" min="0" max="100" value={formData.progress} onChange={e => setFormData({ ...formData, progress: Number(e.target.value) })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                        <label className="block text-xs font-semibold text-slate-500 mb-2">Assignees</label>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.assignees.map((img, i) => (
                                <div
                                    key={i}
                                    title="Click to remove"
                                    onClick={() => handleRemoveAssignee(i)}
                                    className="relative group cursor-pointer"
                                >
                                    <img src={img} alt="Assignee" className="w-8 h-8 rounded-full border border-slate-200 shadow-sm object-cover" />
                                    <div className="absolute inset-0 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={14} className="text-white" />
                                    </div>
                                </div>
                            ))}
                            {formData.assignees.length === 0 && (
                                <span className="text-xs text-slate-400 italic py-1">No assignees yet</span>
                            )}
                        </div>

                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={newAssignee}
                                onChange={e => setNewAssignee(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddAssignee()}
                                placeholder="Paste Image URL..."
                                className="flex-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddAssignee}
                                className="px-3 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={handleAddRandom}
                                className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                                title="Add Random User"
                            >
                                🎲 Random
                            </button>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">Tip: Click on an avatar to remove it.</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
                    <div>
                        {isViewMode && (
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this task?')) {
                                        onDelete(formData.id);
                                        onClose();
                                    }
                                }}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                            >
                                Delete Task
                            </button>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={onClose} className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-600">
                            Close
                        </button>
                        <button
                            onClick={() => {
                                const finalData = { ...formData, project: formData.project || 'Untitled Project' };
                                onSave(finalData);
                                onClose();
                            }}
                            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isViewMode ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}