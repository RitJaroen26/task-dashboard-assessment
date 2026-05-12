import { useState, useMemo, useEffect } from 'react';
import type { Task, Status } from '../types';
import { initialTasks } from '../data/mock';
import { useDebounce } from './useDebounce';

export function useTasks(itemsPerPage = 15) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('taskflow_data');
        return saved ? JSON.parse(saved) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem('taskflow_data', JSON.stringify(tasks));
    }, [tasks]);

    const [globalSearchTerm, setGlobalSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedGlobalSearch = useDebounce(globalSearchTerm, 300);
    const debouncedLocalSearch = useDebounce(searchTerm, 300);

    const globalSearchResults = useMemo(() => {
        if (!debouncedGlobalSearch.trim()) return [];
        const term = debouncedGlobalSearch.toLowerCase().trim();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(term) ||
            task.project.toLowerCase().includes(term) ||
            task.tag.toLowerCase().includes(term)
        );
    }, [tasks, debouncedGlobalSearch]);

    const filteredBoardTasks = useMemo(() => {
        return tasks.filter(task => {
            const localTerm = (debouncedLocalSearch || '').toLowerCase().trim();
            const matchesSearch = !localTerm ||
                task.title.toLowerCase().includes(localTerm) ||
                task.project.toLowerCase().includes(localTerm) ||
                task.tag.toLowerCase().includes(localTerm);

            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [tasks, debouncedLocalSearch, priorityFilter, statusFilter]);

    // const totalPages = Math.ceil(filteredBoardTasks.length / itemsPerPage);

    const totalPages = useMemo(() => {
        const todoCount = filteredBoardTasks.filter(t => t.status === 'To Do').length;
        const inProgressCount = filteredBoardTasks.filter(t => t.status === 'In Progress').length;
        const doneCount = filteredBoardTasks.filter(t => t.status === 'Done').length;

        const maxTasksInAColumn = Math.max(todoCount, inProgressCount, doneCount);
        return Math.max(1, Math.ceil(maxTasksInAColumn / itemsPerPage));
    }, [filteredBoardTasks, itemsPerPage]);

    // const paginatedTasks = useMemo(() => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     return filteredBoardTasks.slice(startIndex, startIndex + itemsPerPage);
    // }, [filteredBoardTasks, currentPage, itemsPerPage]);

    const paginatedTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const todos = filteredBoardTasks.filter(t => t.status === 'To Do').slice(startIndex, endIndex);
        const inProgress = filteredBoardTasks.filter(t => t.status === 'In Progress').slice(startIndex, endIndex);
        const done = filteredBoardTasks.filter(t => t.status === 'Done').slice(startIndex, endIndex);

        return [...todos, ...inProgress, ...done];
    }, [filteredBoardTasks, currentPage, itemsPerPage]);

    const addTask = (newTask: Task) => setTasks([{ ...newTask, id: crypto.randomUUID() }, ...tasks]);
    const updateTask = (updatedTask: Task) => setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    const deleteTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId));
    const updateTaskStatus = (taskId: string, newStatus: Status) => {
        setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, status: newStatus, progress: newStatus === 'Done' ? 100 : t.progress } : t));
    };

    const handleSetSearchTerm = (val: string) => { setSearchTerm(val); setCurrentPage(1); };
    const handleSetGlobalSearchTerm = (val: string) => { setGlobalSearchTerm(val); setCurrentPage(1); };
    const handleSetPriorityFilter = (val: string) => { setPriorityFilter(val); setCurrentPage(1); };
    const handleSetStatusFilter = (val: string) => { setStatusFilter(val); setCurrentPage(1); };

    return {
        tasks: paginatedTasks,
        globalSearchResults,
        allTasks: tasks,

        globalSearchTerm, setGlobalSearchTerm: handleSetGlobalSearchTerm,
        searchTerm, setSearchTerm: handleSetSearchTerm,

        priorityFilter, setPriorityFilter: handleSetPriorityFilter,
        statusFilter, setStatusFilter: handleSetStatusFilter,
        currentPage, setCurrentPage, totalPages,
        addTask, updateTask, updateTaskStatus, deleteTask
    };
}