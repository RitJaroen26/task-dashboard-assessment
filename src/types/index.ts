export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Task {
    id: string;
    title: string;
    project: string;
    tag: string;
    priority: Priority;
    date: string;
    status: Status;
    progress: number;
    assignees: string[];
}